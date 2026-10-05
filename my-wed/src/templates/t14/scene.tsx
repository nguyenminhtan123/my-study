import { CSSProperties } from "react";

/** Arch with a flower garland. Flowers are placed along the arc so every arch looks hand-dressed. */
export const FlowerArch = ({ seed = 0 }: { seed?: number }) => {
  const flowers = Array.from({ length: 26 }, (_, i) => {
    const t = i / 25;
    const a = Math.PI * (1 - t);
    const x = 160 + Math.cos(a) * 128;
    const y = 160 - Math.sin(a) * 128;
    const r = 7 + ((i * 7 + seed * 3) % 6);
    const tone = ["#ffffff", "#f6d6dc", "#f0c2cc", "#fbeee6"][(i + seed) % 4];
    return { x, y, r, tone, k: i };
  });
  return (
    <svg viewBox="0 0 320 480" aria-hidden="true">
      <defs>
        <linearGradient id={`t14-pil-${seed}`} x1="0" x2="1">
          <stop offset="0" stopColor="#e9dcc7" />
          <stop offset="0.5" stopColor="#fffaf1" />
          <stop offset="1" stopColor="#d9c8ad" />
        </linearGradient>
      </defs>
      {/* pillars */}
      <rect
        x="18"
        y="160"
        width="28"
        height="320"
        fill={`url(#t14-pil-${seed})`}
        stroke="#c9a96e"
        strokeWidth="1.2"
      />
      <rect
        x="274"
        y="160"
        width="28"
        height="320"
        fill={`url(#t14-pil-${seed})`}
        stroke="#c9a96e"
        strokeWidth="1.2"
      />
      {/* arch */}
      <path
        d="M32 162 A128 128 0 0 1 288 162"
        fill="none"
        stroke="#fffaf1"
        strokeWidth="16"
      />
      <path
        d="M32 162 A128 128 0 0 1 288 162"
        fill="none"
        stroke="#c9a96e"
        strokeWidth="1.2"
      />
      {/* greenery */}
      {flowers.map((f) => (
        <ellipse
          key={`l${f.k}`}
          cx={f.x + ((f.k % 2) * 2 - 1) * 9}
          cy={f.y + 4}
          rx="9"
          ry="4"
          fill="#7d9a6e"
          opacity="0.85"
          transform={`rotate(${f.k * 23} ${f.x} ${f.y})`}
        />
      ))}
      {/* flowers */}
      {flowers.map((f) => (
        <g key={f.k}>
          <circle
            cx={f.x}
            cy={f.y}
            r={f.r}
            fill={f.tone}
            stroke="#e7b9c3"
            strokeWidth="0.6"
          />
          <circle
            cx={f.x}
            cy={f.y}
            r={f.r * 0.45}
            fill="#f3c4cd"
            opacity="0.7"
          />
        </g>
      ))}
      {/* hanging flowers down the pillars */}
      {[0, 1, 2, 3].map((i) => (
        <g key={`h${i}`}>
          <circle
            cx="32"
            cy={190 + i * 26}
            r={8 - i}
            fill="#fbeee6"
            stroke="#e7b9c3"
            strokeWidth="0.6"
          />
          <circle
            cx="288"
            cy={190 + i * 26}
            r={8 - i}
            fill="#fbeee6"
            stroke="#e7b9c3"
            strokeWidth="0.6"
          />
        </g>
      ))}
    </svg>
  );
};

/** Rotating gold ring built from thin segments arranged in a circle in 3D. */
export const Ring3D = () => (
  <div className="t14-ring" aria-hidden="true">
    <div className="t14-ring-spin">
      {Array.from({ length: 36 }, (_, i) => (
        <span key={i} style={{ "--a": `${i * 10}deg` } as CSSProperties} />
      ))}
      <i className="t14-diamond" />
    </div>
  </div>
);

/** Back-lit silhouettes of the couple facing each other, hands meeting at the centre. */
export const Couple = () => (
  <svg className="t14-couple" viewBox="0 0 400 380" aria-hidden="true">
    <defs>
      <linearGradient id="t14-sil" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3a2430" />
        <stop offset="1" stopColor="#1d1218" />
      </linearGradient>
      <linearGradient id="t14-veil" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
        <stop offset="1" stopColor="#fff" stopOpacity="0.05" />
      </linearGradient>
      <filter id="t14-rim" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2.4" result="b" />
        <feFlood floodColor="#ffd79a" floodOpacity="0.9" />
        <feComposite in2="b" operator="in" result="g" />
        <feMerge>
          <feMergeNode in="g" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#t14-rim)" fill="url(#t14-sil)">
      {/* groom (left, facing right) */}
      <circle cx="128" cy="76" r="20" />
      <path d="M109 70 C108 52 136 46 148 60 C144 56 130 56 118 60 C113 63 110 66 109 70Z" />
      <path d="M121 94 L135 94 L137 106 L119 106Z" />
      <path d="M98 114 C104 104 116 101 128 102 C140 101 152 104 158 114 L161 158 L157 210 L148 214 L147 362 L130 362 L128 244 L125 362 L108 362 L107 214 L98 210 L95 158Z" />
      <path d="M152 120 C166 138 180 152 196 164 C198 167 197 171 193 172 C176 164 160 150 145 134Z" />
      <path d="M100 120 C96 150 98 178 104 200 L110 198 C106 176 106 150 108 124Z" />
      {/* bride (right, facing left) */}
      <circle cx="268" cy="86" r="18" />
      <circle cx="283" cy="74" r="9" />
      <path d="M252 80 C250 62 282 58 288 76 C290 88 286 98 280 104 C284 92 280 82 270 78 C262 77 256 78 252 80Z" />
      <path d="M262 102 L276 102 L278 114 L260 114Z" />
      <path d="M249 118 C257 110 283 110 291 118 L288 150 C286 158 282 164 279 168 C298 214 322 292 350 362 L192 362 C216 292 240 214 259 168 C256 164 252 158 250 150Z" />
      <path d="M254 126 C238 144 222 156 206 164 C203 166 203 170 206 172 C226 166 244 154 262 138Z" />
    </g>
    {/* veil */}
    <path
      d="M276 70 C320 90 340 180 360 330 C330 260 300 170 270 96Z"
      fill="url(#t14-veil)"
    />
  </svg>
);
