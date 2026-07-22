"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    const isMobile =
      window.innerWidth < 768 || "ontouchstart" in window;
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    (window as unknown as Record<string, unknown>).__lenis = lenis;

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      delete (window as unknown as Record<string, unknown>).__lenis;
      lenis.destroy();
    };
  }, []);

  return null;
}
