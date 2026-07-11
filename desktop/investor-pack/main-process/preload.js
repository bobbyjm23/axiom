const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("investorPack", {
  login: (email, password) =>
    ipcRenderer.invoke("auth:login", { email, password }),
  logout: (token) => ipcRenderer.invoke("auth:logout", token),
  validateSession: (token) => ipcRenderer.invoke("auth:validate", token),
  getManifest: (token) => ipcRenderer.invoke("content:getManifest", token),
  readDocument: (token, docPath) =>
    ipcRenderer.invoke("content:readDocument", token, docPath),
  getPitchDeckPath: (token) =>
    ipcRenderer.invoke("content:getPitchDeckPath", token),
  getConceptPath: (token) =>
    ipcRenderer.invoke("content:getConceptPath", token),
  getLogoPath: () => ipcRenderer.invoke("content:getLogoPath"),
  getConfidentiality: () => ipcRenderer.invoke("content:getConfidentiality"),
  getPackProfile: () => ipcRenderer.invoke("content:getPackProfile"),
});
