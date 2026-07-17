#!/usr/bin/env bash
# Seed Harbour Capital Wealth Management audit demo (baseline + 90-day follow-up)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# shellcheck disable=SC1091
source "$(dirname "${BASH_SOURCE[0]}")/lib/load-env.sh"
load_env_file .env 2>/dev/null || true

if docker compose --env-file .env ps --status running anythingllm 2>/dev/null | grep -q anythingllm; then
  echo "==> Seeding audit demo via AnythingLLM container..."
  docker compose --env-file .env exec -T anythingllm mkdir -p /app/extensions/warden-audit/scripts
  docker compose --env-file .env cp extensions/warden-audit/scripts/demo-data.js \
    anythingllm:/app/extensions/warden-audit/scripts/demo-data.js 2>/dev/null || true
  docker compose --env-file .env exec -T anythingllm \
    node /app/extensions/warden-audit/scripts/demo-data.js seed
elif docker compose --env-file .env ps --status running postgres 2>/dev/null | grep -q postgres; then
  echo "==> Seeding audit demo via local Node (postgres reachable on localhost)..."
  LOCAL_URL="${DATABASE_URL//@postgres:/@localhost:}"
  DATABASE_URL="${LOCAL_URL}" node extensions/warden-audit/scripts/demo-data.js seed
else
  echo "Start the platform first: ./scripts/bootstrap-poc.sh"
  echo "Or set DATABASE_URL and run: node extensions/warden-audit/scripts/demo-data.js seed"
  exit 1
fi
