const { v4: uuidv4 } = require("uuid");
const { query } = require("../db");
const { computeOverallScore } = require("./scoring");

function mdSection(title, body) {
  return `## ${title}\n\n${body}\n`;
}

function generateExecutiveSummary({ org, engagement, pillars, metrics }) {
  const maturity = pillars.find((p) => p.pillar_id === "ai_maturity");
  const opportunities = pillars.find((p) => p.pillar_id === "opportunities");
  const sovereignty = pillars.find((p) => p.pillar_id === "data_sovereignty");

  const topOpps = (opportunities?.data?.opportunities || [])
    .slice()
    .sort((a, b) => (b.hours_saved || 0) - (a.hours_saved || 0))
    .slice(0, 3);

  const highRisk = (sovereignty?.data?.assets || []).filter(
    (a) => a.risk === "High" || a.risk === "Critical"
  );

  let body = `**Organization:** ${org.name}\n\n`;
  body += `**Engagement:** ${engagement.type} (${engagement.status})\n\n`;
  body += `**Overall AI readiness score:** ${engagement.overall_score ?? "Not scored"}\n\n`;

  if (maturity?.data?.scores) {
    body += "### Maturity snapshot\n\n";
    body += "| Area | Score (0-5) |\n|------|-------------|\n";
    for (const [k, v] of Object.entries(maturity.data.scores)) {
      body += `| ${k} | ${v} |\n`;
    }
    body += "\n";
  }

  if (highRisk.length) {
    body += "### Top risks\n\n";
    highRisk.slice(0, 3).forEach((a) => {
      body += `- **${a.data_type || a.type}** — ${a.risk} risk\n`;
    });
    body += "\n";
  }

  if (topOpps.length) {
    body += "### Top opportunities\n\n";
    topOpps.forEach((o) => {
      body += `- **${o.name}** — ${o.hours_saved || 0} hrs/mo saved, ROI: ${o.roi || "TBD"}\n`;
    });
    body += "\n";
  }

  if (metrics?.litellm) {
    body += "### Platform usage (imported)\n\n";
    body += `- Requests: ${metrics.litellm.total_requests}\n`;
    body += `- Active users: ${metrics.litellm.unique_end_users}\n`;
    body += `- Tokens: ${metrics.litellm.total_tokens}\n`;
  }

  return mdSection("Executive Summary", body);
}

function generateRiskRegister({ pillars }) {
  const sovereignty = pillars.find((p) => p.pillar_id === "data_sovereignty");
  const governance = pillars.find((p) => p.pillar_id === "governance");
  let body = "";

  const assets = (sovereignty?.data?.assets || []).filter(
    (a) => a.risk === "High" || a.risk === "Critical"
  );
  if (assets.length) {
    body += "| Data type | Risk | Leaves AU? | Sovereign required? |\n";
    body += "|-----------|------|------------|---------------------|\n";
    assets.forEach((a) => {
      body += `| ${a.data_type} | ${a.risk} | ${a.can_leave_au ?? "?"} | ${a.sovereign_required ?? "?"} |\n`;
    });
    body += "\n";
  }

  const govItems = governance?.data?.items || {};
  const gaps = Object.entries(govItems).filter(([, v]) => v === "absent" || v === "partial");
  if (gaps.length) {
    body += "### Governance gaps\n\n";
    gaps.forEach(([k, v]) => {
      body += `- ${k}: **${v}**\n`;
    });
  }

  return mdSection("Risk Register", body || "No high-priority risks recorded.");
}

function generateOpportunityMatrix({ pillars }) {
  const opps = pillars.find((p) => p.pillar_id === "opportunities");
  const rows = opps?.data?.opportunities || [];
  if (!rows.length) return mdSection("Opportunity Matrix", "No opportunities recorded.");

  let body = "| Opportunity | Hours saved/mo | Complexity | ROI |\n";
  body += "|-------------|----------------|------------|-----|\n";
  rows.forEach((o) => {
    body += `| ${o.name} | ${o.hours_saved || 0} | ${o.complexity || "-"} | ${o.roi || "-"} |\n`;
  });
  return mdSection("Opportunity Matrix", body);
}

