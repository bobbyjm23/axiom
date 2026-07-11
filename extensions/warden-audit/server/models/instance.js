const { query } = require("../db");

async function getInstanceConfig() {
  const result = await query(
    "SELECT organization_id, updated_at FROM warden_audit_instance_config WHERE id = 1"
  );
  if (!result.rows.length) return { organization_id: null, updated_at: null };
  return result.rows[0];
}

async function bindInstance(organizationId) {
  await query(
    `INSERT INTO warden_audit_instance_config (id, organization_id, updated_at)
     VALUES (1, $1, NOW())
     ON CONFLICT (id) DO UPDATE SET organization_id = EXCLUDED.organization_id, updated_at = NOW()`,
    [organizationId]
  );
  return getInstanceConfig();
}

async function requireBoundOrg() {
  const config = await getInstanceConfig();
  if (!config.organization_id) {
    const err = new Error("No organization bound to this instance");
    err.status = 404;
    throw err;
  }
  return config.organization_id;
}

module.exports = { getInstanceConfig, bindInstance, requireBoundOrg };
