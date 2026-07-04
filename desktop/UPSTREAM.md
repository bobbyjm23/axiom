# AnythingLLM Desktop Fork — Upstream Tracking

## Important Note

The official AnythingLLM Desktop Electron wrapper is **not open source** — it is maintained separately by Mintplex Labs and copies the core `frontend`/`server`/`collector` into a proprietary Electron shell.

Our Option B implementation:
1. Clones the open-source `anything-llm` repo for the **exact React frontend**
2. Builds the frontend with `VITE_API_BASE` pointing at the Docker backend
3. Wraps it in `desktop/electron-shell/` — our Electron app with native menus, installer, and auto-update hooks

This delivers the identical AnythingLLM UI in a native desktop package without the embedded local server.

## Pinned Version

| Field | Value |
|-------|-------|
| Upstream repo | https://github.com/Mintplex-Labs/anything-llm |
| Pinned tag | `v1.8.5` |
| Fork type | Option B — remote backend client |
| Electron shell | `desktop/electron-shell/` (sovereign-built) |
| Frontend source | `desktop/anything-llm/frontend/` (upstream clone) |

## Modified Files

| File | Change |
|------|--------|
| `anything-llm/frontend/.env.production` | `VITE_API_BASE` → remote Docker backend |
| `electron-shell/main.js` | Loads bundled frontend; no local server spawn |
| `electron-shell/package.json` | electron-builder app name, icon, targets |
| `config.json` | Runtime `serverUrl` / `apiBase` override |

Do **not** modify AnythingLLM React components unless required for a specific enterprise feature.

## Build

```bash
./desktop/setup-fork.sh      # Clone upstream (first time)
./desktop/build-desktop.sh   # Build frontend + package Electron app
```

## Quick test (no packaging)

```bash
cd desktop/electron-shell && npm install && npm start
# Falls back to loading serverUrl from config.json if frontend-dist missing
```

## Merge Process (upstream upgrades)

1. Note current pinned tag in this file.
2. Fetch upstream: `cd desktop/anything-llm && git fetch --tags`
3. Create merge branch: `git checkout -b upgrade/vX.Y.Z vX.Y.Z`
4. Re-apply patches: `git apply ../patches/*.patch`
5. Resolve conflicts in **Electron main process only** — do not merge frontend UI changes unless required.
6. Update `frontend/.env.production` with `VITE_API_BASE`.
7. Test checklist:
   - [ ] App launches without starting local server
   - [ ] Login screen appears (multi-user Docker backend)
   - [ ] Chat streaming works
   - [ ] Document upload + RAG citations work
   - [ ] Agent invocation works (WebSocket)
   - [ ] `.dmg` / `.exe` packages build successfully
8. Update pinned tag in this file.

## Test Checklist

- [ ] No local port 3001 listener when app starts (server runs on Docker only)
- [ ] API calls go to `SERVER_URL` from config.json
- [ ] Multi-user login works against Docker backend
- [ ] White-label branding from Docker admin UI appears in app
- [ ] Auto-updater points to internal release server (not Mintplex)

## License

AnythingLLM is MIT licensed. This fork retains upstream license and copyright notices.
