import { ReactNode } from "react";

import { useReveal } from "@/hooks/use-reveal";

export type RevealVariant = "up" | "left" | "right" | "zoom";

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  immediate?: boolean;
  className?: string;
}

const Reveal = ({
  children,
  variant = "up",
  delay = 0,
  immediate = false,
  className = "",
}: RevealProps) => {
  const { ref, revealed } = useReveal<HTMLDivElement>(immediate);

  return (
    <div
      ref={ref}
      className={`wd-reveal wd-reveal-${variant} ${revealed ? "wd-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default Reveal;
