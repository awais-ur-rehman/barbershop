"use client";

import { useEffect, useState } from "react";

interface ScrollTextProps {
  /** When this text should appear (0 = start, 1 = end of scroll zone) */
  appearAt: number;
  /** When this text should disappear */
  disappearAt: number;
  children: React.ReactNode;
  className?: string;
  side?: "left" | "right" | "center";
}

export default function ScrollText({
  appearAt,
  disappearAt,
  children,
  className = "",
  side = "center",
}: ScrollTextProps) {
  const [opacity, setOpacity] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Find the scroll video container (the tall element)
      const container = document.querySelector("[data-scroll-video-container]");
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableDistance = rect.height - windowHeight;
      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);

      // Calculate fade in/out
      const fadeInStart = appearAt;
      const fadeInEnd = appearAt + 0.05; // Slower fade in
      const fadeOutStart = disappearAt - 0.05;
      const fadeOutEnd = disappearAt;

      let newOpacity = 0;
      const offset = side === "left" ? -50 : side === "right" ? 50 : 0;
      let newTranslateX = offset;

      if (progress >= fadeInStart && progress <= fadeInEnd) {
        // Fading in
        const fadeProgress =
          (progress - fadeInStart) / (fadeInEnd - fadeInStart);
        newOpacity = fadeProgress;
        newTranslateX = offset * (1 - fadeProgress);
      } else if (progress > fadeInEnd && progress < fadeOutStart) {
        // Fully visible
        newOpacity = 1;
        newTranslateX = 0;
      } else if (progress >= fadeOutStart && progress <= fadeOutEnd) {
        // Fading out
        const fadeProgress =
          (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
        newOpacity = 1 - fadeProgress;
        newTranslateX =
          side === "left"
            ? -20 * fadeProgress
            : side === "right"
              ? 20 * fadeProgress
              : 0;
      }

      setOpacity(newOpacity);
      setTranslateX(newTranslateX);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [appearAt, disappearAt, side]);

  const sideClasses = {
    left: "left-12 md:left-24 top-1/2 -translate-y-1/2 items-start text-left",
    right: "right-12 md:right-24 top-1/2 -translate-y-1/2 items-end text-right",
    center:
      "left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 items-center text-center",
  };

  return (
    <div
      className={`absolute flex flex-col pointer-events-none max-w-sm md:max-w-md ${sideClasses[side]} ${className}`}
      style={{
        opacity,
        transform: `translate(${translateX}px, -50%)`,
        transition: "none",
      }}
    >
      {children}
    </div>
  );
}
