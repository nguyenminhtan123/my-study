// Record a short phone video of an animated design prototype (a page that scrolls, like
// design/t32/journey.html), for the owner to judge motion that a still mockup cannot show.
// Scrolls one screen at a time with a pause on each, so every transition plays out.
// Run: node scripts/design/journey-video.mjs <page.html> <out.mp4> [holdMs]
// With holdMs, the page is opened with ?auto (an intro prototype opens itself) and recorded for holdMs
// without scrolling.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { extname, join, relative, resolve } from "node:path";

import { execFileSync } from "node:child_process";

import { ffmpeg, launch, root } from "./browser.mjs";

const [input, out, holdArg] = process.argv.slice(2);
const hold = Number(holdArg) || 0;
if (!input || !out) {
  console.error("usage: node scripts/design/journey-video.mjs <page.html> <out.mp4>");
  process.exit(1);
}

// serve my-wed/ over http, as mockup.mjs does
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".woff": "font/woff", ".mp4": "video/mp4", ".webm": "video/webm" };
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

const dir = join(tmpdir(), `journey-${Date.now()}`);
mkdirSync(dir, { recursive: true });
const browser = await launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const frames = [];
let recording = false;
const cdp = await page.context().newCDPSession(page);
cdp.on("Page.screencastFrame", async (f) => {
  if (recording) {
    writeFileSync(join(dir, `f${String(frames.length).padStart(5, "0")}.jpg`), Buffer.from(f.data, "base64"));
    frames.push(f.metadata.timestamp);
  }
  await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
});

await page.goto(hold ? `${url}?auto` : url);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1000);
await cdp.send("Page.startScreencast", { format: "jpeg", quality: 90, maxWidth: 780, maxHeight: 1688 });
recording = true;
// hold the first screen long enough for its entrance to play out (a page can ask for more: <body data-hold="ms">)
await page.waitForTimeout(hold ? 1500 : Number(await page.evaluate(() => document.body.dataset.hold)) || 4500);
// an opening the guest taps (<div data-opener>): tap it and let it play (data-open-ms, default 5500)
if (!hold && (await page.$("[data-opener]"))) {
  await page.click("[data-opener]");
  await page.waitForTimeout(Number(await page.evaluate(() => document.body.dataset.openMs)) || 5500);
}

// one screen at a time: an eased scroll, then a pause long enough for the flight to land
// one stop per screen: each section's top, plus a further screen for sections taller than one
const stops = hold ? [] : await page.evaluate(() => {
  const out = [];
  for (const s of document.querySelectorAll("section")) {
    const top = s.getBoundingClientRect().top + scrollY; // offsetTop is relative to a positioned wrapper
    for (let y = top; y < top + s.offsetHeight - 120; y += innerHeight) out.push(y);
  }
  return out.length ? out : Array.from({ length: Math.round(document.documentElement.scrollHeight / innerHeight) }, (_, i) => i * innerHeight);
});
for (const target of stops.slice(1)) {
  await page.evaluate(
    (target) =>
      new Promise((done) => {
        const start = scrollY;
        const t0 = performance.now();
        const step = (t) => {
          const p = Math.min(1, (t - t0) / 900);
          scrollTo(0, start + (target - start) * (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2));
          p < 1 ? requestAnimationFrame(step) : done();
        };
        requestAnimationFrame(step);
      }),
    target,
  );
  await page.waitForTimeout(2600);
}
if (hold) await page.waitForTimeout(hold);
if (hold) await page.waitForTimeout(hold);
recording = false;
await cdp.send("Page.stopScreencast");
await browser.close();
server.close();

const name = (i) => `f${String(i).padStart(5, "0")}.jpg`;
const list = frames.map((t, i) => `file '${name(i)}'\nduration ${((frames[i + 1] ?? t + 0.04) - t).toFixed(4)}`);
list.push(`file '${name(frames.length - 1)}'`);
writeFileSync(join(dir, "list.txt"), list.join("\n"));
execFileSync(ffmpeg, [
  "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", join(dir, "list.txt"),
  "-vf", "scale=720:1558:flags=lanczos,fps=30,format=yuv420p",
  "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-movflags", "+faststart", out,
]);
rmSync(dir, { recursive: true, force: true });
console.log(`${out}: ${frames.length} frames, ${(frames.at(-1) - frames[0]).toFixed(1)} s`);
