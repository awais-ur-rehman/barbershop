"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

interface ScrollCanvasProps {
  /** Height of the scroll zone as a multiple of viewport height (default: 5) */
  scrollHeightMultiplier?: number;
  /** Optional className for the outer wrapper */
  className?: string;
  /** Optional: content to overlay on top of the video */
  children?: React.ReactNode;
  /** Video source URL (ignored for frame-based approach, kept for API compatibility) */
  src?: string;
  /** Path to frames (e.g. "/frames/frame-") */
  framePath?: string;
  /** Total number of frames */
  frameCount?: number;
}

export default function ScrollCanvas({
  scrollHeightMultiplier = 5,
  className = "",
  children,
  framePath = "/frames/frame-",
  frameCount = 240, // Based on ffmpeg output
}: ScrollCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Framer Motion hook to track scroll progress
  const { scrollYProgress: stickyProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Preload all frames
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];
    const totalFrames = frameCount;

    // Create placeholders
    for (let i = 0; i < totalFrames; i++) {
      loadedImages.push(new Image());
    }

    // Load images
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      // frame-0001.jpg format
      const frameNum = String(i).padStart(4, "0");
      img.src = `${framePath}${frameNum}.jpg`;

      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));

        // Store in correct index (0-based)
        loadedImages[i - 1] = img;

        if (loadedCount === totalFrames) {
          setImages(loadedImages);
          setIsLoaded(true);

          // Draw first frame immediately
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
              // Match canvas size to image
              canvas.width = img.naturalWidth;
              canvas.height = img.naturalHeight;
              ctx.drawImage(img, 0, 0);
            }
          }
        }
      };
    }
  }, [framePath, frameCount]);

  // Update frame on scroll
  useMotionValueEvent(stickyProgress, "change", (latest) => {
    if (!isLoaded || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Map scroll progress (0-1) to frame index
    const progress = Math.min(Math.max(latest, 0), 1);
    const frameIndex = Math.floor(progress * (images.length - 1));
    const img = images[frameIndex];

    if (img) {
      // Ensure canvas size matches image (in case window resized)
      if (
        canvas.width !== img.naturalWidth ||
        canvas.height !== img.naturalHeight
      ) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    }
  });

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: `${scrollHeightMultiplier * 100}vh` }}
      data-scroll-video-container
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-white">
        {/* Loading Indicator */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-48 h-1 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold transition-all duration-100 ease-out"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <p className="text-sm text-gold font-serif italic tracking-wide">
                Loading Experience {loadProgress}%
              </p>
            </div>
          </div>
        )}

        {/* Canvas for rendering frames */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover md:object-contain transition-opacity duration-700"
          style={{ opacity: isLoaded ? 1 : 0 }}
        />

        {/* Overlay Content */}
        {children && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
