#!/usr/bin/env bash
# Build AnythingLLM frontend for remote backend and package Electron desktop client
set -euo pipefail

DESKTOP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ANYTHING_LLM="${DESKTOP_DIR}/anything-llm"
ELECTRON_SHELL="${DESKTOP_DIR}/electron-shell"
CONFIG="${DESKTOP_DIR}/config.json"

API_BASE="$(python3 -c "import json; print(json.load(open('${CONFIG}'))['apiBase'])")"

if [[ ! -d "${ANYTHING_LLM}/frontend" ]]; then
  echo "ERROR: Run ./setup-fork.sh first to clone anything-llm"
  exit 1
fi

echo "==> Configuring frontend for remote API: ${API_BASE}"
cat > "${ANYTHING_LLM}/frontend/.env.production" <<EOF
GENERATE_SOURCEMAP=false
VITE_API_BASE="${API_BASE}"
EOF

echo "==> Installing frontend dependencies..."
cd "${ANYTHING_LLM}/frontend"
yarn install --frozen-lockfile 2>/dev/null || yarn install

echo "==> Building AnythingLLM frontend..."
yarn build

echo "==> Copying frontend dist to desktop/frontend-dist..."
rm -rf "${DESKTOP_DIR}/frontend-dist"
cp -r dist "${DESKTOP_DIR}/frontend-dist"

echo "==> Installing Electron shell dependencies..."
cd "${ELECTRON_SHELL}"
npm install

echo "==> Packaging desktop app..."
npm run dist

echo ""
echo "==> Desktop build complete!"
echo "Installers in: ${DESKTOP_DIR}/dist/"
ls -la "${DESKTOP_DIR}/dist/" 2>/dev/null || true
