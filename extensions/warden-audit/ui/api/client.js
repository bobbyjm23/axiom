const API_BASE = typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE
  ? import.meta.env.VITE_API_BASE
  : "";

function apiRoot() {
  return API_BASE || window.location.origin;
}

function getAuthHeaders() {
  const token = localStorage.getItem("anythingllm_authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  const response = await fetch(`${apiRoot()}/api/warden-audit${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...(options.headers || {}),
    },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.error || `Request failed (${response.status})`);
  }
  return body;
}

export const AuditAPI = {
  health: () => request("/health"),
  instance: () => request("/instance"),
  bindInstance: (organization_id) =>
    request("/instance/bind", { method: "PUT", body: JSON.stringify({ organization_id }) }),
  templates: () => request("/templates/pillars"),
  listOrganizations: () => request("/organizations"),
  createOrganization: (data) =>
    request("/organizations", { method: "POST", body: JSON.stringify(data) }),
  getOrganization: (id) => request(`/organizations/${id}`),
  createEngagement: (data) =>
    request("/engagements", { method: "POST", body: JSON.stringify(data) }),
  getEngagement: (id) => request(`/engagements/${id}`),
  updateStatus: (id, status) =>
    request(`/engagements/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) }),
  savePillar: (id, pillarId, data) =>
    request(`/engagements/${id}/pillars/${pillarId}`, {
      method: "PUT",
      body: JSON.stringify({ data }),
    }),
  importMetrics: (id, period) =>
    request(`/engagements/${id}/import-metrics`, {
      method: "POST",
      body: JSON.stringify(period || {}),
    }),
  generateDeliverables: (id) =>
    request(`/engagements/${id}/deliverables/generate`, { method: "POST" }),
  listDeliverables: (id) => request(`/engagements/${id}/deliverables`),
  exportDeliverable: (id, type, format = "md") =>
    fetch(
      `${apiRoot()}/api/warden-audit/engagements/${id}/deliverables/${type}/export?format=${format}`,
      { headers: getAuthHeaders() }
    ),
};
