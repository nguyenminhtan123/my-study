// Shared headless browser for the design scripts (mockup, shots, video).
// Uses the project's playwright if installed, else a global one; Chromium from CHROMIUM or /opt/pw-browsers.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
export const root = fileURLToPath(new URL("../..", import.meta.url));
export const ffmpeg = require("ffmpeg-static");
export const APP = process.env.APP_URL || "http://localhost:3100";

const loadPlaywright = () => {
  for (const p of ["playwright", "/opt/node22/lib/node_modules/playwright"]) {
    try {
      return require(p);
    } catch {
      // try the next location
    }
  }
  throw new Error("Không tìm thấy playwright: chạy `npm i -D playwright`");
};

export const launch = () => {
  const exe = process.env.CHROMIUM || "/opt/pw-browsers/chromium";
  return loadPlaywright().chromium.launch(
    existsSync(exe) ? { executablePath: exe } : {},
  );
};

// a phone: 390x844 CSS px (iPhone 14), touch, retina by default
export const phone = (browser, scale = 2, extra = {}) =>
  browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: scale,
    isMobile: true,
    hasTouch: true,
    ...extra,
  });

// zmp-ui's icon font comes from Zalo's CDN, which a sandboxed browser may not reach: serve a cached copy
const FONT = "https://h5.zadn.vn/static/fonts/ZMPIcons-Regular-v3.woff2";
export const serveIconFont = async (page) => {
  const cache = join(root, "scripts/design/.cache");
  const file = join(cache, "zmpicons.woff2");
  if (!existsSync(file)) {
    mkdirSync(cache, { recursive: true });
    try {
      execFileSync("curl", ["-sSfL", "-m", "30", "-o", file, FONT]);
    } catch {
      return;
    }
  }
  await page.route("https://h5.zadn.vn/static/fonts/**", (r) =>
    r.fulfill({ status: 200, contentType: "font/woff2", body: readFileSync(file) }),
  );
};

// gallery chrome that should not appear in screenshots or videos
export const HIDE_CHROME =
  ".gl-bar,.gl-peek,.gl-music{display:none!important} .gl-bar:not(.gl-bar-off) ~ .zaui-page{padding-bottom:0!important}";

// the intro of each template (doors, envelope, seal...): tapped to open it
export const OPENERS = [
  ".t30-intro",
  ".t28-intro",
  ".t26-doors",
  ".t27-env",
  ".wd-seal",
  ".t11-seal",
  ".t11-env",
  ".t15-env-seal",
  ".t15-env",
];

export const openIntro = async (page) => {
  for (const sel of OPENERS) {
    const el = await page.$(sel);
    if (el && (await el.isVisible())) {
      await el.tap({ force: true }).catch(() => el.click({ force: true }));
      return true;
    }
  }
  return false;
};

// the element that scrolls the template (the page itself or zmp's .zaui-page)
export const SCROLLER = `(() => {
  const els = [document.scrollingElement, ...document.querySelectorAll('.zaui-page, [class*="-root"]')];
  return els.filter(Boolean).sort((a, b) => (b.scrollHeight - b.clientHeight) - (a.scrollHeight - a.clientHeight))[0];
})()`;

// side-by-side strip of screenshots, each scaled to `height`
export const strip = (files, out, height = 844) => {
  const inputs = files.flatMap((f) => ["-i", f]);
  const scaled = files.map((_, i) => `[${i}]scale=-2:${height}[s${i}]`).join(";");
  const chain = files.map((_, i) => `[s${i}]`).join("");
  const stack = files.length > 1 ? `${chain}hstack=${files.length}` : `${chain}null`;
  execFileSync(ffmpeg, [
    "-v", "error", "-y", ...inputs,
    "-filter_complex", `${scaled};${stack}`,
    "-q:v", "3", out,
  ]);
};
