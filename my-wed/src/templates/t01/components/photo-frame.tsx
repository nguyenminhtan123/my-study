import { ReactNode } from "react";

import { useReveal } from "@/core/hooks/use-reveal";
import { PhotoSlot } from "@/core/types";
import { buildPlaceholder } from "@/core/utils/wedding";

interface PhotoFrameProps {
  photo: PhotoSlot;
  className?: string;
  children?: ReactNode;
}

const PhotoFrame = ({ photo, className = "", children }: PhotoFrameProps) => {
  const { ref, revealed } = useReveal<HTMLElement>();

  return (
    <figure
      ref={ref}
      className={`wd-photo ${revealed ? "wd-in" : ""} ${className}`}
      style={{ aspectRatio: photo.ratio }}
    >
      <img
        alt={photo.label}
        src={photo.src || buildPlaceholder(photo.label, photo.ratio)}
      />
      {children}
    </figure>
  );
};

export default PhotoFrame;
