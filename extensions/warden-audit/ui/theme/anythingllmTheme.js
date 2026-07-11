const THEME_STORAGE_KEY = "theme";

export function getAnythingLLMTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) || "default";
  } catch {
    return "default";
  }
}

/** Mirror AnythingLLM useTheme() document side effects */
export function applyAnythingLLMTheme(theme = getAnythingLLMTheme()) {
  const resolved = theme === "light" ? "light" : "default";
  document.documentElement.setAttribute("data-theme", resolved);
  document.body.classList.toggle("light", resolved === "light");
  document.body.classList.toggle("text-white", resolved !== "light");
  document.body.classList.toggle("text-theme-text-primary", resolved === "light");
  document.body.style.backgroundColor = "var(--theme-bg-container)";
}

export function initAnythingLLMThemeSync() {
  applyAnythingLLMTheme();

  const onStorage = (event) => {
    if (event.key === THEME_STORAGE_KEY) {
      applyAnythingLLMTheme(event.newValue || "default");
    }
  };

  const onFocus = () => applyAnythingLLMTheme();

  window.addEventListener("storage", onStorage);
  window.addEventListener("focus", onFocus);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("focus", onFocus);
  };
}
