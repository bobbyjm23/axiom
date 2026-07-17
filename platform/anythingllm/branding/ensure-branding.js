/**
 * Seed AnythingLLM Admin Appearance defaults so branding survives restarts.
 * Idempotent. Uses system_settings (custom_app_name + logo_filename) — the
 * native mechanism — not frontend CSS/JS overlays.
 *
 * Env:
 *   STORAGE_DIR              AnythingLLM storage root (default: /app/server/storage)
 *   WARDEN_BRANDING_DIR      Asset directory (default: /app/server/public/warden-branding)
 *   WARDEN_BRANDING_FORCE    When "true", overwrite non-default logos with Warden wordmark
 */
const fs = require("fs");
const path = require("path");

const APP_NAME = "Sovereign Warden";
const LOGO_FILENAME = "sovereign-warden-logo.png";
const DEFAULT_LOGOS = new Set(["anything-llm.png", "anything-llm-dark.png"]);

async function upsertSetting(prisma, label, value) {
  const existing = await prisma.system_settings.findUnique({ where: { label } });
  if (!existing) {
    await prisma.system_settings.create({ data: { label, value } });
    return "created";
  }
  if (existing.value === value) return "unchanged";
  await prisma.system_settings.update({
    where: { label },
    data: { value },
  });
  return "updated";
}

module.exports = async function ensureWardenBranding() {
  const storageDir = process.env.STORAGE_DIR || path.join(__dirname, "../../storage");
  const brandDir = process.env.WARDEN_BRANDING_DIR || __dirname;
  const assetsDir = path.join(storageDir, "assets");
  const logoSrc = path.join(brandDir, "logo-light.png");
  const force = process.env.WARDEN_BRANDING_FORCE === "true";

  if (!fs.existsSync(logoSrc)) {
    console.warn("[warden-branding] Missing logo asset:", logoSrc);
    return { ok: false, reason: "missing-logo-asset" };
  }

  fs.mkdirSync(assetsDir, { recursive: true });

  let PrismaClient;
  try {
    ({ PrismaClient } = require("@prisma/client"));
  } catch (err) {
    console.warn("[warden-branding] Prisma unavailable:", err.message);
    return { ok: false, reason: "no-prisma" };
  }

  const prisma = new PrismaClient();
  try {
    const nameAction = await upsertSetting(prisma, "custom_app_name", APP_NAME);

    const current = await prisma.system_settings.findUnique({
      where: { label: "logo_filename" },
    });
    const currentLogo = current?.value || "anything-llm.png";
    const shouldInstallLogo =
      force ||
      DEFAULT_LOGOS.has(currentLogo) ||
      currentLogo === LOGO_FILENAME ||
      !currentLogo;

    let logoAction = "skipped";
    if (shouldInstallLogo) {
      const dest = path.join(assetsDir, LOGO_FILENAME);
      fs.copyFileSync(logoSrc, dest);
      logoAction = await upsertSetting(prisma, "logo_filename", LOGO_FILENAME);
      if (currentLogo && !DEFAULT_LOGOS.has(currentLogo) && currentLogo !== LOGO_FILENAME) {
        const stale = path.join(assetsDir, currentLogo);
        try {
          if (fs.existsSync(stale)) fs.unlinkSync(stale);
        } catch (_) {
          /* ignore */
        }
      }
    }

    console.log(
      `[warden-branding] App name: ${nameAction}; logo: ${logoAction} (${LOGO_FILENAME})`
    );
    return { ok: true, nameAction, logoAction };
  } finally {
    await prisma.$disconnect();
  }
};

if (require.main === module) {
  module
    .exports()
    .then((r) => {
      if (!r?.ok) process.exitCode = 1;
    })
    .catch((err) => {
      console.error("[warden-branding]", err);
      process.exit(1);
    });
}
