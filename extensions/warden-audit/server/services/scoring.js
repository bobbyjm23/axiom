const { listPillarIds, getPillar } = require("../templates");

function computeCompletion(pillarId, data) {
  const template = getPillar(pillarId);
  if (!template) return 0;

  if (pillarId === "ai_maturity") {
    const areas = template.areas || [];
    const scores = areas.filter((a) => data.scores?.[a.id] !== undefined && data.scores[a.id] !== null);
    const questions = (template.questions || []).filter((q) => data.answers?.[q.id] !== undefined);
    const total = areas.length + (template.questions || []).length;
    if (!total) return 0;
    return Math.round(((scores.length + questions.length) / total) * 100);
  }

  if (pillarId === "data_sovereignty") {
    const assets = data.assets || [];
    return assets.length ? Math.min(100, assets.length * 10) : 0;
  }

  if (pillarId === "business_processes") {
    const rows = data.processes || [];
    return rows.length ? Math.min(100, rows.length * 5) : 0;
  }

  if (pillarId === "opportunities") {
    const rows = data.opportunities || [];
    return rows.length ? Math.min(100, rows.length * 15) : 0;
  }

  if (pillarId === "infrastructure") {
    const answered = Object.keys(data.checklist || {}).length + (data.storage ? 1 : 0);
    const total = (template.checklist || []).length + 1;
    return Math.round((answered / total) * 100);
  }

  if (pillarId === "governance") {
    const items = data.items || {};
    const total = (template.items || []).length;
    const answered = Object.keys(items).filter((k) => items[k]).length;
    return total ? Math.round((answered / total) * 100) : 0;
  }

  return Object.keys(data).length ? 50 : 0;
}

function computeOverallScore(pillarResponses) {
  const maturity = pillarResponses.find((p) => p.pillar_id === "ai_maturity");
  if (!maturity?.data?.scores) return null;
  const scores = Object.values(maturity.data.scores).filter((v) => typeof v === "number");
  if (!scores.length) return null;
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  return Math.round((avg / 5) * 100) / 100;
}

function engagementProgress(pillarResponses) {
  const ids = listPillarIds();
  const map = Object.fromEntries(pillarResponses.map((p) => [p.pillar_id, p.completion_pct || 0]));
  const values = ids.map((id) => map[id] || 0);
  const avg = values.reduce((a, b) => a + b, 0) / (values.length || 1);
  return { pillars: map, overall_pct: Math.round(avg) };
}

module.exports = { computeCompletion, computeOverallScore, engagementProgress };
