#!/usr/bin/env bash
# Verify Warden Audit extension health and API surface
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# shellcheck disable=SC1091
source "$(dirname "${BASH_SOURCE[0]}")/lib/load-env.sh"
load_env_file .env 2>/dev/null || true

BASE="${PLATFORM_URL:-http://localhost:3000}"
PORT="${NGINX_HTTP_PORT:-3000}"
BASE="http://localhost:${PORT}"

echo "==> Warden Audit extension verification"
echo "    Platform: ${BASE}"

echo -n "Health endpoint... "
HEALTH=$(curl -sf "${BASE}/api/warden-audit/health" || echo "FAIL")
if echo "$HEALTH" | grep -q '"ok":true'; then
  echo "OK"
else
  echo "FAIL"
  echo "$HEALTH"
  echo "Ensure platform is running: ./scripts/bootstrap-poc.sh"
  exit 1
fi

echo -n "Extension enabled flag... "
if echo "$HEALTH" | grep -q '"enabled":true'; then
  echo "true"
else
  echo "disabled (WARDEN_AUDIT_ENABLED=false)"
fi

echo -n "Standalone UI... "
UI_CODE=$(curl -s -o /dev/null -w "%{http_code}" "${BASE}/settings/audit/" || echo "000")
if [ "$UI_CODE" = "200" ]; then
  echo "OK (${BASE}/settings/audit/)"
else
  echo "not served (HTTP ${UI_CODE}) — rebuild: docker compose build anythingllm && docker compose up -d anythingllm"
fi

echo ""
echo "Manual checks (requires admin session in browser):"
echo "  1. Open ${BASE}/settings/audit/ (Docker) or Settings → AI Readiness Audit (desktop build)"
echo "  2. Create organization and bind instance — or run ./scripts/seed-audit-demo.sh for demo data"
echo "  3. Start baseline engagement and save a pillar"
echo "  4. Import metrics (admin) and generate deliverables"
echo ""
echo "Disable extension without removing data:"
echo "  WARDEN_AUDIT_ENABLED=false docker compose --env-file .env up -d anythingllm"
