import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

export type RevealVariant = "up" | "left" | "right" | "zoom" | "fade";

/** Fades/slides its children in the first time they scroll into view. */
export const Reveal = ({
  children,
  variant = "up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`k-reveal k-${variant} ${shown ? "k-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export type PetalKind = "petal" | "leaf" | "heart" | "sparkle" | "bubble";

const SHAPES: Record<PetalKind, ReactNode> = {
  petal: <path d="M10 1C16 6 16 15 10 19C4 15 4 6 10 1Z" />,
  leaf: <path d="M10 1C18 6 18 15 10 19C2 15 2 6 10 1ZM10 3V19" />,
  heart: <path d="M10 18C-4 8 4 -2 10 5C16 -2 24 8 10 18Z" />,
  sparkle: <path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8Z" />,
  bubble: <circle cx="10" cy="10" r="8" />,
};

/** Soft decorative particles that drift down (or up for bubbles). Deterministic, no randomness. */
export const Drifters = ({
  kind = "petal",
  count = 14,
  color = "#ffffff",
  opacity = 0.7,
}: {
  kind?: PetalKind;
  count?: number;
  color?: string;
  opacity?: number;
}) => (
  <div className={`k-drift k-drift-${kind}`} aria-hidden="true">
    {Array.from({ length: count }, (_, i) => {
      const style = {
        left: `${(i * 37 + 11) % 100}%`,
        width: `${10 + ((i * 7) % 12)}px`,
        animationDuration: `${9 + ((i * 5) % 8)}s`,
        animationDelay: `${-((i * 3.3) % 14)}s`,
        "--sway": `${((i % 2) * 2 - 1) * (18 + ((i * 11) % 30))}px`,
        "--spin": `${(i % 2 ? 1 : -1) * (120 + ((i * 29) % 240))}deg`,
        opacity,
        fill: kind === "leaf" ? "none" : color,
        stroke: color,
      } as CSSProperties;
      return (
        <svg key={i} viewBox="0 0 20 20" style={style}>
          {SHAPES[kind]}
        </svg>
      );
    })}
  </div>
);

/** Ticks once per second so a countdown can show seconds. */
export const useSeconds = (targetISO: string) => {
  const target = new Date(targetISO).getTime();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  const total = Math.max(0, Math.floor((target - now) / 1000));
  const pad = (v: number) => String(v).padStart(2, "0");
  return {
    days: String(Math.floor(total / 86400)),
    hours: pad(Math.floor((total % 86400) / 3600)),
    minutes: pad(Math.floor((total % 3600) / 60)),
    seconds: pad(total % 60),
  };
};
