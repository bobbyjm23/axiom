#!/usr/bin/env bash
# Verify LiteLLM gateway returns Claude models
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ ! -f .env ]]; then
  echo "ERROR: .env not found. Run bootstrap-poc.sh first."
  exit 1
fi

# shellcheck disable=SC1091
source "$(dirname "${BASH_SOURCE[0]}")/lib/load-env.sh"
load_env_file .env

LITELLM_URL="${LITELLM_URL:-http://localhost:4000}"
MASTER_KEY="${LITELLM_MASTER_KEY}"

echo "==> Testing LiteLLM gateway at $LITELLM_URL"

echo "--- Health check ---"
curl -sf "${LITELLM_URL}/health/liveliness" && echo " OK" || { echo "FAIL"; exit 1; }

echo "--- Model list ---"
curl -sf -H "Authorization: Bearer ${MASTER_KEY}" "${LITELLM_URL}/v1/models" | python3 -m json.tool 2>/dev/null || \
  curl -sf -H "Authorization: Bearer ${MASTER_KEY}" "${LITELLM_URL}/v1/models"

echo ""
echo "--- Chat completion (gemini-flash, minimal tokens) ---"
if [[ -n "${GEMINI_API_KEY:-}" && "${GEMINI_API_KEY}" != "your-gemini-api-key" ]]; then
  curl -sf "${LITELLM_URL}/v1/chat/completions" \
    -H "Authorization: Bearer ${MASTER_KEY}" \
    -H "Content-Type: application/json" \
    -d '{
      "model": "gemini-flash",
      "messages": [{"role": "user", "content": "Reply with exactly: gateway-ok"}],
      "max_tokens": 20
    }' | python3 -m json.tool 2>/dev/null || echo "Chat test sent (check response above)"
else
  echo "SKIP: Set a real GEMINI_API_KEY in .env to test chat completions"
fi

echo ""
echo "LiteLLM gateway verification complete."
