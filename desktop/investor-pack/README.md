# Sovereign Warden — Investor & Mentor Pack

Offline Electron desktop app for distributing the concept deck, pitch deck, and business plan to mentors and investors.

Two separate builds ship different document scopes and whitelists:

| Build | Output | Documents |
|-------|--------|-----------|
| **Mentor Pack** | `dist/mentor/` | Full business plan library including archive |
| **Investor Pack** | `dist/investor/` | Curated due-diligence subset |

## Quick start

```bash
cd desktop/investor-pack
npm install

# Create whitelists from examples
cp config/whitelist.mentor.json.example config/whitelist.mentor.json
cp config/whitelist.investor.json.example config/whitelist.investor.json
# Edit emails and passwords

# Development (mentor profile, hot reload)
npm run dev

# Vite only (survives Electron quit; good for keeping http://localhost:5173 up)
npm run dev:web

# Electron only (expects Vite already on 5173)
npm run dev:electron

# Fully detached (survives agent/shell exit — recommended for Cursor agents)
npm run dev:detached
```

> **Stability:** Agent-attached `npm run dev` is often SIGTERM’d when the agent session ends (~2–3 min). Use `npm run dev:detached` (double-fork daemon). Closing the Electron window on macOS does **not** quit the app (dock icon remains); Cmd+Q does. Auth/login requires Electron (browser at :5173 has no preload IPC). `npm run dev` no longer uses `concurrently -k`, so Vite keeps running if Electron exits.

> **Note:** If Electron fails with `app.whenReady` undefined, ensure `ELECTRON_RUN_AS_NODE` is not set in your shell (Cursor sets this by default). The `npm run dev` script unsets it automatically.

Default dev credentials (from examples): `mentor@example.com` / `change-me-mentor`

## Building installers

```bash
# From repo root
./desktop/build-investor-pack.sh all

# Or individual targets
cd desktop/investor-pack
npm run dist:mentor:mac
npm run dist:investor:mac
npm run dist:mentor:win
npm run dist:investor:win
```

Installers appear in `dist/mentor/` and `dist/investor/`.

## Adding recipients

1. Edit `config/whitelist.mentor.json` or `config/whitelist.investor.json`
2. Add entries with `email`, `password`, and `fullName`:

```json
{
  "users": [
    {
      "email": "angel@example.com",
      "password": "temporary-pass",
      "fullName": "Alex Angel"
    }
  ]
}
```

3. Rebuild the corresponding profile

Whitelist files are gitignored. Passwords are bcrypt-hashed at build time and never stored in plaintext in the bundle.

## Updating documents

Edit files under `docs/business/`, `docs/business/concept/`, or `docs/business/pitch-deck/` as usual, then rebuild:

```bash
npm run prepare:mentor    # or prepare:investor
npm run dist:mentor:mac   # etc.
```

The `prepare-bundle.mjs` script copies fresh content from the repo on every build.

## Changing document scope

Edit `config/manifest.mentor.json` or `config/manifest.investor.json` to adjust the sidebar tree and which files are bundled.

Each tree node with a `path` is copied from `docs/business/`. Nodes with a `source` field copy from a custom repo path (e.g. `docs/architecture.md`).

## Confidentiality agreement

The full agreement lives at [`content/confidentiality-agreement.md`](content/confidentiality-agreement.md). It is bundled into every build and accessible at **Sign in → Confidentiality Agreement** without logging in. Recipients must check the acknowledgment box before signing in.

Edit that file and rebuild to update the terms.

Aeonik fonts are bundled for investor/advisor distribution only — not for public web use. See `docs/business/pitch-deck/README.md`.

## Architecture

- **Renderer:** Vite + React (login, home cards, doc explorer)
- **Concept deck:** 9-slide narrative primer (market outlook, positioning, product)
- **Pitch deck:** Bundled `index.html` loaded in iframe (unchanged slide deck)
- **Auth:** Main-process bcrypt validation; session tokens in memory + sessionStorage
- **Content:** `app-bundle/` copied into installer via electron-builder `extraResources`

## Security note

This is access control for controlled distribution, not production-grade authentication. The investor build physically excludes mentor-only documents from the bundle.
