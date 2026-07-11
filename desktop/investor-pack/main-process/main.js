const { app, BrowserWindow, ipcMain, shell, Menu } = require("electron");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const PRODUCT_NAMES = {
  mentor: "Sovereign Warden — Mentor Pack",
  investor: "Sovereign Warden — Investor Pack",
};

function getBundleRoot() {
  const devBundle = path.join(__dirname, "..", "app-bundle");
  const prodBundle = path.join(process.resourcesPath, "app-bundle");
  if (fs.existsSync(devBundle)) return devBundle;
  if (fs.existsSync(prodBundle)) return prodBundle;
  return devBundle;
}

function loadAuth() {
  const authPath = path.join(getBundleRoot(), "auth.json");
  if (!fs.existsSync(authPath)) {
    console.error("auth.json not found at", authPath);
    return { users: [] };
  }
  return JSON.parse(fs.readFileSync(authPath, "utf8"));
}

function loadManifest() {
  const manifestPath = path.join(getBundleRoot(), "manifest.json");
  if (!fs.existsSync(manifestPath)) {
    return { defaultDoc: "", tree: [] };
  }
  return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
}

const sessions = new Map();
let authData = { users: [] };
let bundleRoot = "";

function createSession(email, fullName) {
  const token = crypto.randomUUID();
  sessions.set(token, { email, fullName, createdAt: Date.now() });
  return token;
}

function validateSession(token) {
  if (!token || !sessions.has(token)) return null;
  return sessions.get(token);
}

function getProductName() {
  const profile = process.env.PACK_PROFILE || "mentor";
  return PRODUCT_NAMES[profile] || PRODUCT_NAMES.mentor;
}

let mainWindow = null;

function createWindow() {
  const isDev = Boolean(process.env.VITE_DEV_SERVER_URL);

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 900,
    minHeight: 600,
    title: getProductName(),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
    },
    show: false,
  });

  if (isDev) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    mainWindow.loadFile(path.join(__dirname, "..", "dist", "index.html"));
  }

  mainWindow.once("ready-to-show", () => mainWindow.show());

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("http")) {
      shell.openExternal(url);
      return { action: "deny" };
    }
    return { action: "allow" };
  });

  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (isDev && url.startsWith("http://localhost:")) return;
    if (!url.startsWith("file://")) {
      event.preventDefault();
      if (url.startsWith("http")) shell.openExternal(url);
    }
  });
}

function buildMenu() {
  const template = [
    {
      label: getProductName(),
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

function registerIpc() {
  ipcMain.handle("auth:login", async (_event, { email, password }) => {
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const user = authData.users.find(
      (u) => u.email.toLowerCase() === normalizedEmail
    );
    if (!user) return { ok: false, error: "Invalid email or password" };

    const match = await bcrypt.compare(String(password || ""), user.passwordHash);
    if (!match) return { ok: false, error: "Invalid email or password" };

    const token = createSession(normalizedEmail, user.fullName || "");
    return { ok: true, token, email: normalizedEmail, fullName: user.fullName || "" };
  });

  ipcMain.handle("auth:logout", (_event, token) => {
    if (token) sessions.delete(token);
    return { ok: true };
  });

  ipcMain.handle("auth:validate", (_event, token) => {
    const session = validateSession(token);
    if (!session) return { ok: false };
    return { ok: true, email: session.email, fullName: session.fullName || "" };
  });

  ipcMain.handle("content:getManifest", (_event, token) => {
    if (!validateSession(token)) return { ok: false, error: "Unauthorized" };
    return { ok: true, manifest: loadManifest() };
  });

  ipcMain.handle("content:readDocument", (_event, token, docPath) => {
    if (!validateSession(token)) return { ok: false, error: "Unauthorized" };

    const safePath = String(docPath || "").replace(/^\/+/, "");
    if (safePath.includes("..")) return { ok: false, error: "Invalid path" };

    const fullPath = path.join(bundleRoot, "content", safePath);
    if (!fs.existsSync(fullPath)) {
      return { ok: false, error: "Document not found" };
    }

    return {
      ok: true,
      content: fs.readFileSync(fullPath, "utf8"),
      path: safePath,
    };
  });

  ipcMain.handle("content:getPitchDeckPath", (_event, token) => {
    if (!validateSession(token)) return { ok: false, error: "Unauthorized" };

    if (process.env.VITE_DEV_SERVER_URL) {
      return {
        ok: true,
        path: `${process.env.VITE_DEV_SERVER_URL}/pitch-deck/index.html`,
      };
    }

    const deckPath = path.join(bundleRoot, "pitch-deck", "index.html");
    if (!fs.existsSync(deckPath)) {
      return { ok: false, error: "Pitch deck not found" };
    }

    return { ok: true, path: `file://${deckPath}` };
  });

  ipcMain.handle("content:getConceptPath", (_event, token) => {
    if (!validateSession(token)) return { ok: false, error: "Unauthorized" };

    if (process.env.VITE_DEV_SERVER_URL) {
      return {
        ok: true,
        path: `${process.env.VITE_DEV_SERVER_URL}/concept/index.html`,
      };
    }

    const conceptPath = path.join(bundleRoot, "concept", "index.html");
    if (!fs.existsSync(conceptPath)) {
      return { ok: false, error: "Concept deck not found" };
    }

    return { ok: true, path: `file://${conceptPath}` };
  });

  ipcMain.handle("content:getLogoPath", () => {
    if (process.env.VITE_DEV_SERVER_URL) {
      return {
        ok: true,
        path: `${process.env.VITE_DEV_SERVER_URL}/assets/logo.png`,
      };
    }

    const logoPath = path.join(bundleRoot, "assets", "logo.png");
    if (!fs.existsSync(logoPath)) return { ok: false };

    const data = fs.readFileSync(logoPath);
    return {
      ok: true,
      path: `data:image/png;base64,${data.toString("base64")}`,
    };
  });

  ipcMain.handle("content:getConfidentiality", () => {
    const docPath = path.join(bundleRoot, "confidentiality-agreement.md");
    if (!fs.existsSync(docPath)) {
      return { ok: false, error: "Confidentiality agreement not found" };
    }
    return {
      ok: true,
      content: fs.readFileSync(docPath, "utf8"),
    };
  });

  ipcMain.handle("content:getPackProfile", () => {
    const profilePath = path.join(bundleRoot, "profile.json");
    const profile = fs.existsSync(profilePath)
      ? JSON.parse(fs.readFileSync(profilePath, "utf8")).profile
      : process.env.PACK_PROFILE || "mentor";
    const packLabel = profile === "investor" ? "investor pack" : "mentor pack";
    return { ok: true, profile, packLabel };
  });
}

app.whenReady().then(() => {
  bundleRoot = getBundleRoot();
  authData = loadAuth();
  registerIpc();
  buildMenu();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
