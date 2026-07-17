#!/usr/bin/env node
/**
 * Seed or remove the Harbour Capital Wealth Management audit demo scenario.
 *
 * Usage:
 *   node scripts/demo-data.js seed
 *   node scripts/demo-data.js clean
 */
const path = require("path");

process.chdir(path.join(__dirname, ".."));

const { v4: uuidv4 } = require("uuid");
const { query, runMigrations } = require("../server/db");
const { bindInstance } = require("../server/models/instance");
const { computeCompletion, computeOverallScore } = require("../server/services/scoring");
const reportGenerator = require("../server/services/reportGenerator");

const DEMO = {
  slug: "harbour-capital-wealth",
  orgId: "11111111-1111-4111-8111-111111111101",
  baselineEngagementId: "11111111-1111-4111-8111-111111111102",
  followupEngagementId: "11111111-1111-4111-8111-111111111103",
};

const ORG = {
  name: "Harbour Capital Wealth Management",
  industry: "Wealth Management",
  country: "AU",
  source: "referral",
  contacts: {
    primary: "Elena Vasquez",
    title: "Chief Operating Officer",
    email: "e.vasquez@harbourcapital.demo",
    phone: "+61 2 9000 1200",
    staff_count: 85,
    funds_under_management_aud: "2.1B",
  },
  platform_config: {
    demo: true,
    slug: DEMO.slug,
    licensee: "Harbour Capital Financial Services Pty Ltd",
    afsl: "000000 (demo)",
  },
};

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

function baselineMaturity() {
  return {
    scores: {
      leadership: 1,
      staff_adoption: 2,
      governance: 1,
      security: 2,
      automation: 1,
      training: 1,
    },
    answers: {
      tools_in_use: "ChatGPT, Copilot",
      ai_approved: false,
      has_policy: false,
      dept_tool_sprawl: true,
      has_strategy: false,
      measuring_roi: false,
    },
  };
}

function followupMaturity() {
  return {
    scores: {
      leadership: 3,
      staff_adoption: 4,
      governance: 3,
      security: 4,
      automation: 3,
      training: 3,
    },
    answers: {
      tools_in_use: "ChatGPT, Copilot",
      ai_approved: true,
      has_policy: true,
      dept_tool_sprawl: false,
      has_strategy: true,
      measuring_roi: true,
    },
  };
}

function baselineSovereignty() {
  return {
    assets: [
      {
        data_type: "Financial reports",
        risk: "Critical",
        can_leave_au: "No",
        workload_category: "Client portfolio statements",
        sovereign_required: true,
      },
      {
        data_type: "CRM",
        risk: "Critical",
        can_leave_au: "No",
        workload_category: "Client advice records",
        sovereign_required: true,
      },
      {
        data_type: "Contracts",
        risk: "High",
        can_leave_au: "No",
        workload_category: "SOA and FDS documentation",
        sovereign_required: true,
      },
      {
        data_type: "HR",
        risk: "Medium",
        can_leave_au: "Limited",
        workload_category: "Adviser licensing records",
      },
      {
        data_type: "Marketing",
        risk: "Low",
        can_leave_au: "Yes",
        workload_category: "Newsletters and website copy",
      },
    ],
  };
}

function followupSovereignty() {
  return {
    assets: baselineSovereignty().assets.map((asset) => ({
      ...asset,
      notes: asset.risk === "Critical" ? "Routed through approved Sovereign Warden workspace" : undefined,
    })),
  };
}

function baselineProcesses() {
  return {
    processes: [
      {
        department: "Sales",
        process: "Statement of Advice drafting",
        hours_per_month: 180,
        automation_potential: "High",
        roi: "Very High",
      },
      {
        department: "Sales",
        process: "Client review meeting prep",
        hours_per_month: 95,
        automation_potential: "High",
        roi: "High",
      },
      {
        department: "Finance",
        process: "Portfolio performance reporting",
        hours_per_month: 72,
        automation_potential: "Medium",
        roi: "High",
      },
      {
        department: "Operations",
        process: "KYC / AML verification",
        hours_per_month: 64,
        automation_potential: "Medium",
        roi: "Medium",
      },
      {
        department: "Customer Support",
        process: "Client enquiry triage",
        hours_per_month: 48,
        automation_potential: "High",
        roi: "High",
      },
      {
        department: "Marketing",
        process: "Regulated content review",
        hours_per_month: 36,
        automation_potential: "Medium",
        roi: "Medium",
      },
    ],
  };
}

