const path = require("path");
const { runMigrations } = require("./db");
const { registerWardenAuditRoutes, registerStaticUI } = require("./endpoints");

let initialized = false;

async function register(app, apiRouter) {
  if (process.env.WARDEN_AUDIT_ENABLED === "false") {
    console.log("[warden-audit] Extension disabled (WARDEN_AUDIT_ENABLED=false)");
    return;
  }

  if (!initialized) {
    try {
      await runMigrations();
      initialized = true;
      console.log("[warden-audit] Migrations complete");
    } catch (err) {
      console.error("[warden-audit] Migration failed:", err.message);
      throw err;
    }
  }

  registerWardenAuditRoutes(apiRouter);
  console.log("[warden-audit] Routes registered at /api/warden-audit/*");
}

module.exports = { register, registerStaticUI };
