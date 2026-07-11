const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

let pool = null;

function getPool() {
  if (pool) return pool;
  const connectionString =
    process.env.DATABASE_URL || process.env.WARDEN_AUDIT_DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is required for Warden Audit extension (shared PostgreSQL)"
    );
  }
  pool = new Pool({ connectionString });
  return pool;
}

async function runMigrations() {
  const migrationsDir = path.join(__dirname, "migrations");
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  const db = getPool();
  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
    await db.query(sql);
  }
}

async function query(text, params) {
  return getPool().query(text, params);
}

module.exports = { getPool, runMigrations, query };
