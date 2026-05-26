# Scroll-Driven Video Animation — Next.js Implementation Guide

## Overview

This skill implements an **Apple-style scroll-driven video animation** for a barber shop website built with Next.js. The effect ties a video's playback to the user's scroll position — as the user scrolls down, the video progresses frame by frame, creating a cinematic transformation reveal (messy hair → perfect haircut).

This is the same technique Apple uses on their AirPods, iPhone, and MacBook product pages where scrolling controls product animations.

---

## How It Works (Core Concept)

Instead of the video playing automatically, we:

1. **Preload the entire video** into memory so frames are instantly accessible
2. **Listen to scroll events** within a designated scroll zone (a tall container)
3. **Map scroll progress (0% → 100%) to video time (0s → duration)**
4. **Set `video.currentTime`** on each scroll tick to scrub to the correct frame

The video element has no controls, is muted, and never "plays" — we manually seek through it.

---

## Prerequisites

- A Next.js project (App Router or Pages Router)
- An MP4 video file (5–6 seconds, 16:9 aspect ratio, ideally 30fps or higher)
- The video should be encoded with **frequent keyframes** for smooth scrubbing (see Encoding section below)

---

## Step 1: Optimize the Video for Scroll Scrubbing

**CRITICAL**: Standard MP4 files have keyframes every few seconds, which makes scrubbing janky. For smooth frame-by-frame scrolling, re-encode the video with a keyframe on every frame (or every 2 frames).

### Option A: FFmpeg Re-encode (Recommended)

Place this command in a script or run manually before adding the video to the project:

```bash
ffmpeg -i input-video.mp4 \
  -vcodec libx264 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -g 1 \
  -keyint_min 1 \
  -an \
  -preset slow \
  -crf 18 \
  output-scroll-optimized.mp4
```

**Explanation of flags:**
- `-g 1` and `-keyint_min 1` → keyframe on every single frame (essential for smooth scrubbing)
- `-movflags +faststart` → metadata at the start of the file for fast loading
- `-an` → strips audio (not needed, reduces file size)
- `-crf 18` → high quality (lower = better quality, 18 is visually lossless)
- `-preset slow` → better compression

### Option B: If FFmpeg Is Not Available

If the AI agent cannot run FFmpeg, instruct the user to re-encode the video themselves using the command above, or note in the UI code that scrubbing may not be perfectly smooth with a standard encode. The implementation will still work, just with occasional frame jumps.

### Place the Video File

Copy or move the optimized video to the Next.js `public` directory:

```
public/
  videos/
    barber-transformation.mp4
```

This makes it accessible at the URL path `/videos/barber-transformation.mp4`.

---

## Step 2: Create the Scroll Video Component

Create the file `components/ScrollVideo.tsx` (or `.jsx` if not using TypeScript). This is the core component.

```tsx
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
    >
      {/* Sticky container that keeps the video centered while scrolling */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Loading state */}
        {!isVideoReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin" />
              <p className="text-sm text-neutral-500 font-medium tracking-wide">
                Loading experience...
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
          className="w-full h-full object-contain"
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
```

### Key Technical Details

| Aspect | Implementation |
|---|---|
| **Scroll tracking** | Uses `getBoundingClientRect()` to measure container position relative to viewport |
| **Performance** | `requestAnimationFrame` throttles scroll updates to 60fps max |
| **Sticky behavior** | CSS `position: sticky` keeps the video in view while the tall container scrolls |
| **Smooth scrubbing** | `video.currentTime` directly set — requires keyframe-dense video |
| **Loading UX** | Spinner shown until video is buffered and ready |

---

## Step 3: Create Scroll-Triggered Text Overlays (Optional but Recommended)

For the full Apple effect, text should fade in/out at specific scroll positions. Create `components/ScrollText.tsx`:

