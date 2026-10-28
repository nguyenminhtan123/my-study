import { useEffect, useState } from "react";

// How long a guest may wait at most, and how long the screen stays at least (no flash when cached).
const MAX_WAIT = 8000;
const MIN_SHOW = 700;

// a slender heart in a 100 x 90 box
const HEART =
  "M50 86C21 65 3 47 3 27 3 13 13.5 3 27 3 37 3 45 9 50 18 55 9 63 3 73 3 86.5 3 97 13 97 27 97 47 79 65 50 86Z";
// four wavelengths (50 units each) from x -50 to 150, so it still covers the heart when slid one
// wavelength; the water below the crest runs well past the heart's foot
const WAVE = "M-50 0q12.5-5 25 0t25 0t25 0t25 0t25 0t25 0t25 0t25 0V120H-50Z";

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
        viewBox="0 0 100 90"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="pl-clip">
            <path d={HEART} />
          </clipPath>
          <linearGradient id="pl-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fbd3db" />
            <stop offset="1" stopColor="#ec9db0" />
          </linearGradient>
        </defs>
        <path className="pl-inside" d={HEART} />
        <g clipPath="url(#pl-clip)">
          <g
            className="pl-level"
            style={
              progress === undefined
                ? undefined
                : // the heart narrows to its foot, so the water climbs a little faster there
                  { transform: `translateY(${90 - 96 * progress ** 0.75}px)` }
            }
          >
            <g className="pl-slosh">
              <path className="pl-wave pl-wave-back" d={WAVE} />
              <path className="pl-wave" d={WAVE} fill="url(#pl-water)" />
            </g>
          </g>
        </g>
        <path className="pl-line" d={HEART} />
        {/* the glint of light on glass */}
        <path className="pl-glint" d="M20 13C13 16 9.5 22 10 30" />
        {progress !== undefined && (
          <text className="pl-num" x="50" y="44">
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
