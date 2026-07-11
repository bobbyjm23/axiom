#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACK="$ROOT/investor-pack"

cd "$PACK"

if [[ ! -d node_modules ]]; then
  echo "Installing dependencies..."
  npm install
fi

TARGET="${1:-all}"

build_profile() {
  local profile="$1"
  local platform="$2"
  echo "=== Building ${profile} (${platform}) ==="
  npm run "dist:${profile}:${platform}"
}

case "$TARGET" in
  mentor-mac)   build_profile mentor mac ;;
  investor-mac) build_profile investor mac ;;
  mentor-win)   build_profile mentor win ;;
  investor-win) build_profile investor win ;;
  mentor)
    build_profile mentor mac
    build_profile mentor win
    ;;
  investor)
    build_profile investor mac
    build_profile investor win
    ;;
  all)
    build_profile mentor mac
    build_profile investor mac
    build_profile mentor win
    build_profile investor win
    ;;
  *)
    echo "Usage: $0 [all|mentor|investor|mentor-mac|investor-mac|mentor-win|investor-win]"
    exit 1
    ;;
esac

echo ""
echo "Installers:"
echo "  Mentor:   $PACK/dist/mentor/"
echo "  Investor: $PACK/dist/investor/"