```tsx
"use client";

import { useRef, useEffect, useState } from "react";

interface ScrollTextProps {
  /** When this text should appear (0 = start, 1 = end of scroll zone) */
  appearAt: number;
  /** When this text should disappear */
  disappearAt: number;
  /** The parent scroll container ref or selector */
  scrollContainerSelector?: string;
  children: React.ReactNode;
  className?: string;
  position?: "top" | "center" | "bottom";
}

export default function ScrollText({
  appearAt,
  disappearAt,
  children,
  className = "",
  position = "center",
}: ScrollTextProps) {
  const [opacity, setOpacity] = useState(0);
  const [translateY, setTranslateY] = useState(30);

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
      const fadeInEnd = appearAt + 0.03; // Quick fade in over 3% scroll
      const fadeOutStart = disappearAt - 0.03;
      const fadeOutEnd = disappearAt;

      let newOpacity = 0;
      let newTranslateY = 30;

      if (progress >= fadeInStart && progress <= fadeInEnd) {
        // Fading in
        const fadeProgress = (progress - fadeInStart) / (fadeInEnd - fadeInStart);
        newOpacity = fadeProgress;
        newTranslateY = 30 * (1 - fadeProgress);
      } else if (progress > fadeInEnd && progress < fadeOutStart) {
        // Fully visible
        newOpacity = 1;
        newTranslateY = 0;
      } else if (progress >= fadeOutStart && progress <= fadeOutEnd) {
        // Fading out
        const fadeProgress = (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
        newOpacity = 1 - fadeProgress;
        newTranslateY = -20 * fadeProgress;
      }

      setOpacity(newOpacity);
      setTranslateY(newTranslateY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [appearAt, disappearAt]);

  const positionClasses = {
    top: "top-[15%]",
    center: "top-1/2 -translate-y-1/2",
    bottom: "bottom-[15%]",
  };

  return (
    <div
      className={`absolute left-0 right-0 flex justify-center pointer-events-auto ${positionClasses[position]} ${className}`}
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        transition: "none", // No CSS transition — driven purely by scroll
      }}
    >
      {children}
    </div>
  );
}
```

---

## Step 4: Integrate Into a Next.js Page

Here's how to use the components on your barber shop page. Adjust paths and content to match your project structure.

### Example: `app/page.tsx` (App Router)

```tsx
import ScrollVideo from "@/components/ScrollVideo";
import ScrollText from "@/components/ScrollText";

export default function HomePage() {
  return (
    <main>
      {/* ── Hero / content above the scroll animation ── */}
      <section className="h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-6xl font-bold tracking-tight text-neutral-900">
            Your Transformation Awaits
          </h1>
          <p className="mt-4 text-xl text-neutral-500">
            Scroll down to experience the change
          </p>
          {/* Scroll indicator arrow */}
          <div className="mt-12 animate-bounce">
            <svg
              className="w-6 h-6 mx-auto text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ── Scroll-Driven Video Section ── */}
      <ScrollVideo
        src="/videos/barber-transformation.mp4"
        scrollHeightMultiplier={5}
        data-scroll-video-container
      >
        {/* Text overlays that appear/disappear at specific scroll points */}
        <ScrollText appearAt={0.0} disappearAt={0.2} position="bottom">
          <p className="text-2xl font-semibold text-neutral-800 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full">
            Before — The Raw Look
          </p>
        </ScrollText>

        <ScrollText appearAt={0.25} disappearAt={0.5} position="bottom">
          <p className="text-2xl font-semibold text-neutral-800 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full">
            Precision in Every Cut
          </p>
        </ScrollText>

        <ScrollText appearAt={0.55} disappearAt={0.75} position="bottom">
          <p className="text-2xl font-semibold text-neutral-800 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full">
            Crafted to Perfection
          </p>
        </ScrollText>

        <ScrollText appearAt={0.8} disappearAt={1.0} position="bottom">
          <p className="text-3xl font-bold text-neutral-900 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full">
            The Final Look ✂️
          </p>
        </ScrollText>
      </ScrollVideo>

      {/* ── Content below the scroll animation ── */}
      <section className="h-screen flex items-center justify-center bg-neutral-950">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white">Book Your Cut</h2>
          <p className="mt-4 text-lg text-neutral-400">
            Experience the transformation in person
          </p>
          <button className="mt-8 px-8 py-3 bg-white text-neutral-900 font-semibold rounded-full hover:bg-neutral-200 transition-colors">
            Book Now
          </button>
        </div>
      </section>
    </main>
  );
}
```

**IMPORTANT**: Add the `data-scroll-video-container` attribute to the ScrollVideo wrapper. The ScrollText component uses this to find the scroll zone. Update the `ScrollVideo` component to forward this attribute:

In `ScrollVideo.tsx`, update the outer `<div>` to include:

