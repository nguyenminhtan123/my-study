import { useEffect, useState } from "react";

// How long a guest may wait at most, and how long the screen stays at least (no flash when cached).
const MAX_WAIT = 8000;
const MIN_SHOW = 700;

const HEART = "M16 28C-6 14 2-2 16 6.5 30-2 38 14 16 28Z";
// four wavelengths (17 units each) from x -17 to 51, so it still covers the heart when slid one wavelength
// either way; the water below the crest runs well past the heart's foot
const WAVE =
  "M-17 0q4.25-2.4 8.5 0t8.5 0t8.5 0t8.5 0t8.5 0t8.5 0t8.5 0t8.5 0V40H-17Z";

/**
 * The waiting screen itself: the groom's name, a heart, the bride's name. The heart is the progress:
 * water rises in it with a moving wave, the percentage in the middle (while there is nothing to count
 * yet, the tide just rises and falls).
 */
export const LoadingScreen = ({
  names,
  progress,
  leaving = false,
}: {
  /** groom and bride */
  names?: [string, string];
  /** 0..1, or undefined while there is nothing to count yet */
  progress?: number;
  leaving?: boolean;
}) => {
  // the names wait for their handwriting font, so they never flash up in a plain one first
  const [font, setFont] = useState(false);
  useEffect(() => {
    let alive = true;
    const show = () => alive && setFont(true);
    document.fonts.load('40px "Great Vibes"').then(show, show);
    const t = window.setTimeout(show, 1500);
    return () => {
      alive = false;
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div
      className={`pl-screen ${leaving ? "pl-leave" : ""} ${font ? "pl-font" : ""}`}
      role="status"
      aria-label="Đang mở thiệp"
    >
      {names && <p className="pl-name">{names[0]}</p>}
      <svg
        className={`pl-heart ${progress === undefined ? "pl-wait" : ""}`}
        viewBox="-1 -1 34 31"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="pl-clip">
            <path d={HEART} />
          </clipPath>
          <linearGradient id="pl-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f7b9c4" />
            <stop offset="1" stopColor="#e07b93" />
          </linearGradient>
        </defs>
        <path className="pl-inside" d={HEART} />
        <g clipPath="url(#pl-clip)">
          <g
            className="pl-level"
            style={
              progress === undefined
                ? undefined
                : { transform: `translateY(${32 - 35 * progress}px)` }
            }
          >
            <g className="pl-slosh">
              <path className="pl-wave pl-wave-back" d={WAVE} />
              <path className="pl-wave" d={WAVE} fill="url(#pl-water)" />
            </g>
          </g>
        </g>
        <path className="pl-line" d={HEART} />
        {progress !== undefined && (
          <text className="pl-num" x="16" y="14.5">
            {Math.round(progress * 100)}
            <tspan>%</tspan>
          </text>
        )}
      </svg>
      {names && <p className="pl-name">{names[1]}</p>}
    </div>
  );
};

const urlsIn = (value: string) =>
  [...value.matchAll(/url\(["']?([^"')]+)["']?\)/g)]
    .map((m) => m[1])
    .filter((u) => !u.startsWith("data:"));

const loadImage = (src: string) =>
  new Promise<void>((done) => {
    const img = new Image();
    img.onload = img.onerror = () => done();
    img.src = src;
  });

const videoReady = (video: HTMLVideoElement) =>
  new Promise<void>((done) => {
    if (video.readyState >= 3 || !video.currentSrc) return done();
    video.addEventListener("canplay", () => done(), { once: true });
    video.addEventListener("error", () => done(), { once: true });
  });

/**
 * Covers the template until its pictures and video have loaded (at most MAX_WAIT), with the template's
 * CSS animations held at their start, so the opening plays in full once the guest can see it.
 * Render it next to the template: it looks for images in the template page (img tags and CSS backgrounds).
 */
const Preloader = ({ names }: { names: [string, string] }) => {
  const [progress, setProgress] = useState(0);
  // the bar creeps on by itself too (toward 90%), so it never sits still while a big file loads
  const [creep, setCreep] = useState(0);
  const [phase, setPhase] = useState<"wait" | "leave" | "gone">("wait");

  useEffect(() => {
    document.body.classList.add("pl-hold");
    let alive = true;
    const started = Date.now();
    const creeping = window.setInterval(
      () => setCreep(0.9 * (1 - Math.exp(-(Date.now() - started) / 2500))),
      200,
    );
    // the template has mounted by the next frame; gather what it shows
    const frame = requestAnimationFrame(() => {
      const pages = document.querySelectorAll(".zaui-page");
      const page = pages[pages.length - 1] ?? document.body;
      const images = new Set<string>();
      page
        .querySelectorAll("img")
        .forEach((img) => img.currentSrc && images.add(img.currentSrc));
      page.querySelectorAll<HTMLElement>("*").forEach((el) => {
        for (const pseudo of [null, "::before", "::after"]) {
          const bg = getComputedStyle(el, pseudo).backgroundImage;
          if (bg && bg !== "none") urlsIn(bg).forEach((u) => images.add(u));
        }
      });
      const tasks = [
        ...[...images].map(loadImage),
        ...[...page.querySelectorAll("video")].map(videoReady),
      ];
      let done = 0;
      const tick = () =>
        alive && setProgress(tasks.length ? done / tasks.length : 1);
      tasks.forEach((t) => t.then(() => (done++, tick())));
      tick();
      const finish = () => {
        if (!alive) return;
        window.setTimeout(
          () => alive && setPhase("leave"),
          Math.max(0, MIN_SHOW - (Date.now() - started)),
        );
      };
      Promise.race([
        Promise.all(tasks),
        new Promise((r) => window.setTimeout(r, MAX_WAIT)),
      ]).then(finish);
    });
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      window.clearInterval(creeping);
      document.body.classList.remove("pl-hold");
    };
  }, []);

  useEffect(() => {
    if (phase !== "leave") return undefined;
    // let the template's animations start under the fading screen
    document.body.classList.remove("pl-hold");
    const t = window.setTimeout(() => setPhase("gone"), 600);
    return () => window.clearTimeout(t);
  }, [phase]);

  if (phase === "gone") return null;
  const shown = phase === "leave" ? 1 : Math.max(progress, creep);
  return (
    <LoadingScreen names={names} progress={shown} leaving={phase === "leave"} />
  );
};

export default Preloader;
