#!/usr/bin/env bash
# Sovereign Warden WordPress bootstrap — idempotent setup via WP-CLI.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEBSITE_DIR="$(dirname "$SCRIPT_DIR")"

cd "$WEBSITE_DIR"

if [[ ! -f .env ]]; then
  echo "Missing .env — copy .env.example to .env and set passwords."
  exit 1
fi

# shellcheck disable=SC1091
source .env

WP_THEME_SLUG="${WP_THEME:-sovereign-onum}"

WP() {
  docker compose --profile cli run --rm wpcli "$@"
}

WP_ROOT() {
  docker compose --profile cli run --rm --user root wpcli --allow-root "$@"
}

ensure_uploads_writable() {
  docker compose exec -T wordpress mkdir -p /var/www/html/wp-content/uploads >/dev/null 2>&1 || true
  docker compose exec -T --user root wordpress chown -R www-data:www-data /var/www/html/wp-content/uploads >/dev/null 2>&1 || true
}

echo "Starting database and WordPress..."
docker compose up -d db wordpress

echo "Waiting for WordPress to become healthy..."
for i in $(seq 1 60); do
  if docker compose ps wordpress 2>/dev/null | grep -q "(healthy)"; then
    break
  fi
  if [[ "$i" -eq 60 ]]; then
    echo "WordPress did not become healthy in time."
    docker compose logs wordpress --tail 30
    exit 1
  fi
  sleep 3
done

ensure_uploads_writable

# Allow WordPress entrypoint to finish copying core files into shared volume.
sleep 5

if ! WP core is-installed 2>/dev/null; then
  echo "Installing WordPress..."
  WP core install \
    --url="${WP_HOME:-http://localhost:8080}" \
    --title="${WP_SITE_TITLE:-Sovereign Warden}" \
    --admin_user="${WP_ADMIN_USER:-admin}" \
    --admin_password="${WP_ADMIN_PASSWORD:?Set WP_ADMIN_PASSWORD in .env}" \
    --admin_email="${WP_ADMIN_EMAIL:-hello@sovereign-warden.com.au}" \
    --skip-email
else
  echo "WordPress already installed."
fi

echo "Configuring site options..."
WP option update blogdescription "${WP_SITE_TAGLINE}" 2>/dev/null || true
WP rewrite structure '/%postname%/' --hard
WP option update timezone_string 'Australia/Sydney'
WP option update date_format 'j F Y'
WP option update blog_public 1

echo "Activating theme: ${WP_THEME_SLUG}..."
WP theme activate "${WP_THEME_SLUG}"

echo "Installing plugins..."
WP plugin install contact-form-7 --activate 2>/dev/null || WP plugin activate contact-form-7 2>/dev/null || true
WP plugin install wordpress-seo --version=25.9 --activate 2>/dev/null || WP plugin activate wordpress-seo 2>/dev/null || echo "Yoast SEO install skipped (optional)." >&2

# Create or update Contact Form 7 form for discovery requests.
CF7_ID=$(WP post list --post_type=wpcf7_contact_form --field=ID --format=ids 2>/dev/null | awk '{print $1}')
if [[ -z "${CF7_ID:-}" ]]; then
  CF7_ID=$(WP post create \
    --post_type=wpcf7_contact_form \
    --post_title='Discovery Request' \
    --post_status=publish \
    --porcelain)
  CF7_FORM=$(cat "$SCRIPT_DIR/content/cf7-form.txt")
  WP post meta update "$CF7_ID" _form "$CF7_FORM" >/dev/null
  echo "Created Contact Form 7: Discovery Request (ID $CF7_ID)" >&2
fi

render_content() {
  local content_file="$1"
  local theme_uri="${WP_HOME:-http://localhost:8080}/wp-content/themes/${WP_THEME_SLUG}"
  sed "s|{{THEME_URI}}|${theme_uri}|g" "$content_file"
}

import_theme_image() {
  local filename="$1"
  local image_path="/var/www/html/wp-content/themes/${WP_THEME_SLUG}/assets/images/$filename"
  local existing_id

  existing_id=$(WP post list --post_type=attachment --s="$filename" --field=ID --format=ids 2>/dev/null | awk 'NR==1{print $1}')
  if [[ -n "${existing_id:-}" ]]; then
    echo "$existing_id"
    return
  fi

  if [[ ! -f "$image_path" ]]; then
    echo ""
    return
  fi

  WP_ROOT media import "$image_path" --title="$filename" --porcelain 2>/dev/null || true
}

