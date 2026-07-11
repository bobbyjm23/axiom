const test = require("node:test");
const assert = require("node:assert/strict");
const { computeCompletion, computeOverallScore, engagementProgress } = require("../services/scoring");

test("computeOverallScore averages maturity scores", () => {
  const pillars = [
    {
      pillar_id: "ai_maturity",
      data: { scores: { leadership: 4, staff_adoption: 2 } },
    },
  ];
  assert.equal(computeOverallScore(pillars), 0.6);
});

test("computeCompletion for governance counts answered items", () => {
  const pct = computeCompletion("governance", {
    items: {
      "AI Acceptable Use Policy": "present",
      "Employee guidance": "partial",
    },
  });
  assert.ok(pct > 0 && pct <= 100);
});

test("engagementProgress aggregates pillar completion", () => {
  const progress = engagementProgress([
    { pillar_id: "ai_maturity", completion_pct: 50 },
    { pillar_id: "governance", completion_pct: 100 },
  ]);
  assert.equal(progress.pillars.ai_maturity, 50);
  assert.ok(progress.overall_pct >= 0);
});
