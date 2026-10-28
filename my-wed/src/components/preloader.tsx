import { useEffect, useState } from "react";

// How long a guest may wait at most, and how long the screen stays at least (no flash when cached).
const MAX_WAIT = 8000;
const MIN_SHOW = 700;

const HEART = "M16 28C-6 14 2-2 16 6.5 30-2 38 14 16 28Z";

/**
 * The waiting screen itself: the groom's name, a heart, the bride's name. The heart is the progress:
 * it fills with red from the bottom as the pictures load (or keeps filling and emptying while there is
 * nothing to count yet).
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
}) => (
  <div className={`pl-screen ${leaving ? "pl-leave" : ""}`} role="status" aria-label="Đang mở thiệp">
    {names && <p className="pl-name">{names[0]}</p>}
    <div className={`pl-heart ${progress === undefined ? "pl-wait" : ""}`} aria-hidden="true">
      <svg viewBox="-1 -1 34 31">
        <path className="pl-line" d={HEART} />
      </svg>
      <svg
        viewBox="-1 -1 34 31"
        className="pl-fill"
        style={progress === undefined ? undefined : { clipPath: `inset(${Math.round((1 - progress) * 100)}% 0 0 0)` }}
      >
        <path d={HEART} />
      </svg>
    </div>
    {names && <p className="pl-name">{names[1]}</p>}
  </div>
);

const urlsIn = (value: string) =>
  [...value.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map((m) => m[1]).filter((u) => !u.startsWith("data:"));

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
    const creeping = window.setInterval(() => setCreep(0.9 * (1 - Math.exp(-(Date.now() - started) / 2500))), 200);
    // the template has mounted by the next frame; gather what it shows
    const frame = requestAnimationFrame(() => {
      const pages = document.querySelectorAll(".zaui-page");
      const page = pages[pages.length - 1] ?? document.body;
      const images = new Set<string>();
      page.querySelectorAll("img").forEach((img) => img.currentSrc && images.add(img.currentSrc));
      page.querySelectorAll<HTMLElement>("*").forEach((el) => {
        for (const pseudo of [null, "::before", "::after"]) {
          const bg = getComputedStyle(el, pseudo).backgroundImage;
          if (bg && bg !== "none") urlsIn(bg).forEach((u) => images.add(u));
        }
      });
      const tasks = [...[...images].map(loadImage), ...[...page.querySelectorAll("video")].map(videoReady)];
      let done = 0;
      const tick = () => alive && setProgress(tasks.length ? done / tasks.length : 1);
      tasks.forEach((t) => t.then(() => (done++, tick())));
      tick();
      const finish = () => {
        if (!alive) return;
        window.setTimeout(() => alive && setPhase("leave"), Math.max(0, MIN_SHOW - (Date.now() - started)));
      };
      Promise.race([Promise.all(tasks), new Promise((r) => window.setTimeout(r, MAX_WAIT))]).then(finish);
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
  return <LoadingScreen names={names} progress={shown} leaving={phase === "leave"} />;
};

export default Preloader;
