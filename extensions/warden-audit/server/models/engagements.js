const { v4: uuidv4 } = require("uuid");
const { query } = require("../db");

async function listEngagements(organizationId) {
  const result = await query(
    `SELECT * FROM warden_audit_engagements
     WHERE organization_id = $1
     ORDER BY created_at DESC`,
    [organizationId]
  );
  return result.rows;
}

async function getEngagement(id) {
  const result = await query(
    `SELECT * FROM warden_audit_engagements WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
}

async function createEngagement(data) {
  const id = uuidv4();
  const result = await query(
    `INSERT INTO warden_audit_engagements (
       id, organization_id, type, status, baseline_engagement_id,
       audit_date, consultant_user_id, interview_notes, metrics_targets
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [
      id,
      data.organization_id,
      data.type || "baseline",
      data.status || "draft",
      data.baseline_engagement_id || null,
      data.audit_date || null,
      data.consultant_user_id || null,
      data.interview_notes || null,
      JSON.stringify(data.metrics_targets || {}),
    ]
  );
  return result.rows[0];
}

async function updateEngagementStatus(id, status) {
  const result = await query(
    `UPDATE warden_audit_engagements SET status = $2, updated_at = NOW() WHERE id = $1 RETURNING *`,
    [id, status]
  );
  return result.rows[0] || null;
}

async function updateEngagement(id, data) {
  const result = await query(
    `UPDATE warden_audit_engagements
     SET audit_date = COALESCE($2, audit_date),
         interview_notes = COALESCE($3, interview_notes),
         overall_score = COALESCE($4, overall_score),
         metrics_targets = COALESCE($5, metrics_targets),
         updated_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [
      id,
      data.audit_date,
      data.interview_notes,
      data.overall_score,
      data.metrics_targets ? JSON.stringify(data.metrics_targets) : null,
    ]
  );
  return result.rows[0] || null;
}

async function getPillarResponse(engagementId, pillarId) {
  const result = await query(
    `SELECT * FROM warden_audit_pillar_responses WHERE engagement_id = $1 AND pillar_id = $2`,
    [engagementId, pillarId]
  );
  return result.rows[0] || null;
}

async function listPillarResponses(engagementId) {
  const result = await query(
    `SELECT * FROM warden_audit_pillar_responses WHERE engagement_id = $1`,
    [engagementId]
  );
  return result.rows;
}

async function upsertPillarResponse(engagementId, pillarId, data, role, completionPct) {
  const id = uuidv4();
  const result = await query(
    `INSERT INTO warden_audit_pillar_responses (id, engagement_id, pillar_id, data, completion_pct, updated_by_role)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT (engagement_id, pillar_id)
     DO UPDATE SET data = EXCLUDED.data,
                   completion_pct = EXCLUDED.completion_pct,
                   updated_by_role = EXCLUDED.updated_by_role,
                   updated_at = NOW()
     RETURNING *`,
    [id, engagementId, pillarId, JSON.stringify(data), completionPct, role]
  );
  return result.rows[0];
}

module.exports = {
  listEngagements,
  getEngagement,
  createEngagement,
  updateEngagementStatus,
  updateEngagement,
  getPillarResponse,
  listPillarResponses,
  upsertPillarResponse,
};