```tsx
<div
  ref={containerRef}
  className={`relative ${className}`}
  style={{ height: `${scrollHeightMultiplier * 100}vh` }}
  data-scroll-video-container
>
```

---

## Step 5: Add a Scroll Progress Indicator (Optional)

A thin progress bar at the top of the screen showing how far through the animation the user has scrolled. Create `components/ScrollProgress.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector("[data-scroll-video-container]");
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Is the container in view?
      const isInView = rect.top < windowHeight && rect.bottom > 0;
      setIsVisible(isInView);

      if (isInView) {
        const scrollableDistance = rect.height - windowHeight;
        const scrolled = -rect.top;
        const p = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);
        setProgress(p);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-neutral-200">
      <div
        className="h-full bg-neutral-900 transition-none"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
```

Add `<ScrollProgress />` to your layout or page.

---

## Step 6: Mobile Considerations

Mobile scroll-driven video can be tricky. Here are the adjustments:

### Touch Scroll Smoothing

Mobile browsers sometimes throttle scroll events. Add this CSS to your global stylesheet:

```css
/* In globals.css or your main CSS file */
html {
  scroll-behavior: auto; /* Do NOT use smooth — it delays scroll events */
}

/* Prevent pull-to-refresh from interfering */
body {
  overscroll-behavior: none;
}
```

### Reduce Scroll Height on Mobile

The `scrollHeightMultiplier` should be smaller on mobile since users scroll faster with touch. Add responsive logic:

```tsx
// Inside ScrollVideo component or as a prop:
const [multiplier, setMultiplier] = useState(scrollHeightMultiplier);

useEffect(() => {
  const isMobile = window.innerWidth < 768;
  setMultiplier(isMobile ? Math.max(scrollHeightMultiplier - 1.5, 3) : scrollHeightMultiplier);
}, [scrollHeightMultiplier]);
```

### iOS Video Limitations

iOS requires `playsInline` (already included) and will not autoplay video without user interaction. Since we never call `.play()` and only set `.currentTime`, this should work — but test on real iOS devices.

---

## Step 7: Performance Optimization

### Video File Size

For a 5–6 second video, target file sizes:
- **Desktop**: 5–10 MB max (higher quality acceptable)
- **Mobile**: 2–4 MB (use lower resolution or higher CRF)

Consider serving different video files for mobile vs desktop:

```tsx
const [videoSrc, setVideoSrc] = useState("/videos/barber-transformation.mp4");

useEffect(() => {
  if (window.innerWidth < 768) {
    setVideoSrc("/videos/barber-transformation-mobile.mp4");
  }
}, []);
```

Create the mobile version with FFmpeg:

```bash
ffmpeg -i output-scroll-optimized.mp4 \
  -vf "scale=720:-2" \
  -crf 23 \
  -g 1 \
  -keyint_min 1 \
  -an \
  -movflags +faststart \
  output-scroll-optimized-mobile.mp4
```

### Intersection Observer for Activation

Only attach scroll listeners when the video section is near the viewport:

```tsx
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener("scroll", handleScroll, { passive: true });
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    },
    { rootMargin: "200px" } // Start observing 200px before it enters
  );

  if (containerRef.current) {
    observer.observe(containerRef.current);
  }

  return () => {
    observer.disconnect();
    window.removeEventListener("scroll", handleScroll);
  };
}, [handleScroll]);
```

---

## Alternative Approach: Canvas Frame Extraction

If the MP4 scrubbing approach has issues (jerky on some browsers), an alternative is to extract individual frames as images and draw them to a `<canvas>`. This is how Apple actually does it on some pages.

### Extract Frames with FFmpeg

```bash
mkdir -p public/frames
ffmpeg -i input-video.mp4 -vf "fps=30" public/frames/frame-%04d.jpg
```

This creates `frame-0001.jpg`, `frame-0002.jpg`, etc.

### Canvas-Based Scroll Component

