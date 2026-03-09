"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface ScrollVideoProps {
  /** Path to the video file in the public directory */
  src: string;
  /** Height of the scroll zone as a multiple of viewport height (default: 5) */
  scrollHeightMultiplier?: number;
  /** Optional className for the outer wrapper */
  className?: string;
  /** Optional: content to overlay on top of the video */
  children?: React.ReactNode;
}

export default function ScrollVideo({
  src,
  scrollHeightMultiplier = 5,
  className = "",
  children,
}: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const rafIdRef = useRef<number | null>(null);

  // ─── Preload video metadata and buffer ───
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure the video is fully loaded for scrubbing
    const handleLoadedMetadata = () => {
      // Try to buffer the whole video
      video.currentTime = 0;
    };

    const handleSeeked = () => {
      if (!isVideoReady) {
        setIsVideoReady(true);
      }
    };

    // When enough data is available for smooth playback
    const handleCanPlayThrough = () => {
      setIsVideoReady(true);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("canplaythrough", handleCanPlayThrough);

    // Force load
    video.load();

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
    };
  }, [src]);

  // ─── Scroll-driven scrubbing logic ───
  const handleScroll = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      const container = containerRef.current;
      const video = videoRef.current;
      if (!container || !video || !video.duration) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far through the scroll zone we are
      // When container top hits viewport bottom → progress = 0
      // When container bottom hits viewport top → progress = 1
      const scrollableDistance = rect.height - windowHeight;
      const scrolled = -rect.top;
      const rawProgress = scrolled / scrollableDistance;

      // Clamp between 0 and 1
      const progress = Math.min(Math.max(rawProgress, 0), 1);

      // Map progress to video time
      const targetTime = progress * video.duration;

      // Only seek if the difference is meaningful (avoids redundant seeks)
      if (Math.abs(video.currentTime - targetTime) > 0.01) {
        video.currentTime = targetTime;
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial position check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleScroll]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: `${scrollHeightMultiplier * 100}vh` }}
      data-scroll-video-container
    >
      {/* Sticky container that keeps the video centered while scrolling */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        {/* Loading state */}
        {!isVideoReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-neutral-700 border-t-gold rounded-full animate-spin" />
              <p className="text-sm text-gold font-medium tracking-wide uppercase">
                Preparing Experience...
              </p>
            </div>
          </div>
        )}

        {/* The video element — never plays, only scrubbed via currentTime */}
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover md:object-contain"
          style={{
            opacity: isVideoReady ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />

        {/* Optional overlay content (headings, CTAs, etc.) */}
        {children && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
