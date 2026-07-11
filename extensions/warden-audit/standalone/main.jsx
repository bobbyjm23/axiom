import "@host/styles.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { applyAnythingLLMTheme } from "@ui/theme/anythingllmTheme";
import App from "@host/App.jsx";

applyAnythingLLMTheme();

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />
  </HashRouter>
);
