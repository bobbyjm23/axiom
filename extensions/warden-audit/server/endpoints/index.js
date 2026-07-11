const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { query } = require("../db");
const {
  loadMiddleware,
  auditRoleGuard,
  getUserFromResponse,
  getUserRole,
} = require("../middleware/auth");
const { loadPillarTemplates, canEditPillar } = require("../templates");
const {
  getInstanceConfig,
  bindInstance,
  requireBoundOrg,
} = require("../models/instance");
const orgModel = require("../models/organizations");
const engagementModel = require("../models/engagements");
const { computeCompletion, computeOverallScore, engagementProgress } = require("../services/scoring");
const { importCombinedMetrics } = require("../services/platformMetrics");
const reportGenerator = require("../services/reportGenerator");

function jsonError(response, status, message) {
  response.status(status).json({ error: message });
}

function adminOnly(request, response, next) {
  const user = getUserFromResponse(response);
  if (!user || user.role !== "admin") {
    return jsonError(response, 403, "Admin access required");
  }
  next();
}

function managerCanEditPillar(request, response, next) {
  const user = getUserFromResponse(response);
  const pillarId = request.params.pillarId;
  const role = getUserRole(user);
  if (!canEditPillar(pillarId, role)) {
    return jsonError(response, 403, "You cannot edit this pillar section");
  }
  if (role === "manager") {
    const engagement = response.locals.engagement;
    if (engagement && ["in_review", "final"].includes(engagement.status)) {
      return jsonError(response, 403, "Engagement is read-only for managers");
    }
  }
  next();
}

async function loadEngagement(request, response, next) {
  const engagement = await engagementModel.getEngagement(request.params.id);
  if (!engagement) return jsonError(response, 404, "Engagement not found");
  try {
    const orgId = await requireBoundOrg();
    if (orgId && engagement.organization_id !== orgId) {
      return jsonError(response, 403, "Engagement not in bound organization");
    }
  } catch (_e) {
    // Instance not bound yet — allow admin setup flows
  }
  response.locals.engagement = engagement;
  next();
}

