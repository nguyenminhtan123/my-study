import { CSSProperties, useEffect, useLayoutEffect, useState } from "react";

// How long a guest may wait at most, and how long the screen stays at least (no flash when cached).
const MAX_WAIT = 8000;
const MIN_SHOW = 700;

/** Colours and handwriting font of the template being opened (its `--k-*` variables), if it sets them. */
type Theme = {
  bg?: string;
  ink?: string;
  muted?: string;
  accent?: string;
  script?: string;
};

const DEFAULT_SCRIPT = '"Great Vibes", cursive';

/**
 * The template's page. While the router slides it in, the page we came from (the gallery) is still in
 * the document, after it.
 */
const templatePage = () =>
  [...document.querySelectorAll(".zaui-page")].find(
    (p) => !p.classList.contains("gl-page") && !p.classList.contains("iv-page"),
  );

/** Reads the theme off the template page that has just mounted. */
const readTheme = (): Theme => {
  const page = templatePage();
  if (!page) return {};
  const style = getComputedStyle(page);
  const get = (name: string) =>
    style.getPropertyValue(name).trim() || undefined;
  return {
    bg: get("--k-bg"),
    ink: get("--k-ink"),
    muted: get("--k-muted"),
    accent: get("--k-accent"),
    script: get("--k-script"),
  };
};

/**
 * The waiting screen itself: a beating heart, the couple's names, and how far loading has got,
 * in the colours and handwriting of the template being opened.
 */
export const LoadingScreen = ({
  names,
  progress,
  leaving = false,
  theme = {},
}: {
  /** groom and bride */
  names?: [string, string];
  /** 0..1, or undefined while there is nothing to count yet */
  progress?: number;
  leaving?: boolean;
  theme?: Theme;
}) => {
  const script = theme.script ?? DEFAULT_SCRIPT;
  // the names wait for their handwriting font, so they never flash up in a plain one first
  const [font, setFont] = useState(false);
  useEffect(() => {
    let alive = true;
    setFont(false);
    const show = () => alive && setFont(true);
    document.fonts.load(`40px ${script}`).then(show, show);
    const t = window.setTimeout(show, 1500);
    return () => {
      alive = false;
      window.clearTimeout(t);
    };
  }, [script]);

  const vars = {
    "--pl-bg": theme.bg,
    "--pl-ink": theme.ink,
    "--pl-muted": theme.muted,
    "--pl-accent": theme.accent,
    "--pl-script": script,
  } as CSSProperties;

  return (
    <div
      className={`pl-screen ${leaving ? "pl-leave" : ""} ${font ? "pl-font" : ""}`}
      style={vars}
      role="status"
    >
      <svg className="pl-heart" viewBox="0 0 32 29" aria-hidden="true">
        <path d="M16 28C-6 14 2-2 16 6.5 30-2 38 14 16 28Z" />
      </svg>
      {names && (
        <p className="pl-names">
          <span>{names[0]}</span>
          <span>&amp; {names[1]}</span>
        </p>
      )}
      <p className="pl-caps">Đang mở thiệp</p>
      <div className="pl-bar">
        <i style={{ width: `${Math.round((progress ?? 0.08) * 100)}%` }} />
      </div>
      {progress !== undefined && (
        <p className="pl-pct">{Math.round(progress * 100)}%</p>
      )}
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
  // before the first paint, so the screen never shows in the default colours first
  const [theme, setTheme] = useState<Theme>();
  useLayoutEffect(() => setTheme(readTheme()), []);
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
      const page = templatePage() ?? document.body;
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
  if (!theme) return null;
  const shown = phase === "leave" ? 1 : Math.max(progress, creep);
  return (
    <LoadingScreen
      theme={theme}
      names={names}
      progress={shown}
      leaving={phase === "leave"}
    />
  );
};

export default Preloader;
