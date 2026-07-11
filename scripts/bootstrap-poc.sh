#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "==> Sovereign Warden Platform — POC Bootstrap"

if [[ ! -f .env ]]; then
  if [[ -f .env.poc.example ]]; then
    echo "Creating .env from .env.poc.example"
    cp .env.poc.example .env
    echo "WARNING: Edit .env and set GEMINI_API_KEY, QDRANT_ENDPOINT, QDRANT_API_KEY, and passwords before production use."
  else
    echo "ERROR: No .env file found. Copy .env.poc.example to .env first."
    exit 1
  fi
fi

# Load env for checks (docker compose uses --env-file; avoid UID/GID shell conflicts)
# shellcheck disable=SC1091
source "$(dirname "${BASH_SOURCE[0]}")/lib/load-env.sh"
load_env_file .env

command -v docker >/dev/null 2>&1 || { echo "ERROR: docker is required"; exit 1; }
docker compose version >/dev/null 2>&1 || { echo "ERROR: docker compose is required"; exit 1; }

if [[ ! -f platform/anythingllm/.env ]]; then
  echo "Creating writable platform/anythingllm/.env from .env.example"
  cp platform/anythingllm/.env.example platform/anythingllm/.env
fi

echo "==> Starting platform stack..."
docker compose --env-file .env up -d postgres redis

echo "==> Waiting for PostgreSQL..."
until docker compose --env-file .env exec -T postgres pg_isready -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" >/dev/null 2>&1; do
  sleep 2
done

echo "==> Enabling PostgreSQL extensions (pgvector)..."
./scripts/init-postgres-extensions.sh || true

echo "==> Building AnythingLLM with Warden Audit extension (first run may take several minutes)..."
docker compose --env-file .env build anythingllm

echo "==> Starting LiteLLM, AnythingLLM, Nginx..."
docker compose --env-file .env up -d litellm anythingllm nginx

echo "==> Waiting for LiteLLM health..."
for i in $(seq 1 30); do
  if curl -sf "http://localhost:4000/health/liveliness" >/dev/null 2>&1; then
    echo "LiteLLM is healthy."
    break
  fi
  if [[ $i -eq 30 ]]; then
    echo "WARNING: LiteLLM health check timed out. Check logs: docker compose logs litellm"
  fi
  sleep 3
done

echo "==> Verifying LiteLLM model list..."
if curl -sf -H "Authorization: Bearer ${LITELLM_MASTER_KEY}" "http://localhost:4000/v1/models" | head -c 200; then
  echo ""
  echo "LiteLLM /v1/models responded."
else
  echo "WARNING: Could not reach LiteLLM /v1/models. Ensure LITELLM_MASTER_KEY is set in .env"
fi

echo ""
echo "==> Bootstrap complete!"
echo ""
echo "  AnythingLLM (direct):  http://localhost:3002"
echo "  AnythingLLM (Nginx):   http://localhost:${NGINX_HTTP_PORT:-3000}"
echo "  LiteLLM gateway:       http://localhost:4000"
echo ""
echo "Next steps:"
echo "  1. Open http://localhost:3000 (or http://localhost:3002) and complete first-time setup"
echo "  2. Admin → System Settings → Enable Multi-User mode"
echo "  3. Admin → Appearance → Configure branding (logo, app name)"
echo "  4. Create workspaces per docs/poc-demo-script.md"
echo "  5. Run ./desktop/setup-fork.sh to build the Electron client"
echo "  6. Settings → AI Readiness Audit — start a baseline audit (admin/manager)"
echo ""
echo "Verify audit extension:"
echo "  ./scripts/verify-audit-extension.sh"
echo ""
echo "Optional observability:"
echo "  docker compose --env-file .env --profile observability up -d langfuse"
