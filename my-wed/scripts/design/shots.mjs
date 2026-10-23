// Screenshot a template screen by screen (intro, then each viewport while scrolling) and join them
// into one strip, the same layout as the mockup so the two can be compared.
// Needs the dev server (zmp start -P 3100). Run: node scripts/design/shots.mjs <tNN> <outDir> [waitMs]
// waitMs: pause on each screen (default 500); give scroll-driven animations time to finish.
import { mkdirSync } from "node:fs";
import { join } from "node:path";

import { execFileSync } from "node:child_process";

import {
  APP,
  HIDE_CHROME,
  SCROLLER,
  ffmpeg,
  launch,
  openIntro,
  phone,
  serveIconFont,
  strip,
} from "./browser.mjs";

const [id, outDir, waitArg] = process.argv.slice(2);
const wait = Number(waitArg) || 500;
if (!id || !outDir) {
  console.error("usage: node scripts/design/shots.mjs <tNN> <outDir>");
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });

const browser = await launch();
const page = await (await phone(browser, 1)).newPage();
await serveIconFont(page);
await page.goto(`${APP}/template/${id}`);
await page.addStyleTag({ content: `${HIDE_CHROME} .k-reveal{opacity:1!important;transform:none!important}` });
await page.waitForTimeout(2500);

const files = [join(outDir, `${id}-00.png`)];
await page.screenshot({ path: files[0] });
if (await openIntro(page)) await page.waitForTimeout(3500);

const pages = await page.evaluate(`(() => { const el = ${SCROLLER}; window.__sc = el; return Math.ceil(el.scrollHeight / el.clientHeight); })()`);
for (let i = 0; i < pages; i++) {
  await page.evaluate((i) => { window.__sc.scrollTop = i * window.__sc.clientHeight; }, i);
  await page.waitForTimeout(wait);
  const file = join(outDir, `${id}-${String(i + 1).padStart(2, "0")}.png`);
  await page.screenshot({ path: file });
  files.push(file);
}
await browser.close();

const out = join(outDir, `${id}-strip.jpg`);
strip(files, out);
// gallery thumbnail candidate: the first screen after the intro, 9:16, 360x640
const thumb = join(outDir, `${id}-thumb.jpg`);
execFileSync(ffmpeg, ["-v", "error", "-y", "-i", files[1] ?? files[0], "-vf", "crop=iw:iw*16/9,scale=360:640", "-q:v", "3", thumb]);
console.log(`${out}: ${files.length} màn hình; ảnh đại diện: ${thumb}`);
