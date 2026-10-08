export interface Countdown {
  days: string;
  hours: string;
  minutes: string;
}

const pad = (value: number) => String(value).padStart(2, "0");

export const computeCountdown = (
  targetMs: number,
  nowMs: number,
): Countdown => {
  const totalSeconds = Math.max(0, Math.floor((targetMs - nowMs) / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const remainder = totalSeconds % 86400;
  return {
    days: String(days),
    hours: pad(Math.floor(remainder / 3600)),
    minutes: pad(Math.floor((remainder % 3600) / 60)),
  };
};

export const buildPlaceholder = (label: string, ratio: string) => {
  const [w, h] = ratio.split("/").map(Number);
  const width = 600;
  const height = Math.round((width * h) / w);
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'>` +
    `<rect width='${width}' height='${height}' fill='#CDB8AB'/>` +
    `<circle cx='${width * 0.2}' cy='${height * 0.22}' r='${width * 0.16}' fill='#E8D9CF' opacity='.4'/>` +
    `<circle cx='${width * 0.82}' cy='${height * 0.5}' r='${width * 0.2}' fill='#E8D9CF' opacity='.4'/>` +
    `<circle cx='${width * 0.3}' cy='${height * 0.82}' r='${width * 0.14}' fill='#E8D9CF' opacity='.4'/>` +
    `<text x='${width / 2}' y='${height / 2}' text-anchor='middle' font-family='sans-serif' font-size='24' fill='#FBF8F6'>${label}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const copyText = async (text: string): Promise<boolean> => {
  if (!navigator.clipboard) return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};
