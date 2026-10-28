// Upload the template images and videos to the media site (Cloudflare Pages), see scripts/remote-media.mjs.
// Builds the app (which writes the hashed files to media-dist/), keeps every file already on the site so
// mini app versions still live keep working, then deploys the lot.
// Run: npm run media     (needs CLOUDFLARE_API_TOKEN with Cloudflare Pages: Edit, and CLOUDFLARE_ACCOUNT_ID)
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { MEDIA_DIR, MEDIA_URL } from "./remote-media.mjs";

const PROJECT = "thiep-cuoi-media";
if (!process.env.CLOUDFLARE_API_TOKEN || !process.env.CLOUDFLARE_ACCOUNT_ID) {
  console.error("Thiếu CLOUDFLARE_API_TOKEN hoặc CLOUDFLARE_ACCOUNT_ID.");
  process.exit(1);
}

rmSync(MEDIA_DIR, { recursive: true, force: true });
execSync("npx zmp build", { stdio: "inherit", env: { ...process.env, MEDIA_SKIP_CHECK: "1" } });

// keep what is already online: older app versions still point at those files
const assets = join(MEDIA_DIR, "assets");
mkdirSync(assets, { recursive: true });
const online = await fetch(`${MEDIA_URL}/manifest.json`)
  .then((r) => (r.ok ? r.json() : []))
  .catch(() => []);
let fetched = 0;
for (const name of online) {
  const file = join(MEDIA_DIR, name);
  if (existsSync(file)) continue;
  const res = await fetch(`${MEDIA_URL}/${name}`);
  if (!res.ok) continue;
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  fetched++;
}
const all = readdirSync(assets).map((f) => `assets/${f}`).sort();
writeFileSync(join(MEDIA_DIR, "manifest.json"), JSON.stringify(all));
// file names carry a content hash, so they never change: cache them for a year
writeFileSync(
  join(MEDIA_DIR, "_headers"),
  "/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n  Access-Control-Allow-Origin: *\n",
);
console.log(`media: ${all.length} tệp (${fetched} tệp cũ giữ lại từ trang đang chạy)`);

execSync(`npx -y wrangler@3 pages deploy ${MEDIA_DIR} --project-name ${PROJECT} --branch main --commit-dirty=true`, {
  stdio: "inherit",
});
