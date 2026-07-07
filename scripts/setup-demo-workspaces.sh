#!/usr/bin/env bash
# Create demo RBAC users and workspaces via AnythingLLM API (after multi-user is enabled)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ ! -f .env ]]; then
  echo "ERROR: .env not found"
  exit 1
fi

# shellcheck disable=SC1091
source "$(dirname "${BASH_SOURCE[0]}")/lib/load-env.sh"
load_env_file .env

BASE_URL="${ANYTHINGLLM_URL:-http://localhost:3000}"
API_BASE="${BASE_URL}/api/v1"

echo "==> Sovereign Warden — Demo Workspace Setup"
echo "Base URL: $BASE_URL"
echo ""
echo "Manual steps required (AnythingLLM admin UI):"
echo ""
echo "1. Enable Multi-User mode:"
echo "   Admin → System Settings → Multi-User → Enable"
echo ""
echo "2. Create users (Admin → Users):"
echo "   | Username      | Role    | Purpose                    |"
echo "   |---------------|---------|----------------------------|"
echo "   | admin         | Admin   | Full system access         |"
echo "   | manager-demo  | Manager | Workspace + user mgmt demo |"
echo "   | employee-demo | Default | Standard employee access   |"
echo ""
echo "3. Create workspaces (Admin → Workspaces):"
echo "   | Workspace          | LLM Model     | Documents        | Access        |"
echo "   |--------------------|---------------|------------------|---------------|"
echo "   | General Assistant  | gemini-pro    | None             | All users     |"
echo "   | Company Knowledge  | gemini-pro    | demo/documents/* | All users     |"
echo "   | Agent Workspace    | gemini-pro    | None             | Admin+Manager |"
echo ""
echo "4. Upload demo documents to 'Company Knowledge':"
echo "   Files in: $ROOT/demo/documents/"
echo ""
echo "5. Configure Agent Workspace:"
echo "   Enable agent mode + web browsing or SQL skill in workspace settings"
echo ""
echo "6. Branding (Admin → Appearance):"
echo "   - App name: Sovereign Warden"
echo "   - Upload company logo from demo/assets/"
echo ""

# Health check
if curl -sf "${BASE_URL}/api/ping" >/dev/null 2>&1; then
  echo "AnythingLLM is reachable at $BASE_URL"
else
  echo "WARNING: AnythingLLM not reachable. Start stack with ./scripts/bootstrap-poc.sh"
fi
