# AnythingLLM Platform Overlay

Sovereign Warden extends upstream AnythingLLM via:

- **`Dockerfile`** — builds `sovereign-warden/anythingllm:1.9.0-pg-audit` from `mintplexlabs/anythingllm:pg-1.9.0`
- **`patches/apply-warden-patches.sh`** — injects extension loader into server + frontend routes

## Apply patches to local fork

```bash
./desktop/setup-fork.sh
platform/anythingllm/patches/apply-warden-patches.sh
```

## Disable extension

Set `WARDEN_AUDIT_ENABLED=false` in `.env` and restart `anythingllm`.

## Rollback

Use vanilla image in `docker-compose.yml`:

```yaml
image: mintplexlabs/anythingllm:pg-1.9.0
```

See [extensions/warden-audit/README.md](../../extensions/warden-audit/README.md) for full runbook.
