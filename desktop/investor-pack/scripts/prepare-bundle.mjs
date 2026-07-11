#!/usr/bin/env node
/**
 * Prepare app-bundle for mentor or investor Electron builds.
 * Usage: node scripts/prepare-bundle.js --profile mentor|investor
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const REPO_ROOT = path.join(ROOT, "..", "..");
const BUSINESS_ROOT = path.join(REPO_ROOT, "docs", "business");
const PITCH_DECK_SRC = path.join(BUSINESS_ROOT, "pitch-deck");
const CONCEPT_SRC = path.join(BUSINESS_ROOT, "concept");
const BUNDLE_ROOT = path.join(ROOT, "app-bundle");
const PUBLIC_ASSETS = path.join(ROOT, "public", "assets");

function parseArgs() {
  const idx = process.argv.indexOf("--profile");
  const profile = idx >= 0 ? process.argv[idx + 1] : "mentor";
  if (!["mentor", "investor"].includes(profile)) {
    console.error("Invalid profile. Use --profile mentor or --profile investor");
    process.exit(1);
  }
  return profile;
}

function rmrf(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest) {
  mkdirp(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function copyDir(src, dest) {
  mkdirp(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(srcPath, destPath);
    else copyFile(srcPath, destPath);
  }
}

function collectPaths(tree) {
  const paths = [];
  for (const node of tree) {
    if (node.path) paths.push(node);
    if (node.children) paths.push(...collectPaths(node.children));
  }
  return paths;
}

function resolveSource(node) {
  if (node.source) {
    return path.join(REPO_ROOT, node.source);
  }
  return path.join(BUSINESS_ROOT, node.path);
}

function loadManifest(profile) {
  const manifestPath = path.join(ROOT, "config", `manifest.${profile}.json`);
  return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
}

function loadWhitelist(profile) {
  const whitelistPath = path.join(ROOT, "config", `whitelist.${profile}.json`);
  const examplePath = path.join(ROOT, "config", `whitelist.${profile}.json.example`);

  if (fs.existsSync(whitelistPath)) {
    return JSON.parse(fs.readFileSync(whitelistPath, "utf8"));
  }

  if (fs.existsSync(examplePath)) {
    console.warn(
      `Warning: ${whitelistPath} not found. Using example whitelist for development.`
    );
    return JSON.parse(fs.readFileSync(examplePath, "utf8"));
  }

  console.error(`No whitelist found for profile "${profile}".`);
  process.exit(1);
}

async function hashUsers(users) {
  const hashed = [];
  for (const user of users) {
    const email = String(user.email || "").trim().toLowerCase();
    const password = String(user.password || "");
    const fullName = String(user.fullName || user.name || "").trim();
    if (!email || !password) continue;
    const passwordHash = await bcrypt.hash(password, 10);
    hashed.push({ email, fullName, passwordHash });
  }
  return hashed;
}

async function main() {
  const profile = parseArgs();
  console.log(`Preparing bundle for profile: ${profile}`);

  const manifest = loadManifest(profile);
  const whitelist = loadWhitelist(profile);
  const nodes = collectPaths(manifest.tree || []);

  rmrf(BUNDLE_ROOT);
  mkdirp(path.join(BUNDLE_ROOT, "content"));
  mkdirp(path.join(BUNDLE_ROOT, "pitch-deck"));
  mkdirp(path.join(BUNDLE_ROOT, "concept"));
  mkdirp(path.join(BUNDLE_ROOT, "assets", "fonts"));
  mkdirp(PUBLIC_ASSETS);

  let copied = 0;
  for (const node of nodes) {
    const src = resolveSource(node);
    const dest = path.join(BUNDLE_ROOT, "content", node.path);
    if (!fs.existsSync(src)) {
      console.error(`Missing source file: ${src}`);
      process.exit(1);
    }
    copyFile(src, dest);
    copied++;
  }

  copyDir(PITCH_DECK_SRC, path.join(BUNDLE_ROOT, "pitch-deck"));
  copyDir(PITCH_DECK_SRC, path.join(ROOT, "public", "pitch-deck"));

  copyDir(CONCEPT_SRC, path.join(BUNDLE_ROOT, "concept"));
  copyDir(CONCEPT_SRC, path.join(ROOT, "public", "concept"));
  copyDir(
    path.join(PITCH_DECK_SRC, "assets"),
    path.join(BUNDLE_ROOT, "concept", "assets")
  );
  copyDir(
    path.join(PITCH_DECK_SRC, "assets"),
    path.join(ROOT, "public", "concept", "assets")
  );
  const conceptIconsSrc = path.join(CONCEPT_SRC, "assets", "icons");
  if (fs.existsSync(conceptIconsSrc)) {
    copyDir(conceptIconsSrc, path.join(BUNDLE_ROOT, "concept", "assets", "icons"));
    copyDir(conceptIconsSrc, path.join(ROOT, "public", "concept", "assets", "icons"));
  }

  const logoSrc = path.join(PITCH_DECK_SRC, "assets", "logo.png");
  const fontsSrc = path.join(PITCH_DECK_SRC, "assets", "fonts");
  copyFile(logoSrc, path.join(BUNDLE_ROOT, "assets", "logo.png"));
  copyFile(logoSrc, path.join(PUBLIC_ASSETS, "logo.png"));
  copyDir(fontsSrc, path.join(BUNDLE_ROOT, "assets", "fonts"));
  copyDir(fontsSrc, path.join(PUBLIC_ASSETS, "fonts"));

  const iconsSrc = path.join(ROOT, "assets", "icons");
  copyDir(iconsSrc, path.join(BUNDLE_ROOT, "assets", "icons"));
  copyDir(iconsSrc, path.join(PUBLIC_ASSETS, "icons"));

  const confidentialitySrc = path.join(ROOT, "content", "confidentiality-agreement.md");
  copyFile(confidentialitySrc, path.join(BUNDLE_ROOT, "confidentiality-agreement.md"));
  copyFile(confidentialitySrc, path.join(ROOT, "public", "confidentiality-agreement.md"));

  const authUsers = await hashUsers(whitelist.users || []);
  fs.writeFileSync(
    path.join(BUNDLE_ROOT, "auth.json"),
    JSON.stringify({ users: authUsers }, null, 2)
  );

  const bundleManifest = {
    profile,
    defaultDoc: manifest.defaultDoc,
    tree: manifest.tree,
  };
  fs.writeFileSync(
    path.join(BUNDLE_ROOT, "manifest.json"),
    JSON.stringify(bundleManifest, null, 2)
  );

  fs.writeFileSync(
    path.join(BUNDLE_ROOT, "profile.json"),
    JSON.stringify({ profile }, null, 2)
  );

  console.log(`Copied ${copied} documents, pitch deck, concept deck, and assets.`);
  console.log(`Bundle ready at ${BUNDLE_ROOT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
