#!/usr/bin/env bash
# Apply patches inside AnythingLLM Docker image filesystem
set -euo pipefail
TARGET="/app"
export WARDEN_AUDIT_PATH="/app/extensions/warden-audit/server"
bash /tmp/patches/apply-warden-patches.sh "$TARGET"
echo "Docker image patches applied."
