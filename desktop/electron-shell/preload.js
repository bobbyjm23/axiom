const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("sovereignAI", {
  platform: process.platform,
  remoteOnly: true,
});