function registerWardenAuditRoutes(apiRouter) {
  const { validatedRequest } = loadMiddleware();
  const managerUp = [validatedRequest, auditRoleGuard(["admin", "manager"])];

  apiRouter.get("/warden-audit/health", (_req, res) => {
    res.json({
      ok: true,
      extension: "warden-audit",
      enabled: process.env.WARDEN_AUDIT_ENABLED !== "false",
    });
  });

  apiRouter.get("/warden-audit/templates/pillars", managerUp, (_req, res) => {
    res.json({ pillars: loadPillarTemplates() });
  });

  apiRouter.get("/warden-audit/instance", managerUp, async (_req, res) => {
    try {
      const config = await getInstanceConfig();
      let organization = null;
      let engagements = [];
      if (config.organization_id) {
        organization = await orgModel.getOrganization(config.organization_id);
        engagements = await engagementModel.listEngagements(config.organization_id);
      }
      res.json({ config, organization, engagements });
    } catch (e) {
      jsonError(res, 500, e.message);
    }
  });

  apiRouter.put(
    "/warden-audit/instance/bind",
    [validatedRequest, auditRoleGuard(["admin"]), adminOnly],
    async (req, res) => {
      try {
        const { organization_id } = req.body || {};
        if (!organization_id) return jsonError(res, 400, "organization_id required");
        const org = await orgModel.getOrganization(organization_id);
        if (!org) return jsonError(res, 404, "Organization not found");
        const config = await bindInstance(organization_id);
        res.json({ config, organization: org });
      } catch (e) {
        jsonError(res, 500, e.message);
      }
    }
  );

  apiRouter.get(
    "/warden-audit/organizations",
    [validatedRequest, auditRoleGuard(["admin"]), adminOnly],
    async (_req, res) => {
      try {
        const orgs = await orgModel.listOrganizations();
        res.json({ organizations: orgs });
      } catch (e) {
        jsonError(res, 500, e.message);
      }
    }
  );

  apiRouter.post(
    "/warden-audit/organizations",
    [validatedRequest, auditRoleGuard(["admin"]), adminOnly],
    async (req, res) => {
      try {
        const { name, industry, country, source, contacts, platform_config } = req.body || {};
        if (!name) return jsonError(res, 400, "name is required");
        const org = await orgModel.createOrganization({
          name,
          industry,
          country,
          source,
          contacts,
          platform_config,
        });
        res.status(201).json({ organization: org });
      } catch (e) {
        jsonError(res, 500, e.message);
      }
    }
  );

  apiRouter.get(
    "/warden-audit/organizations/:id",
    managerUp,
    async (req, res) => {
      try {
        const org = await orgModel.getOrganization(req.params.id);
        if (!org) return jsonError(res, 404, "Organization not found");
        const engagements = await engagementModel.listEngagements(org.id);
        res.json({ organization: org, engagements });
      } catch (e) {
        jsonError(res, 500, e.message);
      }
    }
  );

  apiRouter.post(
    "/warden-audit/engagements",
    [validatedRequest, auditRoleGuard(["admin"]), adminOnly],
    async (req, res) => {
      try {
        const orgId = (await getInstanceConfig()).organization_id || req.body?.organization_id;
        if (!orgId) return jsonError(res, 400, "Bind an organization to this instance first");
        const user = getUserFromResponse(res);
        const engagement = await engagementModel.createEngagement({
          ...req.body,
          organization_id: orgId,
          consultant_user_id: user?.id,
        });
        res.status(201).json({ engagement });
      } catch (e) {
        jsonError(res, 500, e.message);
      }
    }
  );

  apiRouter.get(
    "/warden-audit/engagements/:id",
    managerUp,
    loadEngagement,
    async (req, res) => {
      try {
        const pillars = await engagementModel.listPillarResponses(req.params.id);
        const progress = engagementProgress(pillars);
        const metricsResult = await query(
          `SELECT * FROM warden_audit_metrics_snapshots WHERE engagement_id = $1 ORDER BY captured_at DESC LIMIT 5`,
          [req.params.id]
        );
        res.json({
          engagement: res.locals.engagement,
          pillars,
          progress,
          metrics_snapshots: metricsResult.rows,
        });
      } catch (e) {
        jsonError(res, 500, e.message);
      }
    }
  );

  apiRouter.put(
    "/warden-audit/engagements/:id/status",
    [validatedRequest, auditRoleGuard(["admin"]), adminOnly, loadEngagement],
    async (req, res) => {
      try {
        const { status } = req.body || {};
        const allowed = ["draft", "awaiting_client_input", "in_review", "final"];
        if (!allowed.includes(status)) return jsonError(res, 400, "Invalid status");
        const engagement = await engagementModel.updateEngagementStatus(req.params.id, status);
        res.json({ engagement });
      } catch (e) {
        jsonError(res, 500, e.message);
      }
    }
  );

  apiRouter.put(
    "/warden-audit/engagements/:id/pillars/:pillarId",
    managerUp,
    loadEngagement,
    managerCanEditPillar,
    async (req, res) => {
      try {
        const user = getUserFromResponse(res);
        const role = getUserRole(user);
        const { data } = req.body || {};
        const completion = computeCompletion(req.params.pillarId, data || {});
        const pillar = await engagementModel.upsertPillarResponse(
          req.params.id,
          req.params.pillarId,
          data || {},
          role,
          completion
        );
        const allPillars = await engagementModel.listPillarResponses(req.params.id);
        const overall = computeOverallScore(allPillars);
        if (overall !== null) {
          await engagementModel.updateEngagement(req.params.id, { overall_score: overall });
        }
        res.json({ pillar, completion_pct: completion });
      } catch (e) {
        jsonError(res, 500, e.message);
      }
    }
  );

  apiRouter.post(
    "/warden-audit/engagements/:id/import-metrics",
    [validatedRequest, auditRoleGuard(["admin"]), adminOnly, loadEngagement],
    async (req, res) => {
      try {
        const periodStart =
          req.body?.period_start ||
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
        const periodEnd = req.body?.period_end || new Date().toISOString();
        const metrics = await importCombinedMetrics({ periodStart, periodEnd });
        const id = uuidv4();
        await query(
          `INSERT INTO warden_audit_metrics_snapshots (id, engagement_id, source, metrics, period_start, period_end)
           VALUES ($1, $2, 'combined', $3, $4, $5)`,
          [id, req.params.id, JSON.stringify(metrics), periodStart, periodEnd]
        );
        res.json({ metrics, snapshot_id: id });
      } catch (e) {
        jsonError(res, 500, e.message);
      }
    }
  );

  apiRouter.post(
    "/warden-audit/engagements/:id/deliverables/generate",
    [validatedRequest, auditRoleGuard(["admin"]), adminOnly, loadEngagement],
    async (req, res) => {
      try {
        const engagement = res.locals.engagement;
        const org = await orgModel.getOrganization(engagement.organization_id);
        const pillars = await engagementModel.listPillarResponses(engagement.id);
        const metricsResult = await query(
          `SELECT metrics FROM warden_audit_metrics_snapshots WHERE engagement_id = $1 ORDER BY captured_at DESC LIMIT 1`,
          [engagement.id]
        );
        const metrics = metricsResult.rows[0]?.metrics || null;
        const reports = reportGenerator.generateAll({ org, engagement, pillars, metrics });
        const saved = await reportGenerator.saveDeliverables(engagement.id, reports);
        res.json({ deliverables: saved });
      } catch (e) {
        jsonError(res, 500, e.message);
      }
    }
  );

  apiRouter.get(
    "/warden-audit/engagements/:id/deliverables",
    managerUp,
    loadEngagement,
    async (req, res) => {
      try {
        const deliverables = await reportGenerator.listDeliverables(req.params.id);
        res.json({ deliverables });
      } catch (e) {
        jsonError(res, 500, e.message);
      }
    }
  );

  apiRouter.get(
    "/warden-audit/engagements/:id/deliverables/:type/export",
    managerUp,
    loadEngagement,
    async (req, res) => {
      try {
        const result = await query(
          `SELECT * FROM warden_audit_deliverables
           WHERE engagement_id = $1 AND deliverable_type = $2
           ORDER BY version DESC, generated_at DESC LIMIT 1`,
          [req.params.id, req.params.type]
        );
        const row = result.rows[0];
        if (!row) return jsonError(res, 404, "Deliverable not found");
        const format = req.query.format || "md";
        if (format === "json") {
          return res.json(row);
        }
        res.setHeader("Content-Type", "text/markdown; charset=utf-8");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${req.params.type}.md"`
        );
        res.send(row.content_md);
      } catch (e) {
        jsonError(res, 500, e.message);
      }
    }
  );
}

