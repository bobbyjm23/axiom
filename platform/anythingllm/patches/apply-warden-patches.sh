#!/usr/bin/env bash
# Apply Warden Audit extension hooks to AnythingLLM source tree.
# Usage: apply-warden-patches.sh [TARGET_DIR]
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
TARGET="${1:-${ROOT}/desktop/anything-llm}"
EXT="${ROOT}/extensions/warden-audit"
PATCHES="${ROOT}/platform/anythingllm/patches"

if [[ ! -d "$TARGET/server" ]]; then
  echo "ERROR: AnythingLLM source not found at $TARGET"
  echo "Run ./desktop/setup-fork.sh first."
  exit 1
fi

echo "==> Applying Warden Audit patches to $TARGET"

# --- Server: extension loader after mobileEndpoints ---
SERVER_INDEX="${TARGET}/server/index.js"
if ! grep -q "WARDEN_AUDIT_EXTENSION" "$SERVER_INDEX"; then
  python3 - <<'PY' "$SERVER_INDEX"
import sys
path = sys.argv[1]
text = open(path).read()
needle = "mobileEndpoints(apiRouter);"
insert = '''mobileEndpoints(apiRouter);

// WARDEN_AUDIT_EXTENSION_LOADER
if (process.env.WARDEN_AUDIT_ENABLED !== "false") {
  try {
    const wardenAudit = require(process.env.WARDEN_AUDIT_PATH || "/app/extensions/warden-audit/server");
    wardenAudit.registerStaticUI(app);
    wardenAudit.register(app, apiRouter).catch((err) => {
      console.error("[warden-audit] Extension init failed:", err.message);
    });
  } catch (err) {
    console.error("[warden-audit] Extension load failed:", err.message);
  }
}'''
if needle not in text:
    raise SystemExit("Could not find mobileEndpoints injection point")
open(path, "w").write(text.replace(needle, insert, 1))
print("Patched server/index.js")
PY
fi

# --- Frontend patches (dev/desktop builds only — not present in production Docker image) ---
VITE_CFG="${TARGET}/frontend/vite.config.js"
if [[ -f "$VITE_CFG" ]] && ! grep -q "@warden/audit" "$VITE_CFG"; then
  python3 - <<'PY' "$VITE_CFG" "$EXT"
import sys
path, ext = sys.argv[1], sys.argv[2]
text = open(path).read()
needle = 'find: "@",'
insert = f'''find: "@warden/audit",
        replacement: "{ext}/frontend"
      }},
      {{
        find: "@ui",
        replacement: "{ext}/ui"
      }},
      {{
        {needle}'''
text = text.replace(needle, insert, 1)
open(path, "w").write(text)
print("Patched vite.config.js")
PY
fi

APP_JSX="${TARGET}/frontend/src/App.jsx"
if [[ -f "$APP_JSX" ]] && ! grep -q "WARDEN_AUDIT_ROUTES" "$APP_JSX"; then
  python3 - <<'PY' "$APP_JSX"
import sys
path = sys.argv[1]
text = open(path).read()
import_line = 'import { AuditRoutes } from "@warden/audit/index.jsx";\n'
if "AuditRoutes" not in text:
    text = text.replace(
        'import KeyboardShortcutsHelp from "@/components/KeyboardShortcutsHelp";\n',
        'import KeyboardShortcutsHelp from "@/components/KeyboardShortcutsHelp";\n' + import_line
    )
needle = '                </Routes>'
insert = '''                  {/* WARDEN_AUDIT_ROUTES */}
                  <AuditRoutes />
                </Routes>'''
text = text.replace(needle, insert, 1)
open(path, "w").write(text)
print("Patched App.jsx")
PY
fi

# --- Frontend: paths.js ---
PATHS_JS="${TARGET}/frontend/src/utils/paths.js"
if [[ -f "$PATHS_JS" ]] && { ! grep -q "audit:" "$PATHS_JS" || grep -q "workspace:.*audit" "$PATHS_JS" 2>/dev/null; }; then
  python3 - <<'PY' "$PATHS_JS"
import sys, re
path = sys.argv[1]
text = open(path).read()
if "audit: {" in text and "hosting:" in text:
    # Fix misplaced audit block inside workspace if present
    text = re.sub(
        r"audit: \{[^}]+\},\s*settings: \{",
        "settings: {",
        text,
        count=1,
        flags=re.DOTALL,
    )
audit_block = '''  audit: {
    home: () => "/settings/audit",
    engagement: (id) => `/settings/audit/engagements/${id}`,
    pillar: (id, pillarId) => `/settings/audit/engagements/${id}/pillars/${pillarId}`,
    metrics: (id) => `/settings/audit/engagements/${id}/metrics`,
    deliverables: (id) => `/settings/audit/engagements/${id}/deliverables`,
    newOrg: () => "/settings/audit/clients/new",
  },
'''
if "audit: {" not in text:
    text = text.replace(
        "  hosting: () => {\n    return \"https://my.mintplexlabs.com/aio-checkout?product=anythingllm\";\n  },\n",
        "  hosting: () => {\n    return \"https://my.mintplexlabs.com/aio-checkout?product=anythingllm\";\n  },\n" + audit_block,
        1,
    )
open(path, "w").write(text)
print("Patched paths.js")
PY
fi

SIDEBAR="${TARGET}/frontend/src/components/SettingsSidebar/index.jsx"
if [[ -f "$SIDEBAR" ]] && ! grep -q "WARDEN_AUDIT_NAV" "$SIDEBAR"; then
  python3 - <<'PY' "$SIDEBAR"
import sys
path = sys.argv[1]
text = open(path).read()
if "ShieldCheck" not in text:
    text = text.replace(
        "  Globe,\n} from \"@phosphor-icons/react\";",
        "  Globe,\n  ShieldCheck,\n} from \"@phosphor-icons/react\";"
    )
needle = '''        <Option
          btnText={t("settings.ai-providers")}'''
insert = '''        {/* WARDEN_AUDIT_NAV */}
        <Option
          btnText="AI Readiness Audit"
          icon={<ShieldCheck className="h-5 w-5 flex-shrink-0" />}
          href={paths.audit.home()}
          user={user}
          roles={["admin", "manager"]}
        />
        <Option
          btnText={t("settings.ai-providers")}'''
text = text.replace(needle, insert, 1)
open(path, "w").write(text)
print("Patched SettingsSidebar")
PY
fi

# --- Docker/production: inject sidebar nav script into SPA shell ---
META_GEN="${TARGET}/server/utils/boot/MetaGenerator.js"
if [[ -f "$META_GEN" ]] && ! grep -q "WARDEN_AUDIT_NAV_INJECT" "$META_GEN"; then
  python3 - <<'PY' "$META_GEN"
import sys
path = sys.argv[1]
text = open(path).read()
needle = '          </body>'
insert = '''            <script defer src="/settings/audit/sidebar-inject.js"></script><!-- WARDEN_AUDIT_NAV_INJECT -->
          </body>'''
if needle not in text:
    raise SystemExit("Could not find MetaGenerator </body> injection point")
open(path, "w").write(text.replace(needle, insert, 1))
print("Patched MetaGenerator.js (sidebar inject)")
PY
fi

echo "==> Warden Audit patches applied."