```tsx
"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface ScrollCanvasProps {
  frameCount: number;
  framePath: string; // e.g., "/frames/frame-" — will append "0001.jpg"
  scrollHeightMultiplier?: number;
  className?: string;
  children?: React.ReactNode;
}

export default function ScrollCanvas({
  frameCount,
  framePath,
  scrollHeightMultiplier = 5,
  className = "",
  children,
}: ScrollCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // ─── Preload all frames ───
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(4, "0");
      img.src = `${framePath}${frameNum}.jpg`;
      img.onload = () => {
        loaded++;
        setLoadProgress(loaded / frameCount);
        if (loaded === frameCount) {
          imagesRef.current = images;
          setIsLoaded(true);
          // Draw first frame
          drawFrame(0);
        }
      };
      images.push(img);
    }
  }, [frameCount, framePath]);

  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const images = imagesRef.current;
      if (!canvas || !images.length) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = images[Math.min(index, images.length - 1)];

      // Match canvas size to image
      if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    },
    []
  );

  // ─── Scroll handler ───
  useEffect(() => {
    if (!isLoaded) return;

    const handleScroll = () => {
      requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const scrollableDistance = rect.height - windowHeight;
        const scrolled = -rect.top;
        const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);

        const frameIndex = Math.round(progress * (frameCount - 1));
        drawFrame(frameIndex);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoaded, frameCount, drawFrame]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: `${scrollHeightMultiplier * 100}vh` }}
      data-scroll-video-container
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-48 h-1 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-neutral-900 rounded-full transition-all duration-300"
                  style={{ width: `${loadProgress * 100}%` }}
                />
              </div>
              <p className="text-sm text-neutral-500">
                Loading {Math.round(loadProgress * 100)}%
              </p>
            </div>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="max-w-full max-h-full object-contain"
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />

        {children && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
```

Usage:

```tsx
<ScrollCanvas
  frameCount={150}
  framePath="/frames/frame-"
  scrollHeightMultiplier={5}
/>
```

---

## Choosing Between Video vs Canvas Approach

| Factor | Video (MP4) Approach | Canvas (Frames) Approach |
|---|---|---|
| **File size** | Smaller (one compressed file) | Larger (many JPEGs, but lazy-loadable) |
| **Scrub smoothness** | Depends on keyframe density | Always smooth — every frame is a separate image |
| **Browser support** | Excellent | Excellent |
| **Loading UX** | Single file to buffer | Progressive loading with percentage |
| **Implementation** | Simpler | More complex, more files |
| **Apple's approach** | Used on some pages | Used on most product pages |

**Recommendation**: Start with the **Video (MP4) approach** since you already have the MP4 file. If scrubbing feels choppy on certain devices, switch to the Canvas approach.

---

## File Structure Summary

After implementation, your project should have these new/modified files:

```
your-nextjs-project/
├── public/
│   └── videos/
│       ├── barber-transformation.mp4          (desktop, keyframe-optimized)
│       └── barber-transformation-mobile.mp4   (optional, lower res)
├── components/
│   ├── ScrollVideo.tsx        (core scroll-driven video component)
│   ├── ScrollText.tsx         (fade-in/out text overlays)
│   └── ScrollProgress.tsx     (optional progress bar)
├── app/
│   └── page.tsx               (or wherever the animation section lives)
└── styles/
    └── globals.css            (scroll-behavior and overscroll rules)
```

---

## Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| Video jumps between frames | Not enough keyframes in the MP4 | Re-encode with `-g 1` FFmpeg flag |
| Video doesn't load on iOS | Missing `playsInline` or `muted` | Ensure both attributes are on the `<video>` tag |
| Scroll feels too long/short | `scrollHeightMultiplier` is wrong | Adjust the value (3–7 range, 5 is default) |
| Video is black/blank | Video not preloaded or path is wrong | Check `preload="auto"` and verify the file path |
| Jerky on mobile | Scroll events throttled by browser | Switch to Canvas approach or use `will-change: transform` |
| White flash on first frame | Video hasn't loaded yet | The loading spinner handles this — ensure it's visible |

---

## Quick Checklist for the AI Agent

- [ ] Re-encode video with FFmpeg for scroll-friendly keyframes
- [ ] Place video in `public/videos/`
- [ ] Create `ScrollVideo.tsx` component with `"use client"` directive
- [ ] Add `data-scroll-video-container` attribute to the scroll zone div
- [ ] Create `ScrollText.tsx` for overlay text (optional)
- [ ] Create `ScrollProgress.tsx` for progress indicator (optional)
- [ ] Integrate components into the target page
- [ ] Add CSS rules to `globals.css` (scroll-behavior, overscroll-behavior)
- [ ] Test on desktop and mobile
- [ ] If scrubbing is not smooth, consider Canvas approach as fallback
