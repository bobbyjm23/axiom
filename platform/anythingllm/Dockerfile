# Sovereign Warden — AnythingLLM with AI Readiness Audit extension
# Note: Docker Hub has no 1.8.5-pg tag; earliest versioned PG image is pg-1.9.0.
# Desktop fork may remain on v1.8.5; platform Docker uses pg-1.9.0 for shared PostgreSQL.
ARG ANYTHINGLLM_PG_VERSION=1.9.0
FROM mintplexlabs/anythingllm:pg-${ANYTHINGLLM_PG_VERSION}

USER root

# Install extension server dependencies
COPY extensions/warden-audit/package.json /app/extensions/warden-audit/package.json
COPY extensions/warden-audit/server /app/extensions/warden-audit/server
COPY extensions/warden-audit/scripts /app/extensions/warden-audit/scripts
COPY extensions/warden-audit/templates /app/extensions/warden-audit/templates
COPY extensions/warden-audit/extension.json /app/extensions/warden-audit/extension.json

RUN cd /app/extensions/warden-audit && npm install --omit=dev

# Standalone audit UI (served at /settings/audit/ — no AnythingLLM frontend rebuild required)
COPY extensions/warden-audit/ui /app/extensions/warden-audit/ui
COPY extensions/warden-audit/hosts /app/extensions/warden-audit/hosts
COPY extensions/warden-audit/standalone /app/extensions/warden-audit/standalone
RUN cd /app/extensions/warden-audit/standalone && \
    npm install --include=dev && \
    npm run build && \
    rm -rf node_modules

# Apply minimal upstream hooks (server loader + optional frontend if present in image)
COPY platform/anythingllm/patches /tmp/patches
RUN chmod +x /tmp/patches/apply.sh /tmp/patches/apply-warden-patches.sh && \
    /tmp/patches/apply.sh

# Sovereign Warden durable branding assets (Admin Appearance seed + fallback public logos)
COPY platform/anythingllm/branding /app/server/public/warden-branding
RUN cp /app/server/public/warden-branding/login-logo-light.svg /app/server/public/login-logo-light.svg && \
    cp /app/server/public/warden-branding/login-logo.svg /app/server/public/login-logo.svg && \
    chmod -R a+r /app/server/public/warden-branding /app/server/public/login-logo-light.svg /app/server/public/login-logo.svg

ENV WARDEN_AUDIT_ENABLED=true
ENV WARDEN_AUDIT_PATH=/app/extensions/warden-audit/server
ENV ANYTHINGLLM_SERVER_ROOT=/app/server
ENV WARDEN_BRANDING_DIR=/app/server/public/warden-branding
ENV WARDEN_BRANDING_FORCE=true
