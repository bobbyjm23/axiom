const { app, BrowserWindow, shell, Menu } = require("electron");
const path = require("path");
const fs = require("fs");

const DEFAULT_CONFIG = {
  serverUrl: "http://localhost:3000",
  apiBase: "http://localhost:3000/api",
  appName: "Sovereign Warden",
  remoteOnly: true,
};

function loadConfig() {
  const candidates = [
    path.join(__dirname, "..", "config.json"),
    path.join(process.resourcesPath, "sovereign-config.json"),
  ];
  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate)) {
        return { ...DEFAULT_CONFIG, ...JSON.parse(fs.readFileSync(candidate, "utf8")) };
      }
    } catch (_) {
      // continue
    }
  }
  return DEFAULT_CONFIG;
}

let mainWindow = null;

function createWindow(config) {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 900,
    minHeight: 600,
    title: config.appName,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
    show: false,
  });

  // Load bundled AnythingLLM frontend (built with VITE_API_BASE → remote backend)
  const indexPath = path.join(__dirname, "..", "frontend-dist", "index.html");
  if (fs.existsSync(indexPath)) {
    mainWindow.loadFile(indexPath);
  } else {
    // Fallback: load directly from Docker backend (same UI, served by server)
    mainWindow.loadURL(config.serverUrl);
  }

  mainWindow.once("ready-to-show", () => mainWindow.show());

  // Open external links in system browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("http")) {
      shell.openExternal(url);
      return { action: "deny" };
    }
    return { action: "allow" };
  });

  mainWindow.webContents.on("will-navigate", (event, url) => {
    const configHost = new URL(config.serverUrl).host;
    const targetHost = new URL(url).host;
    if (targetHost !== configHost && !url.startsWith("file://")) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });
}

function buildMenu(config) {
  const template = [
    {
      label: config.appName,
      submenu: [
        { role: "about" },
        { type: "separator" },
        { role: "hide" },
        { role: "hideOthers" },
        { role: "unhide" },
        { type: "separator" },
        { role: "quit" },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "selectAll" },
      ],
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    {
      label: "Window",
      submenu: [{ role: "minimize" }, { role: "zoom" }, { role: "close" }],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => {
  const config = loadConfig();
  buildMenu(config);
  createWindow(config);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow(config);
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
