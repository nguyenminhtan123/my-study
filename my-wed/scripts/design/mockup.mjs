// Render a design mockup to one image the owner reviews before any template code is written.
// The mockup is a plain HTML file whose `.board` holds the phone screens side by side
// (each `.screen` 390x844). Run: node scripts/design/mockup.mjs <mockup.html> <out.jpg>
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

import { launch } from "./browser.mjs";

const [input, out] = process.argv.slice(2);
if (!input || !out) {
  console.error("usage: node scripts/design/mockup.mjs <mockup.html> <out.jpg>");
  process.exit(1);
}

const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 2 });
await page.goto(pathToFileURL(resolve(input)).href);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(800);
const board = await page.$(".board");
if (!board) throw new Error("mockup cần một phần tử .board chứa các .screen");
await board.screenshot({ path: out, type: "jpeg", quality: 88 });
const screens = await page.$$eval(".screen", (els) => els.length);
console.log(`${out}: ${screens} màn hình`);
await browser.close();
