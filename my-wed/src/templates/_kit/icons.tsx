import { ReactNode } from "react";

const Svg = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="0 0 48 48"
    width="40"
    height="40"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const IconCar = () => (
  <Svg>
    <path d="M8 30l3-9a3 3 0 012.8-2h20.4a3 3 0 012.8 2l3 9v6H8z" />
    <circle cx="15" cy="36" r="3" />
    <circle cx="33" cy="36" r="3" />
    <path d="M12 26h24" />
  </Svg>
);
export const IconCamera = () => (
  <Svg>
    <rect x="6" y="14" width="36" height="25" rx="4" />
    <circle cx="24" cy="26" r="7" />
    <path d="M17 14l2-5h10l2 5" />
  </Svg>
);
export const IconRings = () => (
  <Svg>
    <circle cx="18" cy="29" r="9" />
    <circle cx="30" cy="29" r="9" />
    <path d="M14 14l4-5 4 5-4 4z" />
  </Svg>
);
export const IconDinner = () => (
  <Svg>
    <path d="M14 6v14a4 4 0 004 4v18M10 6v10M18 6v10M34 6c-4 4-5 10-5 16h5v20" />
  </Svg>
);
export const IconMusic = () => (
  <Svg>
    <path d="M18 34V10l20-4v24" />
    <circle cx="13" cy="35" r="5" />
    <circle cx="33" cy="31" r="5" />
  </Svg>
);
export const IconPin = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export const TIMELINE_ICONS = [
  IconCar,
  IconRings,
  IconDinner,
  IconMusic,
] as const;