function followupProcesses() {
  return baselineProcesses().processes.map((row) => ({
    ...row,
    hours_per_month: Math.round(Number(row.hours_per_month) * 0.72),
    automation_potential: row.automation_potential,
    roi: row.roi,
    status: "Pilot or live on Sovereign Warden",
  }));
}

function baselineOpportunities() {
  return {
    opportunities: [
      {
        name: "SOA first-draft generation",
        hours_saved: 60,
        complexity: "Medium",
        roi: "Very High",
      },
      {
        name: "Meeting notes → CRM sync",
        hours_saved: 28,
        complexity: "Low",
        roi: "High",
      },
      {
        name: "Compliance checklist assistant",
        hours_saved: 22,
        complexity: "Medium",
        roi: "High",
      },
      {
        name: "Portfolio commentary drafts",
        hours_saved: 18,
        complexity: "Low",
        roi: "High",
      },
    ],
  };
}

function followupOpportunities() {
  return {
    opportunities: [
      {
        name: "SOA first-draft generation",
        hours_saved: 92,
        complexity: "Medium",
        roi: "Very High",
        status: "Live — 3 advice teams",
      },
      {
        name: "Meeting notes → CRM sync",
        hours_saved: 34,
        complexity: "Low",
        roi: "High",
        status: "Live — ops team",
      },
      {
        name: "Compliance checklist assistant",
        hours_saved: 26,
        complexity: "Medium",
        roi: "High",
        status: "Pilot",
      },
      {
        name: "Portfolio commentary drafts",
        hours_saved: 24,
        complexity: "Low",
        roi: "High",
        status: "Live — paraplanner pool",
      },
      {
        name: "Client enquiry triage",
        hours_saved: 16,
        complexity: "Low",
        roi: "Medium",
        status: "Planned Q2",
      },
    ],
  };
}

function baselineInfrastructure() {
  return {
    storage: "Microsoft 365 / SharePoint",
    checklist: {
      "Identity provider": true,
      "Single Sign-On": true,
      VPN: true,
      Firewall: true,
      Backups: true,
      "Existing GPUs": false,
      Virtualisation: true,
      Bandwidth: true,
    },
  };
}

function followupInfrastructure() {
  return {
    ...baselineInfrastructure(),
    notes: "On-prem Sovereign Warden pilot VM deployed in Sydney DC. LiteLLM gateway integrated with Entra ID.",
  };
}

function governanceItems(statusMap) {
  return { items: statusMap };
}

const GOVERNANCE_BASELINE = governanceItems({
  "AI Acceptable Use Policy": "absent",
  "Employee guidance": "absent",
  "Prompt handling rules": "absent",
  "Human review requirements": "partial",
  "Risk classification": "absent",
  "Audit logging": "partial",
  "Approval processes": "absent",
  "Vendor review": "partial",
  "Procurement process": "present",
  "Data retention policies": "present",
});

const GOVERNANCE_FOLLOWUP = governanceItems({
  "AI Acceptable Use Policy": "present",
  "Employee guidance": "present",
  "Prompt handling rules": "present",
  "Human review requirements": "present",
  "Risk classification": "partial",
  "Audit logging": "present",
  "Approval processes": "partial",
  "Vendor review": "present",
  "Procurement process": "present",
  "Data retention policies": "present",
});

function pillarPayloads(phase) {
  const isBaseline = phase === "baseline";
  return [
    {
      pillar_id: "ai_maturity",
      data: isBaseline ? baselineMaturity() : followupMaturity(),
    },
    {
      pillar_id: "data_sovereignty",
      data: isBaseline ? baselineSovereignty() : followupSovereignty(),
    },
    {
      pillar_id: "business_processes",
      data: isBaseline ? baselineProcesses() : followupProcesses(),
    },
    {
      pillar_id: "opportunities",
      data: isBaseline ? baselineOpportunities() : followupOpportunities(),
    },
    {
      pillar_id: "infrastructure",
      data: isBaseline ? baselineInfrastructure() : followupInfrastructure(),
    },
    {
      pillar_id: "governance",
      data: isBaseline ? GOVERNANCE_BASELINE : GOVERNANCE_FOLLOWUP,
    },
  ];
}

