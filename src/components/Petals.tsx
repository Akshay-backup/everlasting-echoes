import { useMemo } from "react";
import petal from "@/assets/petal.png";

export function Petals({ count = 14 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const left = Math.random() * 100;
        const size = 14 + Math.random() * 28;
        const delay = Math.random() * -22;
        const duration = 14 + Math.random() * 16;
        const drift = (Math.random() - 0.5) * 220;
        const opacity = 0.35 + Math.random() * 0.45;
        return { i, left, size, delay, duration, drift, opacity };
      }),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {items.map((p) => (
        <img
          key={p.i}
          src={petal}
          alt=""
          aria-hidden
          className="absolute will-change-transform"
          style={{
            top: 0,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            // CSS variable used by keyframes
            ["--drift" as string]: `${p.drift}px`,
            animation: `float-petal ${p.duration}s linear ${p.delay}s infinite`,
            filter: "drop-shadow(0 6px 8px rgba(0,0,0,0.15))",
          }}
        />
      ))}
    </div>
  );
}
