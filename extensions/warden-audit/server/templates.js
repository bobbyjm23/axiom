const fs = require("fs");
const path = require("path");

let cached = null;

function loadPillarTemplates() {
  if (cached) return cached;
  const templatePath = path.join(
    __dirname,
    "..",
    "templates",
    "pillars.json"
  );
  cached = JSON.parse(fs.readFileSync(templatePath, "utf8"));
  return cached;
}

function getPillar(pillarId) {
  const templates = loadPillarTemplates();
  return templates[pillarId] || null;
}

function canEditPillar(pillarId, role) {
  const pillar = getPillar(pillarId);
  if (!pillar) return false;
  const roles = pillar.editable_roles || ["admin"];
  return roles.includes(role);
}

function listPillarIds() {
  return Object.keys(loadPillarTemplates());
}

module.exports = {
  loadPillarTemplates,
  getPillar,
  canEditPillar,
  listPillarIds,
};
