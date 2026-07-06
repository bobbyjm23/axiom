# Sovereign Warden — Marketing Website

Public-facing B2B WordPress site for [Sovereign Warden](https://sovereign-warden.com.au). Self-contained Docker stack, separate from the product platform in the repo root.

## Quick Start

```bash
cd website
cp .env.example .env
# Edit .env — set MYSQL_PASSWORD, MYSQL_ROOT_PASSWORD, WP_ADMIN_PASSWORD

docker compose up -d
chmod +x scripts/bootstrap.sh
./scripts/bootstrap.sh
```

Open **http://localhost:8080** (or the port set in `.env`).

| Resource | URL |
|----------|-----|
| Public site | http://localhost:8080 |
| WordPress admin | http://localhost:8080/wp-admin |
| Admin user | Value of `WP_ADMIN_USER` in `.env` (default: `admin`) |

## What's Included

- **WordPress 6.7** + **MariaDB 11** in Docker Compose
- **Custom block themes:**
  - **`sovereign-onum`** (default) — Onum Home 7–inspired bright SaaS aesthetic with gradient hero, service cards, and pricing tiers
  - **`sovereign-warden`** — original hybrid light/dark design aligned to pitch deck branding
- **Pre-built pages:** Home, Platform, How It Works, Pricing, Industries, Security, About, Contact, Articles, Privacy
- **Sample articles** in the Insights category
- **Contact Form 7** discovery request form
- **Yoast SEO** for meta and sitemaps
- **MU-plugin** security hardening (disable file editor, generic login errors)

## Directory Layout

```
website/
├── docker-compose.yml       # WordPress + MariaDB + WP-CLI profile
├── .env.example             # Environment template
├── scripts/
│   ├── bootstrap.sh         # Idempotent WP-CLI setup
│   └── content/             # Page and post block markup
└── wp-content/
    ├── themes/sovereign-onum/     # Onum-inspired FSE block theme (default)
    ├── themes/sovereign-warden/   # Original FSE block theme
    └── mu-plugins/                # Security hardening
```

## Common Commands

```bash
# Start stack
docker compose up -d

# Stop stack
docker compose down

# Re-run bootstrap (safe to repeat — updates pages/menus)
./scripts/bootstrap.sh

# WP-CLI one-off command
docker compose --profile cli run --rm wpcli plugin list

# View logs
docker compose logs -f wordpress
```

## Theme Selection

Set `WP_THEME` in `.env` before running bootstrap:

| Theme | Style |
|-------|-------|
| `sovereign-onum` | Onum Home 7–inspired — orange/cyan accents, Red Hat fonts, gradient hero |
| `sovereign-warden` | Original navy/teal hybrid design |

```bash
# Switch back to original theme
WP_THEME=sovereign-warden ./scripts/bootstrap.sh
```

## Theme Development

Both themes are Full Site Editing (FSE) block themes. Key files (paths use `sovereign-onum` or `sovereign-warden`):

| File | Purpose |
|------|---------|
| `theme.json` | Design tokens (colours, typography, spacing) |
| `templates/` | Page templates (front-page, single, archive, etc.) |
| `parts/` | Header and footer template parts |
| `patterns/` | Reusable block patterns (hero, pricing, CTA, etc.) |
| `assets/css/theme.css` | Supplementary styles |

After editing theme files, refresh the browser — no build step required.

## Stock images

Royalty-free photography from [Unsplash](https://unsplash.com) is bundled in `wp-content/themes/sovereign-warden/assets/images/`. See [`assets/images/ATTRIBUTION.md`](wp-content/themes/sovereign-warden/assets/images/ATTRIBUTION.md) for credits.

Images appear in:

- Homepage hero (city skyline cover)
- Problem / solution / industry sections
- Platform architecture banner
- About, Security, and Contact pages
- Article featured images and card grids

Re-run `./scripts/bootstrap.sh` after theme image changes to refresh page content and article thumbnails.

## Production Deployment

Local Docker is the development environment. For production at `sovereign-warden.com.au`:

1. **Host** on any VPS/cloud provider with Docker Compose, or use managed WordPress hosting (copy theme + content manually).
2. **TLS** — terminate HTTPS at a reverse proxy (Caddy, Traefik, or nginx) in front of the WordPress container.
3. **Environment** — update `WP_HOME` and `WP_SITEURL` in `.env` to your production domain.
4. **Backups** — schedule off-site backups of the `db_data` volume and `uploads_data` volume.
5. **CDN / WAF** — Cloudflare or similar in front of the reverse proxy.
6. **Caching** — consider Redis object cache and page caching for production traffic (not included in dev stack).
7. **Email** — configure SMTP for Contact Form 7 (WP Mail SMTP or similar); the default PHP mail transport is unreliable.

## Security Notes

- Change all default passwords in `.env` before deploying.
- Do not commit `.env` to version control.
- `DISALLOW_FILE_EDIT` is enforced via Docker config and MU-plugin.
- XML-RPC is disabled by default.
- Keep WordPress, plugins, and the MariaDB image updated.

## Relationship to Product Stack

This website stack is **completely separate** from the Sovereign Warden Platform product (`docker-compose.yml` in the repo root). The product stack runs AnythingLLM, LiteLLM, and related services for customer deployments — not for company marketing.
