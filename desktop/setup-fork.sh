#!/usr/bin/env bash
# Clone AnythingLLM at pinned tag for frontend source (Option B)
set -euo pipefail

DESKTOP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
UPSTREAM_REPO="https://github.com/Mintplex-Labs/anything-llm.git"
UPSTREAM_TAG="v1.8.5"
TARGET="${DESKTOP_DIR}/anything-llm"

if [[ -d "$TARGET/.git" ]]; then
  echo "Upstream already cloned at $TARGET"
  exit 0
fi

echo "==> Cloning AnythingLLM ${UPSTREAM_TAG}..."
git clone --depth 1 --branch "$UPSTREAM_TAG" "$UPSTREAM_REPO" "$TARGET"

API_BASE="$(python3 -c "import json; print(json.load(open('${DESKTOP_DIR}/config.json'))['apiBase'])")"

echo "==> Writing frontend production env (remote API)..."
cat > "${TARGET}/frontend/.env.production" <<EOF
GENERATE_SOURCEMAP=false
VITE_API_BASE="${API_BASE}"
EOF

echo "==> Installing sovereign Electron shell utilities..."
mkdir -p "${DESKTOP_DIR}/electron-shell"
cp "${DESKTOP_DIR}/config.json" "${TARGET}/electron/resources/sovereign-config.json" 2>/dev/null || true

echo ""
echo "==> Frontend source ready at ${TARGET}"
echo ""
echo "Build desktop app:"
echo "  ./desktop/build-desktop.sh"
echo ""
echo "Note: Official Mintplex Electron wrapper is proprietary."
echo "We use desktop/electron-shell/ around the upstream React frontend."