set_post_featured_image() {
  local post_slug="$1"
  local image_file="$2"
  local post_id attach_id

  post_id=$(WP post list --post_type=post --name="$post_slug" --field=ID --format=ids 2>/dev/null | awk '{print $1}')
  attach_id=$(import_theme_image "$image_file")

  if [[ -n "${post_id:-}" && -n "${attach_id:-}" ]]; then
    WP post meta update "$post_id" _thumbnail_id "$attach_id" >/dev/null
    echo "Set featured image on post: $post_slug" >&2
  fi
}

create_or_update_page() {
  local slug="$1"
  local title="$2"
  local content_file="$3"
  local template="${4:-}"

  local existing_id
  existing_id=$(WP post list --post_type=page --name="$slug" --field=ID --format=ids 2>/dev/null | awk '{print $1}')

  local content
  content=$(render_content "$content_file")

  if [[ -n "${existing_id:-}" ]]; then
    WP post update "$existing_id" --post_title="$title" --post_content="$content" --post_status=publish >/dev/null
    echo "Updated page: $title ($slug)" >&2
    PAGE_ID="$existing_id"
  else
    PAGE_ID=$(WP post create \
      --post_type=page \
      --post_title="$title" \
      --post_name="$slug" \
      --post_content="$content" \
      --post_status=publish \
      --porcelain)
    echo "Created page: $title ($slug)" >&2
  fi

  if [[ -n "$template" ]]; then
    WP post meta update "$PAGE_ID" _wp_page_template "$template" >/dev/null
  fi

  echo "$PAGE_ID"
}

HOME_CONTENT="$SCRIPT_DIR/content/home.html"
if [[ "${WP_THEME_SLUG}" == "sovereign-onum" ]]; then
  HOME_CONTENT="$SCRIPT_DIR/content/home-onum.html"
fi

echo "Creating pages..."
HOME_ID=$(create_or_update_page "home" "Home" "$HOME_CONTENT")
PLATFORM_ID=$(create_or_update_page "platform" "Platform" "$SCRIPT_DIR/content/platform.html" "page-dark-hero")
HOW_ID=$(create_or_update_page "how-it-works" "How It Works" "$SCRIPT_DIR/content/how-it-works.html" "page-dark-hero")
PRICING_ID=$(create_or_update_page "pricing" "Pricing" "$SCRIPT_DIR/content/pricing.html" "page-dark-hero")
INDUSTRIES_ID=$(create_or_update_page "industries" "Industries" "$SCRIPT_DIR/content/industries.html" "page-dark-hero")
SECURITY_ID=$(create_or_update_page "security" "Security & Compliance" "$SCRIPT_DIR/content/security.html" "page-dark-hero")
ABOUT_ID=$(create_or_update_page "about" "About" "$SCRIPT_DIR/content/about.html" "page-dark-hero")
CONTACT_ID=$(create_or_update_page "contact" "Contact" "$SCRIPT_DIR/content/contact.html" "page-dark-hero")
ARTICLES_ID=$(create_or_update_page "articles" "Articles" "$SCRIPT_DIR/content/articles.html" "page-dark-hero")
PRIVACY_ID=$(create_or_update_page "privacy" "Privacy Policy" "$SCRIPT_DIR/content/privacy.html" "page-dark-hero")

# Inject Contact Form 7 shortcode into contact page.
CONTACT_CONTENT=$(cat "$SCRIPT_DIR/content/contact.html")
CONTACT_CONTENT="${CONTACT_CONTENT//<!-- CF7_FORM -->/[contact-form-7 id=\"${CF7_ID}\" title=\"Discovery Request\"]/}"
WP post update "$CONTACT_ID" --post_content="$CONTACT_CONTENT" >/dev/null

echo "Configuring reading settings..."
WP option update show_on_front page
WP option update page_on_front "$HOME_ID"
WP option update page_for_posts "$ARTICLES_ID"

echo "Creating Insights category..."
INSIGHTS_CAT=$(WP term list category --slug=insights --field=term_id 2>/dev/null | awk '{print $1}')
if [[ -z "${INSIGHTS_CAT:-}" ]]; then
  INSIGHTS_CAT=$(WP term create category Insights --slug=insights --porcelain)
fi

