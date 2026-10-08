// Compress the songs in `music-src/` into small background tracks in `src/static/music/`.
// Run: npm run music. Both folders are gitignored (the repo is public; songs stay on this machine).
// Each song becomes a mono 64 kbps mp3 at even loudness (about 0.5 MB per minute).
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { basename, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ffmpeg from "ffmpeg-static";

const root = fileURLToPath(new URL("..", import.meta.url));
const src = join(root, "music-src");
const out = join(root, "src/static/music");
const AUDIO = [".mp3", ".m4a", ".aac", ".wav", ".flac", ".ogg"];

// "Ngày Đầu Tiên (Official).mp3" -> "ngay-dau-tien-official"
const slug = (name) =>
  name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

mkdirSync(src, { recursive: true });
mkdirSync(out, { recursive: true });
const songs = readdirSync(src).filter((f) =>
  AUDIO.includes(extname(f).toLowerCase()),
);
if (!songs.length) {
  console.log(`Chưa có bài nào. Thả file nhạc vào ${src} rồi chạy lại.`);
  process.exit(0);
}

for (const file of songs) {
  const target = join(out, `${slug(basename(file, extname(file)))}.mp3`);
  if (
    existsSync(target) &&
    statSync(target).mtimeMs > statSync(join(src, file)).mtimeMs
  ) {
    console.log(`= ${basename(target)} (đã có)`);
    continue;
  }
  execFileSync(
    ffmpeg,
    [
      "-hide_banner",
      "-loglevel",
      "error",
      "-y",
      "-i",
      join(src, file),
      "-vn",
      "-map_metadata",
      "-1",
      "-ac",
      "1",
      "-b:a",
      "64k",
      "-af",
      "loudnorm=I=-16:TP=-1.5,afade=t=in:d=1.5",
      target,
    ],
    { stdio: "inherit" },
  );
  const mb = (statSync(target).size / 1024 / 1024).toFixed(1);
  console.log(`+ ${basename(target)} (${mb} MB)`);
}