async function upsertPillar(engagementId, pillarId, data, role = "admin") {
  const completion = computeCompletion(pillarId, data);
  await query(
    `INSERT INTO warden_audit_pillar_responses (id, engagement_id, pillar_id, data, completion_pct, updated_by_role)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT (engagement_id, pillar_id)
     DO UPDATE SET data = EXCLUDED.data,
                   completion_pct = EXCLUDED.completion_pct,
                   updated_by_role = EXCLUDED.updated_by_role,
                   updated_at = NOW()`,
    [uuidv4(), engagementId, pillarId, JSON.stringify(data), completion, role]
  );
  return completion;
}

async function insertMetricsSnapshot(engagementId, metrics, periodStart, periodEnd, capturedAt) {
  await query(
    `INSERT INTO warden_audit_metrics_snapshots (id, engagement_id, source, metrics, period_start, period_end, captured_at)
     VALUES ($1, $2, 'combined', $3, $4, $5, $6)`,
    [uuidv4(), engagementId, JSON.stringify(metrics), periodStart, periodEnd, capturedAt]
  );
}

async function saveDeliverables(engagement, org, pillars, metrics) {
  const reports = reportGenerator.generateAll({ org, engagement, pillars, metrics });
  await query(`DELETE FROM warden_audit_deliverables WHERE engagement_id = $1`, [engagement.id]);
  await reportGenerator.saveDeliverables(engagement.id, reports);
}

async function cleanDemo() {
  const existing = await query(
    `SELECT id FROM warden_audit_organizations
     WHERE id = $1 OR (platform_config->>'demo' = 'true' AND platform_config->>'slug' = $2)`,
    [DEMO.orgId, DEMO.slug]
  );

  for (const row of existing.rows) {
    await query(
      `UPDATE warden_audit_instance_config SET organization_id = NULL, updated_at = NOW()
       WHERE organization_id = $1`,
      [row.id]
    );
    await query(`DELETE FROM warden_audit_organizations WHERE id = $1`, [row.id]);
  }

  console.log(
    existing.rows.length
      ? `Removed demo organization (${DEMO.slug}) and related audit data.`
      : "No demo data found — nothing to remove."
  );
}

