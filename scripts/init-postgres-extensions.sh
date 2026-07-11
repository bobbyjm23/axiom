#!/usr/bin/env bash
# Enable pgvector on shared PostgreSQL
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# shellcheck disable=SC1091
source "$(dirname "${BASH_SOURCE[0]}")/lib/load-env.sh"
load_env_file .env

docker compose --env-file .env exec -T postgres \
  psql -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" -c "CREATE EXTENSION IF NOT EXISTS vector;"

echo "pgvector extension enabled on ${POSTGRES_DB}"
