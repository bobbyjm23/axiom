const test = require("node:test");
const assert = require("node:assert/strict");
const { generateAll } = require("../services/reportGenerator");

test("generateAll produces executive summary markdown", () => {
  const reports = generateAll({
    org: { name: "Acme Legal" },
    engagement: { type: "baseline", status: "draft", overall_score: 0.5 },
    pillars: [
      {
        pillar_id: "ai_maturity",
        data: { scores: { leadership: 3 } },
      },
      {
        pillar_id: "opportunities",
        data: {
          opportunities: [
            { name: "Meeting summaries", hours_saved: 80, complexity: "Low", roi: "High" },
          ],
        },
      },
    ],
    metrics: { litellm: { total_requests: 100, unique_end_users: 5, total_tokens: 1000 } },
  });

  assert.ok(reports.executive_summary.includes("Executive Summary"));
  assert.ok(reports.executive_summary.includes("Acme Legal"));
  assert.ok(reports.opportunity_matrix.includes("Meeting summaries"));
  assert.ok(reports.implementation_roadmap.includes("30-day"));
});
