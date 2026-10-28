// Vite plugin: in a production build, template images and videos are served from the media site
// (Cloudflare Pages) instead of travelling inside the mini app package, which keeps the app small.
// Their URLs keep Vite's content-hashed file names (assets/cover-AbC123.webp), so a changed picture gets
// a new link and old copies can be cached for good. The files go to media-dist/ (uploaded by
// `npm run media`) and are left out of www/. Music and fonts stay in the app.
// Before finishing, the build checks that every file is already on the media site and fails if not:
// run `npm run media` first (it needs CLOUDFLARE_API_TOKEN).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const MEDIA_URL = "https://thiep-cuoi-media.pages.dev";
// off until the media site exists; then every build serves images and videos from it
const ENABLED = false;
export const MEDIA_DIR = fileURLToPath(new URL("../media-dist", import.meta.url));
const REMOTE = /\.(webp|jpe?g|png|gif|mp4|webm)$/i;

export const remoteMedia = () => {
  const files = [];
  return {
    name: "remote-media",
    apply: () => ENABLED || Boolean(process.env.MEDIA_SKIP_CHECK),
    config: () => ({
      experimental: {
        renderBuiltUrl: (filename) => (REMOTE.test(filename) ? `${MEDIA_URL}/${filename}` : undefined),
      },
    }),
    generateBundle(_, bundle) {
      for (const [name, item] of Object.entries(bundle)) {
        if (item.type !== "asset" || !REMOTE.test(name)) continue;
        const out = join(MEDIA_DIR, name);
        mkdirSync(dirname(out), { recursive: true });
        writeFileSync(out, item.source);
        files.push(name);
        delete bundle[name];
      }
    },
    async closeBundle() {
      if (process.env.MEDIA_SKIP_CHECK) return;
      const missing = [];
      for (let i = 0; i < files.length; i += 16) {
        await Promise.all(
          files.slice(i, i + 16).map(async (name) => {
            const res = await fetch(`${MEDIA_URL}/${name}`, { method: "HEAD" }).catch(() => null);
            if (!res || !res.ok) missing.push(name);
          }),
        );
      }
      if (missing.length) {
        throw new Error(
          `${missing.length}/${files.length} ảnh/video chưa có trên ${MEDIA_URL} (ví dụ ${missing[0]}). ` +
            "Chạy `npm run media` để tải lên rồi build lại.",
        );
      }
      console.log(`remote-media: ${files.length} ảnh/video lấy từ ${MEDIA_URL}`);
    },
  };
};
