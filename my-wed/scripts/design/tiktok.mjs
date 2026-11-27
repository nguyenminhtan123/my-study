// Record a 9:16 (1080x1920) TikTok walkthrough of a template, stopping on chosen sections, and log when
// each stop starts so captions can be laid over it. Needs the dev server (zmp start -P 3100).
// Run: node scripts/design/tiktok.mjs <tNN> <out.mp4> <stops.json> [guestName]
// stops.json: [{ "sel": ".k-guest", "hold": 2600 }, ...]; the first stop may be { "intro": 7500 }.
// Writes <out>.times.json: the start second of each stop in the finished video.
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { APP, HIDE_CHROME, SCROLLER, ffmpeg, launch, openIntro, serveIconFont } from "./browser.mjs";

const [id, out, stopsFile, guest = ""] = process.argv.slice(2);
if (!id || !out || !stopsFile) {
  console.error("usage: node scripts/design/tiktok.mjs <tNN> <out.mp4> <stops.json> [guestName]");
  process.exit(1);
}
const stops = JSON.parse(readFileSync(stopsFile, "utf8"));

const dir = mkdtempSync(join(tmpdir(), `tiktok-${id}-`));
const browser = await launch();
const ctx = await browser.newContext({ viewport: { width: 405, height: 720 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
await serveIconFont(page);

const frames = [];
let recording = false;
const cdp = await ctx.newCDPSession(page);
cdp.on("Page.screencastFrame", async (f) => {
  if (recording) {
    writeFileSync(join(dir, `f${String(frames.length).padStart(5, "0")}.jpg`), Buffer.from(f.data, "base64"));
    frames.push(f.metadata.timestamp);
  }
  await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
});

const q = guest ? `?khach=${encodeURIComponent(guest)}` : "";
await page.goto(`${APP}/template/${id}${q}`);
await page.addStyleTag({ content: HIDE_CHROME });
await page.waitForTimeout(800);
await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, maxWidth: 1080, maxHeight: 1920 });
recording = true;
const now = () => Date.now() / 1000;
const marks = [];
const t0 = now();

// smooth scroll so the element sits a little above the middle of the screen
const glide = (sel, ms) =>
  page.evaluate(
    `(async ([sel, ms]) => {
      const el = ${SCROLLER};
      const target = document.querySelector(sel);
      if (!target) return;
      const r = target.getBoundingClientRect();
      const from = el.scrollTop;
      const to = Math.max(0, Math.min(el.scrollHeight - el.clientHeight, from + r.top + r.height / 2 - el.clientHeight * 0.46));
      const t0 = performance.now();
      await new Promise((done) => {
        const step = (t) => {
          const p = Math.min(1, (t - t0) / ms);
          el.scrollTop = from + (to - from) * (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
          p < 1 ? requestAnimationFrame(step) : done();
        };
        requestAnimationFrame(step);
      });
    })(${JSON.stringify([sel, ms])})`,
  );

for (const s of stops) {
  if (s.intro !== undefined) {
    marks.push(now() - t0);
    if (await openIntro(page)) await page.waitForTimeout(400);
    await page.waitForTimeout(s.intro);
    continue;
  }
  await glide(s.sel, s.glide ?? 1100);
  marks.push(now() - t0);
  await page.waitForTimeout(s.hold ?? 2600);
}
marks.push(now() - t0);
recording = false;
await cdp.send("Page.stopScreencast");
await browser.close();

const name = (i) => `f${String(i).padStart(5, "0")}.jpg`;
const list = frames.map((t, i) => `file '${name(i)}'\nduration ${((frames[i + 1] ?? t + 0.04) - t).toFixed(4)}`);
list.push(`file '${name(frames.length - 1)}'`);
writeFileSync(join(dir, "list.txt"), list.join("\n"));
execFileSync(ffmpeg, [
  "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", join(dir, "list.txt"),
  "-vf", "scale=1080:1920:flags=lanczos,fps=30,format=yuv420p",
  "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-movflags", "+faststart", out,
]);
rmSync(dir, { recursive: true, force: true });
// frame timestamps start a little after t0; shift the marks onto the video clock
const shift = frames[0] - t0 * 0; // screencast timestamps are wall-clock seconds
const offset = frames[0] - (t0 + 0);
writeFileSync(`${out}.times.json`, JSON.stringify(marks.map((m) => Math.max(0, +(m - offset).toFixed(2)))));
console.log(`${out}: ${frames.length} frames, ${(frames.at(-1) - frames[0]).toFixed(1)} s, stops at ${marks.map((m) => (m - offset).toFixed(1)).join(", ")}`);
void shift;
