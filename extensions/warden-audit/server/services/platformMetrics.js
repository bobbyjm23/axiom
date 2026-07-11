const path = require("path");
const { serverRoot } = require("../middleware/auth");

async function importAnythingLLMMetrics() {
  const metrics = {
    workspace_count: 0,
    workspaces: [],
    healthy: false,
  };

  try {
    const root = serverRoot();
    const { Workspace } = require(path.join(root, "models/workspace"));
    const workspaces = await Workspace.where();
    metrics.workspace_count = workspaces.length;
    metrics.workspaces = workspaces.map((w) => ({
      slug: w.slug,
      name: w.name,
      document_count: null,
    }));
    metrics.healthy = true;
  } catch (err) {
    console.warn("[warden-audit] AnythingLLM workspace import:", err.message);
    metrics.error = err.message;
  }

  return metrics;
}

async function importCombinedMetrics({ periodStart, periodEnd }) {
  const { importLiteLLMMetrics } = require("./litellmImport");
  const [litellm, anythingllm] = await Promise.all([
    importLiteLLMMetrics({ periodStart, periodEnd }),
    importAnythingLLMMetrics(),
  ]);

  return {
    litellm,
    anythingllm,
    captured_at: new Date().toISOString(),
    period_start: periodStart,
    period_end: periodEnd,
  };
}

module.exports = { importAnythingLLMMetrics, importCombinedMetrics };
