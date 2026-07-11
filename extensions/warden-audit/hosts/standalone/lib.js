export const auditPaths = {
  home: () => "/",
  newOrg: () => "/clients/new",
  engagement: (id) => `/engagements/${id}`,
  pillar: (id, pillarId) => `/engagements/${id}/pillars/${pillarId}`,
  metrics: (id) => `/engagements/${id}/metrics`,
  deliverables: (id) => `/engagements/${id}/deliverables`,
};

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem("anythingllm_user") || "null") || null;
  } catch {
    return null;
  }
}

export function toast(message, type = "info") {
  if (type === "error") console.error("[audit]", message);
  else console.log("[audit]", message);
}
