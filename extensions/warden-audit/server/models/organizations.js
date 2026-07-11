const { v4: uuidv4 } = require("uuid");
const { query } = require("../db");

async function listOrganizations() {
  const result = await query(
    `SELECT * FROM warden_audit_organizations ORDER BY created_at DESC`
  );
  return result.rows;
}

async function getOrganization(id) {
  const result = await query(
    `SELECT * FROM warden_audit_organizations WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
}

async function createOrganization(data) {
  const id = uuidv4();
  const result = await query(
    `INSERT INTO warden_audit_organizations (id, name, industry, country, source, contacts, platform_config)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      id,
      data.name,
      data.industry || null,
      data.country || "AU",
      data.source || "unknown",
      JSON.stringify(data.contacts || {}),
      JSON.stringify(data.platform_config || {}),
    ]
  );
  return result.rows[0];
}

async function updateOrganization(id, data) {
  const result = await query(
    `UPDATE warden_audit_organizations
     SET name = COALESCE($2, name),
         industry = COALESCE($3, industry),
         country = COALESCE($4, country),
         source = COALESCE($5, source),
         contacts = COALESCE($6, contacts),
         platform_config = COALESCE($7, platform_config),
         updated_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [
      id,
      data.name,
      data.industry,
      data.country,
      data.source,
      data.contacts ? JSON.stringify(data.contacts) : null,
      data.platform_config ? JSON.stringify(data.platform_config) : null,
    ]
  );
  return result.rows[0] || null;
}

module.exports = {
  listOrganizations,
  getOrganization,
  createOrganization,
  updateOrganization,
};
