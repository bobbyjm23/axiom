# Warden Audit Extension

AI Readiness Audit module for AnythingLLM — native sidebar, shared PostgreSQL, removable via feature flag.

## Quick start

```bash
./scripts/bootstrap-poc.sh          # builds sovereign-anythingllm image with extension
./scripts/verify-audit-extension.sh # health check
```

### Docker (browser)

The stock AnythingLLM web UI includes **AI Readiness Audit** in the settings sidebar (injected at runtime for admin/manager). You can also open directly:

**http://localhost:3000/settings/audit/**

Log in to AnythingLLM first (same session / `anythingllm_authToken`). As **admin**: create organization → start baseline audit.

### Demo scenario (wealth management)

Load a fictional **Harbour Capital Wealth Management** baseline + 90-day follow-up review:

```bash
./scripts/seed-audit-demo.sh
```

Open **http://localhost:3000/settings/audit/** — you'll see baseline (score ~0.27) and follow-up (score ~0.67) engagements with pillars, metrics, and deliverables populated.

Remove demo data:

```bash
./scripts/clean-audit-demo.sh
```


Optional shortcut: **Settings → Branding & Whitelabeling → Sidebar Footer Items** → add link `/settings/audit/` with label “AI Readiness Audit”.

### Desktop Electron client

Integrated sidebar: **Settings → AI Readiness Audit** (after `./desktop/build-desktop.sh`).

## Architecture

- **Shared UI:** `ui/` — pages, components, API client, host context (single source of truth)
- **Hosts:** `hosts/integrated/` (AnythingLLM desktop) and `hosts/standalone/` (Docker browser UI)
- **Extension server:** `server/` routes, SQL migrations, services
- **Upstream hooks:** `platform/anythingllm/patches/apply-warden-patches.sh` (~50 lines injected)
- **Docker image:** `platform/anythingllm/Dockerfile` extends `mintplexlabs/anythingllm:pg-1.9.0`
- **Database:** `warden_audit_*` tables in shared `sovereign_warden` PostgreSQL

Only the standalone settings sidebar clone (`hosts/standalone/components/`) is duplicated from AnythingLLM — sync on upstream upgrades. All audit pages live in `ui/`.

## Roles

| Role | Access |
|------|--------|
| `admin` | Full audit — scoring, metrics import, deliverables, status transitions |
| `manager` | Collaborative pillars (processes, infrastructure, governance) + view deliverables |
| `default` | No audit access |

## Feature flag

```bash
# Disable extension (chat/RAG unaffected)
WARDEN_AUDIT_ENABLED=false docker compose --env-file .env up -d anythingllm
```

## Rollback to vanilla AnythingLLM

In `docker-compose.yml`, replace the `anythingllm` build section with:

```yaml
anythingllm:
  image: mintplexlabs/anythingllm:pg-1.9.0
```

Audit data remains in PostgreSQL until manually dropped.

## Upstream upgrade

1. Bump `ANYTHINGLLM_PG_VERSION` in `platform/anythingllm/Dockerfile` (use tags from `docker pull mintplexlabs/anythingllm` — format `pg-X.Y.Z`, not `X.Y.Z-pg`)
2. Re-run patches: `platform/anythingllm/patches/apply-warden-patches.sh desktop/anything-llm`
3. Resolve conflicts in `server/index.js`, `App.jsx`, `SettingsSidebar`, `paths.js`, `vite.config.js`
4. Rebuild: `docker compose build anythingllm`
5. Test checklist in [desktop/UPSTREAM.md](../../desktop/UPSTREAM.md)

## Pillar configuration

Edit `templates/pillars.json` to change questions, scales, and `editable_roles` without code changes.

## API

All routes under `/api/warden-audit/*` — see plan document for full surface.

## Desktop client

```bash
./desktop/setup-fork.sh
./desktop/build-desktop.sh   # applies patches + builds frontend with audit routes
```
