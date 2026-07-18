/**
 * Export Concept deck slides as PNG screenshots (MBA 13" viewport)
 * then assemble into a multi-page PDF.
 *
 * Viewport: 1440×900 @ 2x (MacBook Air 13" M1 default scaled resolution)
 */
import { chromium } from "playwright-core";
import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "export");
const SLIDES_DIR = path.join(OUT_DIR, "slides");
const PDF_PATH = path.join(OUT_DIR, "sovereign-warden-concept-mba13.pdf");
const BASE =
  process.env.CONCEPT_URL || "http://localhost:5173/concept/index.html";
const WIDTH = 1440;
const HEIGHT = 900;
const SLIDE_COUNT = 10;

async function main() {
  fs.mkdirSync(SLIDES_DIR, { recursive: true });

  const browser = await chromium.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });

  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 2,
  });

  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.addStyleTag({
    content: `
      .nav-buttons, .progress, .slide-counter, .logo-mark { display: none !important; }
      .slide { padding-bottom: var(--slide-padding) !important; }
    `,
  });

  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);

  const files = [];
  for (let i = 1; i <= SLIDE_COUNT; i++) {
    await page.goto(`${BASE}#slide-${i}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(350);
    await page.evaluate((n) => {
      const slides = Array.from(document.querySelectorAll(".slide"));
      slides.forEach((s, idx) => {
        s.classList.toggle("active", idx === n - 1);
      });
      const dark = slides[n - 1]?.classList.contains("slide--dark");
      document.body.classList.toggle("dark-slide-active", !!dark);
    }, i);

    await page.waitForTimeout(250);
    const file = path.join(
      SLIDES_DIR,
      `slide-${String(i).padStart(2, "0")}.png`,
    );
    await page.screenshot({ path: file, fullPage: false, type: "png" });
    files.push(file);
    console.log("captured", path.basename(file));
  }

  await browser.close();

  const py = `
from pathlib import Path
import subprocess, sys
try:
    from PIL import Image
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow", "-q"])
    from PIL import Image

files = ${JSON.stringify(files)}
out = ${JSON.stringify(PDF_PATH)}
images = [Image.open(f).convert("RGB") for f in files]
images[0].save(out, save_all=True, append_images=images[1:], resolution=144.0)
print("pages", len(images), "size", images[0].size)
print(out)
`;
  const pyFile = path.join(OUT_DIR, "_build_pdf.py");
  fs.writeFileSync(pyFile, py);
  execFileSync("python3", [pyFile], { stdio: "inherit" });
  fs.unlinkSync(pyFile);

  console.log("PDF ready:", PDF_PATH);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
