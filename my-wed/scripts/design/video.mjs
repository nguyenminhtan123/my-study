// Record a 9:16 (1080x1920) walkthrough of a template: open the intro, then scroll smoothly to the end.
// Frames come from Chrome's screencast (sharp at DPR 3) and are joined with their real timing.
// Needs the dev server (zmp start -P 3100). Run: node scripts/design/video.mjs <tNN> <out.mp4> [seconds]
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
  APP,
  HIDE_CHROME,
  SCROLLER,
  ffmpeg,
  launch,
  openIntro,
  serveIconFont,
} from "./browser.mjs";

const [id, out, seconds = "26"] = process.argv.slice(2);
if (!id || !out) {
  console.error("usage: node scripts/design/video.mjs <tNN> <out.mp4> [seconds]");
  process.exit(1);
}

const dir = mkdtempSync(join(tmpdir(), `video-${id}-`));
const browser = await launch();
const ctx = await browser.newContext({
  viewport: { width: 405, height: 720 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
});
const page = await ctx.newPage();
await serveIconFont(page);

// demo data has blanks ("Ông ___"); fill them with believable sample text for the video only
await page.addInitScript(() => {
  const ong = ["Nguyễn Văn Hùng", "Lê Minh Đức"];
  const ba = ["Trần Thị Mai", "Phạm Thị Hoa"];
  let io = 0;
  let ib = 0;
  const fix = (s) =>
    s
      .replace(/Sảnh ___, số ___ đường ___, phường ___/g, "Sảnh Diamond, 68 Lê Lợi, phường Bến Thành")
      .replace(/Ông ___/g, () => `Ông ${ong[io++ % 2]}`)
      .replace(/Bà ___/g, () => `Bà ${ba[ib++ % 2]}`)
      .replace(/Nhà hàng ABC/g, "Trung tâm tiệc cưới White Palace")
      .replace(/0000 0000 0000/g, "1903 6688 2026")
      .replace(/1111 1111 1111/g, "0711 0022 5566");
  const walk = () => {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n = w.nextNode(); n; n = w.nextNode()) {
      if (/___|0000 0000|1111 1111|Nhà hàng ABC/.test(n.data)) n.data = fix(n.data);
    }
  };
  new MutationObserver(walk).observe(document, { childList: true, subtree: true, characterData: true });
});

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

await page.goto(`${APP}/template/${id}`);
await page.addStyleTag({ content: HIDE_CHROME });
await page.waitForTimeout(800);
await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, maxWidth: 1080, maxHeight: 1920 });
recording = true;
await page.waitForTimeout(2600);
if (await openIntro(page)) await page.waitForTimeout(3200);

// ease-in-out scroll to the bottom over the remaining time
await page.evaluate(
  `(async (ms) => {
    const el = ${SCROLLER};
    const max = el.scrollHeight - el.clientHeight;
    const t0 = performance.now();
    await new Promise((done) => {
      const step = (t) => {
        const p = Math.min(1, (t - t0) / ms);
        el.scrollTop = (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2) * max;
        p < 1 ? requestAnimationFrame(step) : done();
      };
      requestAnimationFrame(step);
    });
  })(${Number(seconds) * 1000 - 6500})`,
);
await page.waitForTimeout(1200);
recording = false;
await cdp.send("Page.stopScreencast");
await browser.close();

// concat list with each frame's real duration
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
console.log(`${out}: ${frames.length} frames, ${(frames.at(-1) - frames[0]).toFixed(1)} s`);