create_or_update_post() {
  local slug="$1"
  local title="$2"
  local content_file="$3"

  local existing_id
  existing_id=$(WP post list --post_type=post --name="$slug" --field=ID --format=ids 2>/dev/null | awk '{print $1}')

  local content
  content=$(render_content "$content_file")

  if [[ -n "${existing_id:-}" ]]; then
    WP post update "$existing_id" --post_title="$title" --post_content="$content" --post_status=publish >/dev/null
    WP post term set "$existing_id" category "$INSIGHTS_CAT" >/dev/null
    echo "Updated post: $title" >&2
    echo "$existing_id"
  else
    local post_id
    post_id=$(WP post create \
      --post_type=post \
      --post_title="$title" \
      --post_name="$slug" \
      --post_content="$content" \
      --post_status=publish \
      --porcelain)
    WP post term set "$post_id" category "$INSIGHTS_CAT" >/dev/null
    echo "Created post: $title" >&2
    echo "$post_id"
  fi
}

echo "Creating sample articles..."
create_or_update_post "regulated-firms-chatgpt" \
  "Why regulated firms can't use ChatGPT — and what to do instead" \
  "$SCRIPT_DIR/content/posts/regulated-firms-chatgpt.html"

create_or_update_post "copilot-cost-200-employees" \
  "The true cost of Microsoft Copilot at 200 employees" \
  "$SCRIPT_DIR/content/posts/copilot-cost-200-employees.html"

create_or_update_post "pilot-to-airgap" \
  "From pilot to air-gap: the Sovereign Warden deployment path" \
  "$SCRIPT_DIR/content/posts/pilot-to-airgap.html"

set_post_featured_image "regulated-firms-chatgpt" "ai-abstract.jpg"
set_post_featured_image "copilot-cost-200-employees" "meeting-boardroom.jpg"
set_post_featured_image "pilot-to-airgap" "data-center.jpg"

setup_menu() {
  local menu_name="$1"
  local location="$2"
  shift 2
  local items=("$@")

  local menu_id
  menu_id=$(WP menu list --fields=term_id,name --format=csv 2>/dev/null | grep ",${menu_name}$" | cut -d, -f1 || true)

  if [[ -z "${menu_id:-}" ]]; then
    menu_id=$(WP menu create "$menu_name" --porcelain 2>/dev/null || true)
  fi

  if [[ -z "${menu_id:-}" ]]; then
    menu_id=$(WP menu list --fields=term_id,name --format=csv 2>/dev/null | grep ",${menu_name}$" | cut -d, -f1 || true)
  fi

  if [[ -z "${menu_id:-}" ]]; then
    echo "Could not create or find menu: $menu_name" >&2
    return
  fi

  WP menu item list "$menu_id" --format=ids 2>/dev/null | while read -r item_id; do
    [[ -n "$item_id" ]] && WP menu item delete "$item_id" 2>/dev/null || true
  done

  for item in "${items[@]}"; do
    IFS='|' read -r page_id label <<< "$item"
    WP menu item add-post "$menu_id" "$page_id" --title="$label" 2>/dev/null || true
  done

  WP menu location assign "$menu_id" "$location" 2>/dev/null || true
  echo "Menu configured: $menu_name → $location"
}

echo "Creating navigation menus..."
setup_menu "Primary Navigation" primary \
  "${HOME_ID}|Home" \
  "${PLATFORM_ID}|Platform" \
  "${HOW_ID}|How It Works" \
  "${PRICING_ID}|Pricing" \
  "${INDUSTRIES_ID}|Industries" \
  "${ARTICLES_ID}|Articles" \
  "${CONTACT_ID}|Contact"

setup_menu "Footer Navigation" footer \
  "${SECURITY_ID}|Security" \
  "${ABOUT_ID}|About" \
  "${PRIVACY_ID}|Privacy"

# Upload logo to media library and set as site logo.
LOGO_FILE="$WEBSITE_DIR/wp-content/themes/${WP_THEME_SLUG}/assets/logo.svg"
if [[ -f "$LOGO_FILE" ]]; then
  LOGO_ID=$(WP media import "$LOGO_FILE" --porcelain 2>/dev/null || true)
  if [[ -n "${LOGO_ID:-}" ]]; then
    WP option update site_logo "$LOGO_ID" 2>/dev/null || true
    echo "Site logo set."
  fi
fi

echo ""
echo "Bootstrap complete."
echo "  Theme:   ${WP_THEME_SLUG}"
echo "  Site:    ${WP_HOME:-http://localhost:8080}"
echo "  Admin:   ${WP_HOME:-http://localhost:8080}/wp-admin"
echo "  User:    ${WP_ADMIN_USER:-admin}"
echo ""
