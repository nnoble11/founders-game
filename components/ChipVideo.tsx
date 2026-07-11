"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";

type ChipVideoProps = {
  /** Scroll progress through the hero, 0 → 1. Drives video time directly, so scrolling back plays it in reverse. */
  progress: MotionValue<number>;
};

/**
 * The rendered chip video, scrubbed by scroll. Seeks are serialized: while
 * the browser is still seeking, the latest target is parked and applied on
 * `seeked`, so fast scrolling never queues a backlog of stale frames.
 */
export default function ChipVideo({ progress }: ChipVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pendingTime = useRef<number | null>(null);

  const seek = (p: number) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration === 0) {
      return;
    }
    // Stay a hair off the end so the final frame remains visible.
    const t = Math.min(Math.max(p, 0), 0.999) * video.duration;
    if (video.seeking) {
      pendingTime.current = t;
    } else {
      video.currentTime = t;
    }
  };

  useMotionValueEvent(progress, "change", seek);

  // Mobile browsers never decode or paint a frame for a video that hasn't
  // played, so seeking alone leaves it invisible. A muted play() + pause()
  // primes the decoder. If even muted autoplay is blocked (e.g. Low Power
  // Mode), the first touch retries it.
  const primed = useRef(false);

  const prime = () => {
    const video = videoRef.current;
    if (!video || primed.current) return;
    video
      .play()
      .then(() => {
        primed.current = true;
        video.pause();
        seek(progress.get());
      })
      .catch(() => {
        // Blocked; the touchstart listener below will retry.
      });
  };

  useEffect(() => {
    const onTouch = () => prime();
    window.addEventListener("touchstart", onTouch, { passive: true });
    return () => window.removeEventListener("touchstart", onTouch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <video
      ref={videoRef}
      src="/test01.mp4"
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-hidden
      onLoadedMetadata={() => {
        seek(progress.get());
        prime();
      }}
      onSeeked={() => {
        const video = videoRef.current;
        if (video && pendingTime.current !== null) {
          video.currentTime = pendingTime.current;
          pendingTime.current = null;
        }
      }}
      // The clip hides the white bar baked into the file's right edge.
      // Mobile: the chips are ~10% of the video frame's width, so the frame
      // must overflow the viewport (clipped by the hero) for them to read.
      className="w-[260vw] max-w-none object-contain [clip-path:inset(0_4%_0_0)] md:h-[70svh] md:w-auto md:max-w-[92vw]"
    />
  );
}