function loadExpress() {
  const roots = [
    process.env.ANYTHINGLLM_SERVER_ROOT,
    path.join(__dirname, "..", "..", "..", "..", "server"),
    "/app/server",
  ].filter(Boolean);
  for (const root of roots) {
    try {
      return require(path.join(root, "node_modules", "express"));
    } catch (_e) {
      // try next candidate
    }
  }
  throw new Error("express not found — cannot serve audit static UI");
}

function registerStaticUI(app) {
  const distPath = path.join(__dirname, "..", "..", "frontend", "dist");
  const indexHtml = path.join(distPath, "index.html");
  const injectScript = path.join(__dirname, "..", "static", "sidebar-inject.js");
  if (!fs.existsSync(indexHtml)) {
    console.warn(
      "[warden-audit] Standalone UI not built (missing frontend/dist). Navigate to /settings/audit/ after image rebuild."
    );
    return;
  }

  const express = loadExpress();
  app.get(/^\/settings\/audit$/, (_req, res) => res.redirect(301, "/settings/audit/"));
  if (fs.existsSync(injectScript)) {
    app.get("/settings/audit/sidebar-inject.js", (_req, res) => {
      res.type("application/javascript");
      res.sendFile(injectScript);
    });
  }
  app.use("/settings/audit", express.static(distPath, { index: "index.html" }));
  console.log("[warden-audit] Standalone UI served at /settings/audit/");
}

module.exports = { registerWardenAuditRoutes, registerStaticUI };
