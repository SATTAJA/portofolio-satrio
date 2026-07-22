"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = ".:",
  className = "",
  style = {},
  children,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const split = SplitText.create(rootRef.current.querySelector("p"), {
      type: "chars",
      charsClass: "inline-block will-change-transform",
    });

    split.chars.forEach((el) => {
      const c = el as HTMLElement;
      gsap.set(c, { attr: { "data-content": c.innerHTML } });
    });

    let rafId = 0;
    let lastTime = 0;
    const THROTTLE_MS = 32;

    const handleMove = (e: PointerEvent) => {
      const now = e.timeStamp;
      if (now - lastTime < THROTTLE_MS) return;
      lastTime = now;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const cx = e.clientX;
        const cy = e.clientY;
        split.chars.forEach((el) => {
          const c = el as HTMLElement;
          const { left, top, width, height } = c.getBoundingClientRect();
          const dx = cx - (left + width / 2);
          const dy = cy - (top + height / 2);
          const dist = Math.hypot(dx, dy);

          if (dist < radius) {
            gsap.to(c, {
              overwrite: true,
              duration: duration * (1 - dist / radius),
              scrambleText: {
                text: c.dataset.content || "",
                chars: scrambleChars,
                speed,
              },
              ease: "none",
            });
          }
        });
      });
    };

    const el = rootRef.current;
    el.addEventListener("pointermove", handleMove, { passive: true });

    return () => {
      el.removeEventListener("pointermove", handleMove);
      if (rafId) cancelAnimationFrame(rafId);
      split.revert();
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div
      ref={rootRef}
      className={`font-mono text-gray-400 mt-2 sm:-mr-20 ${className}`}
      style={style}
    >
      <p>{children}</p>
    </div>
  );
};

export default ScrambledText;
