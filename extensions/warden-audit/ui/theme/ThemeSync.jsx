import { useEffect } from "react";
import { initAnythingLLMThemeSync, getAnythingLLMTheme } from "../theme/anythingllmTheme";

export function ThemeSync({ children }) {
  useEffect(() => initAnythingLLMThemeSync(), []);
  return children;
}

export function useAnythingLLMTheme() {
  return getAnythingLLMTheme();
}
