import { useEffect, useState } from "react";

import { Countdown, computeCountdown } from "@/core/utils/wedding";

const REFRESH_INTERVAL_MS = 30000;

export const useCountdown = (targetISO: string): Countdown => {
  const targetMs = new Date(targetISO).getTime();
  const [countdown, setCountdown] = useState(() =>
    computeCountdown(targetMs, Date.now()),
  );

  useEffect(() => {
    const timer = setInterval(
      () => setCountdown(computeCountdown(targetMs, Date.now())),
      REFRESH_INTERVAL_MS,
    );
    return () => clearInterval(timer);
  }, [targetMs]);

  return countdown;
};
