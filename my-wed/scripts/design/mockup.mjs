// Render a design mockup to one image the owner reviews before any template code is written.
// The mockup is a plain HTML file whose `.board` holds the phone screens side by side
// (each `.screen` 390x844). Run: node scripts/design/mockup.mjs <mockup.html> <out.jpg>
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, relative, resolve } from "node:path";

import { launch, root } from "./browser.mjs";

const [input, out] = process.argv.slice(2);
if (!input || !out) {
  console.error("usage: node scripts/design/mockup.mjs <mockup.html> <out.jpg>");
  process.exit(1);
}

// serve my-wed/ over http: CSS masks and fonts are refused on file:// pages
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".woff": "font/woff" };
const server = createServer(async (req, res) => {
  const file = join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  const body = await readFile(file).catch(() => null);
  if (!body) return res.writeHead(404).end();
  res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
  res.end(body);
});
await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
const url = `http://127.0.0.1:${server.address().port}/${relative(root, resolve(input)).split("\\").join("/")}`;

const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 2 });
await page.goto(url);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(800);
const board = await page.$(".board");
if (!board) throw new Error("mockup cần một phần tử .board chứa các .screen");
await board.screenshot({ path: out, type: "jpeg", quality: 88 });
const screens = await page.$$eval(".screen", (els) => els.length);
console.log(`${out}: ${screens} màn hình`);
await browser.close();
server.close();
