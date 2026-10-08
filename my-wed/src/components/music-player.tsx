import { useEffect, useRef, useState } from "react";

import { musicUrl } from "@/core/music";

// Whether the viewer switched the music off; kept across previews so it stays off while browsing.
let mutedByViewer = false;

const Note = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M9 18V6l10-2v12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="6.5" cy="18" r="2.5" fill="currentColor" />
    <circle cx="16.5" cy="16" r="2.5" fill="currentColor" />
  </svg>
);

/**
 * Round floating disc that plays the invitation's song. Phones only allow sound after a tap, so
 * the song starts on the viewer's first tap anywhere (unless they turned it off before); it pauses
 * while the app is in the background and stops when the page closes.
 */
const MusicPlayer = ({ song }: { song?: string }) => {
  const url = musicUrl(song);
  const audio = useRef<HTMLAudioElement | null>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!url) return;
    const el = new Audio(url);
    el.loop = true;
    el.preload = "auto";
    audio.current = el;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);

    // fade in where the browser lets us set the volume (iOS ignores it and plays at full volume)
    let fade = 0;
    const start = () => {
      if (mutedByViewer || !el.paused) return;
      el.volume = 0;
      el.play()
        .then(() => {
          window.clearInterval(fade);
          fade = window.setInterval(() => {
            el.volume = Math.min(1, el.volume + 0.05);
            if (el.volume >= 1) window.clearInterval(fade);
          }, 80);
          stopListening();
        })
        .catch(() => {
          el.volume = 1; // blocked: wait for the next tap
        });
    };
    const onGesture = (event: Event) => {
      // a tap on the disc itself is handled by its own toggle
      if (button.current?.contains(event.target as Node)) return;
      start();
    };
    const gestures = ["touchend", "click", "keydown"];
    const stopListening = () =>
      gestures.forEach((g) => document.removeEventListener(g, onGesture, true));
    gestures.forEach((g) => document.addEventListener(g, onGesture, true));

    let resumeOnReturn = false;
    const onVisibility = () => {
      if (document.hidden) {
        resumeOnReturn = !el.paused;
        el.pause();
      } else if (resumeOnReturn) {
        el.play().catch(() => undefined);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stopListening();
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearInterval(fade);
      el.pause();
      el.removeAttribute("src");
      el.load();
      audio.current = null;
    };
  }, [url]);

  if (!url) return null;

  const toggle = () => {
    const el = audio.current;
    if (!el) return;
    if (el.paused) {
      mutedByViewer = false;
      el.volume = 1;
      el.play().catch(() => undefined);
    } else {
      mutedByViewer = true;
      el.pause();
    }
  };

  return (
    <button
      ref={button}
      type="button"
      className={`gl-music ${playing ? "gl-music-on" : ""}`}
      aria-label={playing ? "Tắt nhạc" : "Bật nhạc"}
      aria-pressed={playing}
      onClick={toggle}
    >
      <span className="gl-music-disc" aria-hidden="true" />
      <Note />
    </button>
  );
};

export default MusicPlayer;
