import { Heart } from "lucide-react";

const HEART_COUNT = 14;

const hearts = Array.from({ length: HEART_COUNT }, (_, index) => ({
  id: index,
  left: `${(index * 73) % 100}%`,
  delay: `${(index * 0.9) % 8}s`,
  duration: `${8 + (index % 5) * 1.6}s`,
  size: 10 + (index % 4) * 4,
}));

const FallingHearts = () => (
  <div className="wd-hearts" aria-hidden="true">
    {hearts.map(({ id, left, delay, duration, size }) => (
      <Heart
        key={id}
        width={size}
        height={size}
        strokeWidth={0}
        fill="currentColor"
        style={{ left, animationDelay: delay, animationDuration: duration }}
      />
    ))}
  </div>
);

export default FallingHearts;
