# Safely load a .env file without conflicting with shell builtins (UID is readonly on macOS).
load_env_file() {
  local env_file="${1:-.env}"
  [[ -f "$env_file" ]] || return 1
  set -a
  while IFS= read -r line || [[ -n "$line" ]]; do
    [[ "$line" =~ ^[[:space:]]*# ]] && continue
    [[ -z "${line// }" ]] && continue
    local key="${line%%=*}"
    key="${key//[[:space:]]/}"
    [[ "$key" == "UID" || "$key" == "GID" ]] && continue
    eval "export $line" 2>/dev/null || true
  done < "$env_file"
  set +a
}
