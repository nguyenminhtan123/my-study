import { createContext, useContext, useEffect, useRef, useState } from "react";

const REVEAL_THRESHOLD = 0.2;
const REVEAL_ROOT_MARGIN = "0px 0px -18% 0px";

export const RevealContext = createContext(true);

export const useReveal = <T extends HTMLElement>(immediate = false) => {
  const ref = useRef<T>(null);
  const enabled = useContext(RevealContext);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!enabled) return undefined;
    if (immediate) {
      setRevealed(true);
      return undefined;
    }
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: REVEAL_THRESHOLD, rootMargin: REVEAL_ROOT_MARGIN },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [enabled, immediate]);

  return { ref, revealed };
};
