#!/usr/bin/env bash
# One-time migration helper: AnythingLLM SQLite volume → shared PostgreSQL
# Run ONLY when upgrading an existing POC with data in anythingllm_storage volume.
set -euo pipefail

cat <<'EOF'
AnythingLLM SQLite → PostgreSQL migration

For existing POC deployments:
1. Export workspaces/users via AnythingLLM admin UI (or backup anythingllm_storage volume)
2. Deploy new stack with sovereign-warden/anythingllm:1.8.5-pg-audit image
3. Complete first-time setup against PostgreSQL (DATABASE_URL in compose)
4. Re-create users and re-upload documents

Fresh installs: skip this script — bootstrap-poc.sh uses PostgreSQL from day one.

EOF
