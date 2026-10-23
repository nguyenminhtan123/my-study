// Still review image of a scrolling design page (one section per 390x844 screen, like
// design/t32/journey.html): scrolls to each screen, lets scroll-driven pieces settle, and joins the
// screenshots side by side, as mockup.mjs does for static mockups.
// Run: node scripts/design/journey-shots.mjs <page.html> <out.jpg>
import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { extname, join, relative, resolve } from "node:path";

import { launch, root, strip } from "./browser.mjs";

const [input, out] = process.argv.slice(2);
if (!input || !out) {
  console.error("usage: node scripts/design/journey-shots.mjs <page.html> <out.jpg>");
  process.exit(1);
}

const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".woff": "font/woff" };
const server = createServer((req, res) => {
  const file = join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  let body;
  try {
    body = readFileSync(file);
  } catch {
    return res.writeHead(404).end();
  }
  res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
  res.end(body);
});
await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
const url = `http://127.0.0.1:${server.address().port}/${relative(root, resolve(input)).split("\\").join("/")}`;

const dir = join(tmpdir(), `jshots-${Date.now()}`);
mkdirSync(dir, { recursive: true });
const browser = await launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await page.goto(url);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(800);
const screens = await page.evaluate(() => Math.round(document.documentElement.scrollHeight / innerHeight));
const files = [];
for (let i = 0; i < screens; i++) {
  await page.evaluate((y) => scrollTo(0, y), i * 844);
  await page.waitForTimeout(600);
  const file = join(dir, `s${i}.png`);
  await page.screenshot({ path: file });
  files.push(file);
}
await browser.close();
server.close();
strip(files, out);
rmSync(dir, { recursive: true, force: true });
console.log(`${out}: ${files.length} màn hình`);
