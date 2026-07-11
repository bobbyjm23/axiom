export const paths = {
  home: () => "/",
  audit: {
    home: () => "/settings/audit/",
    engagement: (id) => `/settings/audit/#/engagements/${id}`,
    pillar: (id, pillarId) => `/settings/audit/#/engagements/${id}/pillars/${pillarId}`,
    metrics: (id) => `/settings/audit/#/engagements/${id}/metrics`,
    deliverables: (id) => `/settings/audit/#/engagements/${id}/deliverables`,
    newOrg: () => "/settings/audit/#/clients/new",
  },
  settings: {
    users: () => "/settings/users",
    invites: () => "/settings/invites",
    workspaces: () => "/settings/workspaces",
    chats: () => "/settings/workspace-chats",
    llmPreference: () => "/settings/llm-preference",
    transcriptionPreference: () => "/settings/transcription-preference",
    audioPreference: () => "/settings/audio-preference",
    embedder: {
      modelPreference: () => "/settings/embedding-preference",
      chunkingPreference: () => "/settings/text-splitter-preference",
    },
    vectorDatabase: () => "/settings/vector-database",
    security: () => "/settings/security",
    interface: () => "/settings/interface",
    branding: () => "/settings/branding",
    agentSkills: () => "/settings/agents",
    chat: () => "/settings/chat",
    apiKeys: () => "/settings/api-keys",
    systemPromptVariables: () => "/settings/system-prompt-variables",
    logs: () => "/settings/event-logs",
    privacy: () => "/settings/privacy",
    embedChatWidgets: () => "/settings/embed-chat-widgets",
    browserExtension: () => "/settings/browser-extension",
    experimental: () => "/settings/experimental",
  },
  communityHub: {
    trending: () => "/settings/community-hub/trending",
    authentication: () => "/settings/community-hub/authentication",
    importItem: () => "/settings/community-hub/import-item",
  },
  mailToMintplex: () => "mailto:team@mintplexlabs.com",
  github: () => "https://github.com/Mintplex-Labs/anything-llm",
  docs: () => "https://docs.anythingllm.com",
};

export function isAuditPath() {
  return window.location.pathname.startsWith("/settings/audit");
}

export function isPathActive(href) {
  const path = window.location.pathname;
  if (href === paths.audit.home() || href.startsWith("/settings/audit")) {
    return path.startsWith("/settings/audit");
  }
  return path === href;
}
