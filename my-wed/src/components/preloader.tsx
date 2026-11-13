import { CSSProperties, useEffect, useLayoutEffect, useRef, useState } from "react";

import butterfly from "@/static/t33/butterfly.webp";
import { cornerBl, cornerTr } from "@/components/meadow-corners";
import meadowPoster from "@/static/t33/meadow-poster.webp";

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
  /** a second accent, a gold, and the small-caps font, for the templates that dress the screen in their own look */
  accent2?: string;
  gold?: string;
  caps?: string;
  /** "meadow": the screen in the Nắng đồng hoa look (see the .pl-meadow styles) */
  loader?: string;
  /** stop at an "Mở thiệp" button once loaded: the guest's tap lets iPhone play the template's video */
  tap?: boolean;
};

const DEFAULT_SCRIPT = '"Great Vibes", cursive';

/**
 * The template's page. While the router slides it in, the page we came from (the gallery) is still in
 * the document, after it.
 */
const templatePage = () =>
  Array.from(document.querySelectorAll(".zaui-page")).find(
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
    accent2: get("--k-accent2"),
    gold: get("--gold"),
    caps: get("--caps"),
    loader: get("--k-loader"),
    tap: get("--k-tap") === "1",
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
  ready = false,
  onOpen,
  theme = {},
}: {
  /** groom and bride */
  names?: [string, string];
  /** 0..1, or undefined while there is nothing to count yet */
  progress?: number;
  leaving?: boolean;
  /** loaded, waiting for the guest's tap on the button (only the meadow look has one) */
  ready?: boolean;
  onOpen?: () => void;
  theme?: Theme;
}) => {
  const script = theme.script ?? DEFAULT_SCRIPT;
  // the names wait for their handwriting font, so they never flash up in a plain one first
  const [font, setFont] = useState(false);
  const caps = theme.caps;
  const meadow = theme.loader === "meadow";
  const nameText = names ? `${names[0]} & ${names[1]}` : " ";
  useEffect(() => {
    let alive = true;
    setFont(false);
    const show = () => alive && setFont(true);
    // load() with no text only fetches the Latin glyphs: name the real text, so the Vietnamese-only letters
    // (ọ ư ơ đ ạ ...) come from the handwriting font too, not a plain fallback
    const loads = [document.fonts.load(`40px ${script}`, nameText)];
    // the meadow look also shows its small-caps text at once, so that font is awaited as well
    if (meadow && caps) loads.push(document.fonts.load(`500 12px ${caps}`, "Thiệp mời cưới Đang mở thiệp · 0123456789"));
    Promise.all(loads).then(show, show);
    const t = window.setTimeout(show, 1500);
    return () => {
      alive = false;
      window.clearTimeout(t);
    };
  }, [script, nameText, meadow, caps]);

  const vars = {
    "--pl-bg": theme.bg,
    "--pl-ink": theme.ink,
    "--pl-muted": theme.muted,
    "--pl-accent": theme.accent,
    "--pl-script": script,
    "--pl-accent2": theme.accent2,
    "--pl-gold": theme.gold,
    "--pl-caps": theme.caps,
  } as CSSProperties;

  if (theme.loader === "meadow") {
    const pct = Math.round((progress ?? 0.08) * 100);
    return (
      <div
        className={`pl-screen pl-meadow ${leaving ? "pl-leave" : ""} ${font ? "pl-font" : ""} ${ready ? "pl-ready" : ""}`}
        style={vars}
        role="status"
      >
        {/* the meadow, soft behind frosted glass; it clears as the card opens */}
        <div className="pl-m-bg" style={{ backgroundImage: `url(${meadowPoster})` }} />
        <div className="pl-m-veil" />
        <div className="pl-m-card">
          <img className="pl-m-corner pl-m-tr" src={cornerTr} alt="" />
          <img className="pl-m-corner pl-m-bl" src={cornerBl} alt="" />
          <p className="pl-m-kicker">Thiệp mời cưới</p>
          {names && (
            <p className="pl-m-names">
              <span>{names[0]}</span>
              <span>
                <i>&amp;</i>
                {names[1]}
              </span>
            </p>
          )}
          <div className="pl-m-act">
            <div className="pl-m-meter" style={{ "--p": `${pct}%` } as CSSProperties}>
              <div className="pl-m-line">
                <i />
              </div>
              <img className="pl-m-fly" src={butterfly} alt="" />
              <p className="pl-m-pct">Đang mở thiệp{progress !== undefined ? ` · ${pct}%` : ""}</p>
            </div>
            {onOpen && (
              <button type="button" className="pl-m-btn" onClick={onOpen}>
                <svg viewBox="0 0 32 29" aria-hidden="true">
                  <path d="M16 28C-6 14 2-2 16 6.5 30-2 38 14 16 28Z" />
                </svg>
                Mở thiệp
              </button>
            )}
          </div>
        </div>
        <img className="pl-m-flight" src={butterfly} alt="" />
      </div>
    );
  }

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

const urlsIn = (value: string) => {
  const found: string[] = [];
  const re = /url\(["']?([^"')]+)["']?\)/g;
  for (let m = re.exec(value); m; m = re.exec(value)) {
    if (!m[1].startsWith("data:")) found.push(m[1]);
  }
  return found;
};

const loadImage = (src: string) =>
  new Promise<void>((done) => {
    const img = new Image();
    img.onload = img.onerror = () => done();
    img.src = src;
  });

/**
 * Waits a little for the template's video to show its first frame (at most VIDEO_WAIT), without
 * touching the element: the template starts it itself. iPhone often loads nothing before play
 * starts, so the screen must not sit waiting the full MAX_WAIT for it.
 */
const VIDEO_WAIT = 2500;
const videoReady = (video: HTMLVideoElement) =>
  new Promise<void>((done) => {
    if (!video.getAttribute("src") || video.readyState >= 2 || !video.paused) return done();
    for (const ev of ["loadeddata", "playing", "canplay", "error"]) {
      video.addEventListener(ev, () => done(), { once: true });
    }
    window.setTimeout(done, VIDEO_WAIT);
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
  const themeRef = useRef<Theme>();
  useLayoutEffect(() => {
    const read = readTheme();
    themeRef.current = read;
    setTheme(read);
  }, []);
  // the bar creeps on by itself too (toward 90%), so it never sits still while a big file loads
  const [creep, setCreep] = useState(0);
  const [phase, setPhase] = useState<"wait" | "ready" | "leave" | "gone">("wait");

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
      page.querySelectorAll("*").forEach((el) => {
        for (const pseudo of [null, "::before", "::after"]) {
          const bg = getComputedStyle(el, pseudo).backgroundImage;
          if (bg && bg !== "none") urlsIn(bg).forEach((u) => images.add(u));
        }
      });
      const tasks = [
        ...[...images].map(loadImage),
        ...Array.from(page.querySelectorAll("video")).map(videoReady),
      ];
      let done = 0;
      const tick = () =>
        alive && setProgress(tasks.length ? done / tasks.length : 1);
      tasks.forEach((t) => t.then(() => (done++, tick())));
      tick();
      const finish = () => {
        if (!alive) return;
        window.setTimeout(
          // iPhone: stop at the button, the tap is what lets the video play
          () => alive && setPhase(themeRef.current?.tap ? "ready" : "leave"),
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
    // the meadow look lets its butterfly finish crossing the screen
    const t = window.setTimeout(() => setPhase("gone"), themeRef.current?.loader === "meadow" ? 2500 : 600);
    return () => window.clearTimeout(t);
  }, [phase]);

  // the guest's tap: iPhone lets the template's videos play from here on, so start them inside this tap
  const open = () => {
    const page = templatePage() ?? document.body;
    page.querySelectorAll("video").forEach((v) => {
      v.muted = true;
      v.play().catch(() => {});
    });
    setPhase("leave");
  };

  if (phase === "gone") return null;
  if (!theme) return null;
  const shown = phase === "wait" ? Math.max(progress, creep) : 1;
  return (
    <LoadingScreen
      theme={theme}
      names={names}
      progress={shown}
      leaving={phase === "leave"}
      ready={phase === "ready"}
      onOpen={phase === "ready" ? open : undefined}
    />
  );
};

export default Preloader;