function generateRoadmap({ pillars }) {
  const opps = pillars.find((p) => p.pillar_id === "opportunities");
  const gov = pillars.find((p) => p.pillar_id === "governance");
  const quickWins = (opps?.data?.opportunities || []).filter(
    (o) => o.complexity === "Low" && (o.roi === "High" || o.roi === "Very High")
  );

  let body = "### 30-day actions\n\n";
  quickWins.slice(0, 3).forEach((o) => {
    body += `- Implement **${o.name}** (${o.hours_saved || 0} hrs/mo potential)\n`;
  });

  body += "\n### 90-day actions\n\n";
  body += "- Expand approved AI use cases across departments\n";
  body += "- Establish governance policies for high-risk data classes\n";

  body += "\n### 12-month strategy\n\n";
  body += "- Sovereign/on-prem AI path for classified workloads\n";
  body += "- Benchmark follow-up audit to measure adoption and hours saved\n";

  const govGaps = Object.entries(gov?.data?.items || {}).filter(([, v]) => v === "absent");
  if (govGaps.length) {
    body += "\n### Governance priorities\n\n";
    govGaps.slice(0, 5).forEach(([k]) => {
      body += `- Establish **${k}**\n`;
    });
  }

  return mdSection("Implementation Roadmap", body);
}

function generateAll({ org, engagement, pillars, metrics }) {
  const overall = computeOverallScore(pillars);
  const enrichedEngagement = { ...engagement, overall_score: overall ?? engagement.overall_score };

  return {
    executive_summary: generateExecutiveSummary({
      org,
      engagement: enrichedEngagement,
      pillars,
      metrics,
    }),
    risk_register: generateRiskRegister({ pillars }),
    opportunity_matrix: generateOpportunityMatrix({ pillars }),
    implementation_roadmap: generateRoadmap({ pillars }),
    scorecard: mdSection(
      "AI Maturity Scorecard",
      pillars
        .find((p) => p.pillar_id === "ai_maturity")
        ?.data?.scores
        ? Object.entries(
            pillars.find((p) => p.pillar_id === "ai_maturity").data.scores
          )
            .map(([k, v]) => `- ${k}: ${v}/5`)
            .join("\n")
        : "Not yet scored."
    ),
    sovereignty_assessment: mdSection(
      "Sovereignty Assessment",
      (pillars.find((p) => p.pillar_id === "data_sovereignty")?.data?.assets || [])
        .map(
          (a) =>
            `- **${a.data_type}**: ${a.workload_category || "unclassified"} (${a.risk} risk)`
        )
        .join("\n") || "No data assets classified."
    ),
    department_reviews: mdSection(
      "Department Reviews",
      (pillars.find((p) => p.pillar_id === "business_processes")?.data?.processes || [])
        .map(
          (p) =>
            `### ${p.department}\n- ${p.process}: ${p.hours_per_month || 0} hrs/mo, automation: ${p.automation_potential || "?"}\n`
        )
        .join("\n") || "No department processes recorded."
    ),
  };
}

async function saveDeliverables(engagementId, reports) {
  const saved = [];
  for (const [type, content_md] of Object.entries(reports)) {
    const id = uuidv4();
    const result = await query(
      `INSERT INTO warden_audit_deliverables (id, engagement_id, deliverable_type, content_md)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [id, engagementId, type, content_md]
    );
    saved.push(result.rows[0]);
  }
  return saved;
}

async function listDeliverables(engagementId) {
  const result = await query(
    `SELECT DISTINCT ON (deliverable_type) *
     FROM warden_audit_deliverables
     WHERE engagement_id = $1
     ORDER BY deliverable_type, version DESC, generated_at DESC`,
    [engagementId]
  );
  return result.rows;
}

module.exports = { generateAll, saveDeliverables, listDeliverables };
