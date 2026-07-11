import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const standaloneDir = path.dirname(fileURLToPath(import.meta.url));
const extRoot = path.join(standaloneDir, "..");
const dep = (name) => path.join(standaloneDir, "node_modules", name);

export default defineConfig({
  plugins: [react()],
  root: standaloneDir,
  base: "/settings/audit/",
  build: {
    outDir: path.join(extRoot, "frontend/dist"),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@ui": path.join(extRoot, "ui"),
      "@host": path.join(extRoot, "hosts/standalone"),
      react: dep("react"),
      "react-dom": dep("react-dom"),
      "react-router-dom": dep("react-router-dom"),
      "react-markdown": dep("react-markdown"),
      "@phosphor-icons/react": dep("@phosphor-icons/react"),
    },
  },
});
