# Sovereign Warden Desktop Client (Option B)

Electron desktop app delivering the **exact AnythingLLM React UI** against your central Docker backend.

## How It Works

Mintplex's official Desktop Electron wrapper is proprietary (not in the OSS repo). Our Option B implementation:

1. **`anything-llm/`** — cloned upstream frontend source (pinned `v1.8.5`)
2. **`electron-shell/`** — Sovereign Warden Electron app (menus, installer, native window)
3. **`frontend-dist/`** — built React UI with `VITE_API_BASE` → Docker backend

No local server, Ollama, or LLM engine runs on the desktop — all inference and data live on the platform backend.

## Quick Start

```bash
# 1. Start platform backend
./scripts/bootstrap-poc.sh

# 2. Clone upstream frontend (first time)
./desktop/setup-fork.sh

# 3. Update backend URL in desktop/config.json if needed

# 4. Build and package
./desktop/build-desktop.sh
```

Installers appear in `desktop/dist/` (`.dmg`, `.exe`, `.AppImage`).

## Development (no packaging)

```bash
cd desktop/electron-shell
npm install
npm start
# Loads serverUrl from config.json if frontend-dist not built yet
```

## Configuration

`desktop/config.json`:

```json
{
  "serverUrl": "http://localhost:3000",
  "apiBase": "http://localhost:3000/api",
  "appName": "Sovereign Warden",
  "remoteOnly": true
}
```

## Upstream Maintenance

See [UPSTREAM.md](UPSTREAM.md).
