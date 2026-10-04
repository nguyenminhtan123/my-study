import { useId } from "react";

// One petal: a pointed teardrop pivoting around its base at (0,0), pointing up.
const petal = (len: number, wid: number) =>
  `M0 0 C${-wid} ${-len * 0.28} ${-wid * 0.72} ${-len * 0.82} 0 ${-len} ` +
  `C${wid * 0.72} ${-len * 0.82} ${wid} ${-len * 0.28} 0 0Z`;

interface Row {
  angles: number[];
  len: number;
  wid: number;
  shade: "back" | "mid" | "front";
}

const ROWS: Row[] = [
  { angles: [-52, -26, 0, 26, 52], len: 74, wid: 20, shade: "back" },
  { angles: [-70, -38, -12, 12, 38, 70], len: 64, wid: 19, shade: "mid" },
  { angles: [-42, -14, 14, 42], len: 52, wid: 18, shade: "front" },
];

/** Layered lotus bloom with blush tips, veins, stamens, a leaf and water ripples. */
export const LotusArt = ({ className = "" }: { className?: string }) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg className={className} viewBox="0 0 240 190" aria-hidden="true">
      <defs>
        {(["back", "mid", "front"] as const).map((shade) => (
          <linearGradient
            key={shade}
            id={`${id}-${shade}`}
            x1="0"
            y1="1"
            x2="0"
            y2="0"
          >
            <stop
              offset="0"
              stopColor={shade === "back" ? "#f3e4e6" : "#fbf4f4"}
            />
            <stop
              offset="0.55"
              stopColor={shade === "front" ? "#ffffff" : "#fdf1f2"}
            />
            <stop
              offset="1"
              stopColor={shade === "back" ? "#e7a3b5" : "#f2b9c8"}
            />
          </linearGradient>
        ))}
        <radialGradient id={`${id}-leaf`} cx="0.5" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#8fbf85" />
          <stop offset="1" stopColor="#4f8a54" />
        </radialGradient>
        <radialGradient id={`${id}-core`} cx="0.5" cy="0.5" r="0.6">
          <stop offset="0" stopColor="#f6e27a" />
          <stop offset="1" stopColor="#d9b840" />
        </radialGradient>
      </defs>

      {/* water ripples */}
      <g fill="none" stroke="#9cc3d1" strokeWidth="1" opacity="0.55">
        <ellipse cx="120" cy="170" rx="92" ry="12" />
        <ellipse cx="120" cy="172" rx="64" ry="8" />
      </g>

      {/* leaf */}
      <g transform="translate(120 160)">
        <ellipse rx="86" ry="15" fill={`url(#${id}-leaf)`} opacity="0.95" />
        <g stroke="#3f7a47" strokeWidth="0.8" opacity="0.5">
          {[-70, -48, -24, 0, 24, 48, 70].map((x) => (
            <path key={x} d={`M0 0 L${x} ${x > 0 ? 3 : 3}`} />
          ))}
        </g>
      </g>

      {/* flower */}
      <g transform="translate(120 150)">
        {ROWS.map((row, r) => (
          <g key={r}>
            {row.angles.map((angle) => (
              <g key={angle} transform={`rotate(${angle})`}>
                <path
                  d={petal(row.len, row.wid)}
                  fill={`url(#${id}-${row.shade})`}
                  stroke="#e8b4c1"
                  strokeWidth="0.7"
                  opacity={row.shade === "back" ? 0.96 : 1}
                />
                <path
                  d={`M0 -4 C-1 ${-row.len * 0.4} 1 ${-row.len * 0.7} 0 ${-row.len * 0.9}`}
                  fill="none"
                  stroke="#e9bfca"
                  strokeWidth="0.6"
                />
              </g>
            ))}
            {r === 0 && (
              <g>
                {/* seed pod and stamens sit between the back and mid petals */}
                <ellipse
                  cx="0"
                  cy="-16"
                  rx="9"
                  ry="7"
                  fill={`url(#${id}-core)`}
                />
                {[-18, -10, -3, 3, 10, 18].map((x, i) => (
                  <g key={x}>
                    <line
                      x1={x * 0.4}
                      y1="-14"
                      x2={x * 1.3}
                      y2={-28 - (i % 2) * 3}
                      stroke="#e8cd62"
                      strokeWidth="1"
                    />
                    <circle
                      cx={x * 1.3}
                      cy={-28 - (i % 2) * 3}
                      r="1.7"
                      fill="#f0cf4a"
                    />
                  </g>
                ))}
              </g>
            )}
          </g>
        ))}
      </g>
    </svg>
  );
};