async function seedDemo() {
  await runMigrations();
  await cleanDemo();

  const baselineDate = daysAgo(90);
  const followupDate = daysAgo(3);
  const baselineCreated = daysAgo(95);
  const followupCreated = daysAgo(7);

  await query(
    `INSERT INTO warden_audit_organizations (id, name, industry, country, source, contacts, platform_config, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $8)`,
    [
      DEMO.orgId,
      ORG.name,
      ORG.industry,
      ORG.country,
      ORG.source,
      JSON.stringify(ORG.contacts),
      JSON.stringify(ORG.platform_config),
      baselineCreated,
    ]
  );

  await bindInstance(DEMO.orgId);

  const baselineInterview =
    "Day-zero baseline with COO and Head of Advice. Widespread shadow AI in SOA drafting and meeting notes. " +
    "No approved tool; client portfolio data routinely pasted into US-hosted chat tools. AFCA and Privacy Act exposure flagged.";
  const followupInterview =
    "90-day review: Sovereign Warden pilot live for advice, paraplanner, and ops teams. SOA first-draft workflow adopted by 3 teams. " +
    "Acceptable use policy published. LiteLLM usage up 6×; 48 active users. Remaining gap: formal risk classification for new use cases.";

  await query(
    `INSERT INTO warden_audit_engagements (
       id, organization_id, type, status, baseline_engagement_id,
       audit_date, interview_notes, metrics_targets, created_at, updated_at
     ) VALUES ($1, $2, 'baseline', 'final', NULL, $3, $4, $5, $6, $6)`,
    [
      DEMO.baselineEngagementId,
      DEMO.orgId,
      baselineDate,
      baselineInterview,
      JSON.stringify({
        active_users_target: 25,
        monthly_hours_saved_target: 80,
        policy_adoption_target_pct: 60,
      }),
      baselineCreated,
    ]
  );

  await query(
    `INSERT INTO warden_audit_engagements (
       id, organization_id, type, status, baseline_engagement_id,
       audit_date, interview_notes, metrics_targets, created_at, updated_at
     ) VALUES ($1, $2, 'followup', 'final', $3, $4, $5, $6, $7, $7)`,
    [
      DEMO.followupEngagementId,
      DEMO.orgId,
      DEMO.baselineEngagementId,
      followupDate,
      followupInterview,
      JSON.stringify({
        active_users_target: 25,
        monthly_hours_saved_target: 80,
        policy_adoption_target_pct: 60,
        active_users_actual: 48,
        monthly_hours_saved_actual: 176,
        policy_adoption_actual_pct: 82,
      }),
      followupCreated,
    ]
  );

  for (const phase of [
    { id: DEMO.baselineEngagementId, phase: "baseline" },
    { id: DEMO.followupEngagementId, phase: "followup" },
  ]) {
    const payloads = pillarPayloads(phase.phase);
    for (const pillar of payloads) {
      await upsertPillar(phase.id, pillar.pillar_id, pillar.data);
    }

    const pillarRows = (
      await query(`SELECT * FROM warden_audit_pillar_responses WHERE engagement_id = $1`, [phase.id])
    ).rows;
    const overall = computeOverallScore(pillarRows);
    await query(
      `UPDATE warden_audit_engagements SET overall_score = $2, updated_at = NOW() WHERE id = $1`,
      [phase.id, overall]
    );
  }

  const baselineMetrics = {
    litellm: {
      total_requests: 420,
      total_tokens: 182000,
      unique_end_users: 12,
      estimated_cost_usd: 8.45,
    },
    anythingllm: { workspace_count: 3 },
    narrative:
      "First 30 days post-baseline — limited pilot, mostly shadow-AI replacement in one advice pod.",
  };

  const followupMetrics = {
    litellm: {
      total_requests: 2840,
      total_tokens: 1245000,
      unique_end_users: 48,
      estimated_cost_usd: 62.4,
    },
    anythingllm: { workspace_count: 8 },
    narrative: "Days 61–90 — firm-wide rollout; SOA and meeting-note workflows driving adoption.",
  };

  await insertMetricsSnapshot(
    DEMO.baselineEngagementId,
    baselineMetrics,
    daysAgo(75),
    daysAgo(60),
    daysAgo(60)
  );
  await insertMetricsSnapshot(
    DEMO.followupEngagementId,
    followupMetrics,
    daysAgo(30),
    daysAgo(0),
    daysAgo(1)
  );

  const org = (await query(`SELECT * FROM warden_audit_organizations WHERE id = $1`, [DEMO.orgId])).rows[0];

  for (const engagementId of [DEMO.baselineEngagementId, DEMO.followupEngagementId]) {
    const engagement = (
      await query(`SELECT * FROM warden_audit_engagements WHERE id = $1`, [engagementId])
    ).rows[0];
    const pillars = (
      await query(`SELECT * FROM warden_audit_pillar_responses WHERE engagement_id = $1`, [engagementId])
    ).rows;
    const metricsRow = (
      await query(
        `SELECT metrics FROM warden_audit_metrics_snapshots WHERE engagement_id = $1 ORDER BY captured_at DESC LIMIT 1`,
        [engagementId]
      )
    ).rows[0];
    await saveDeliverables(engagement, org, pillars, metricsRow?.metrics || null);
  }

  const baseline = (
    await query(`SELECT overall_score FROM warden_audit_engagements WHERE id = $1`, [
      DEMO.baselineEngagementId,
    ])
  ).rows[0];
  const followup = (
    await query(`SELECT overall_score FROM warden_audit_engagements WHERE id = $1`, [
      DEMO.followupEngagementId,
    ])
  ).rows[0];

  console.log("");
  console.log("Harbour Capital Wealth Management demo seeded.");
  console.log(`  Organization : ${ORG.name}`);
  console.log(`  Baseline     : score ${baseline.overall_score} · audit ${baselineDate.toISOString().slice(0, 10)}`);
  console.log(`  90-day review: score ${followup.overall_score} · audit ${followupDate.toISOString().slice(0, 10)}`);
  console.log("");
  console.log("Open the audit dashboard:");
  console.log("  http://localhost:3000/settings/audit/");
  console.log("");
}

async function main() {
  const command = process.argv[2];
  if (!process.env.DATABASE_URL && !process.env.WARDEN_AUDIT_DATABASE_URL) {
    console.error("DATABASE_URL is required.");
    process.exit(1);
  }

  try {
    if (command === "seed") {
      await seedDemo();
    } else if (command === "clean") {
      await runMigrations();
      await cleanDemo();
    } else {
      console.error("Usage: node scripts/demo-data.js <seed|clean>");
      process.exit(1);
    }
  } catch (err) {
    console.error(err.message || err);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

main();
