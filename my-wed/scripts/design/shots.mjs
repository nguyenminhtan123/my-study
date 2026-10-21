// Screenshot a template screen by screen (intro, then each viewport while scrolling) and join them
// into one strip, the same layout as the mockup so the two can be compared.
// Needs the dev server (zmp start -P 3100). Run: node scripts/design/shots.mjs <tNN> <outDir>
import { mkdirSync } from "node:fs";
import { join } from "node:path";

import {
  APP,
  HIDE_CHROME,
  SCROLLER,
  launch,
  openIntro,
  phone,
  serveIconFont,
  strip,
} from "./browser.mjs";

const [id, outDir] = process.argv.slice(2);
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
  await page.waitForTimeout(500);
  const file = join(outDir, `${id}-${String(i + 1).padStart(2, "0")}.png`);
  await page.screenshot({ path: file });
  files.push(file);
}
await browser.close();

const out = join(outDir, `${id}-strip.jpg`);
strip(files, out);
console.log(`${out}: ${files.length} màn hình`);
