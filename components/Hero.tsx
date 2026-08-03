"use client";

import { useRef } from "react";
import {
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import ChipVideo from "./ChipVideo";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // A stiff spring takes the edge off discrete wheel ticks but stays glued
  // to scroll position, so scrolling back reverses the motion cleanly.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 34,
    restDelta: 0.0001,
  });

  // Reduced motion: freeze the video at a composed mid-scroll frame.
  const frozen = useMotionValue(0.35);
  const progress = reduceMotion ? frozen : smooth;


  return (
    <section
      ref={sectionRef}
      // --u is the hero's single scale unit: every size below (type, chip
      // video, spacing) is a multiple of it, so the word/chip ratio is
      // identical at any viewport. 1.6 is the reference aspect; wider
      // screens scale from height, narrower ones from width.
      className={`[--u:min(1vw,1.6svh)] ${reduceMotion ? "relative h-svh" : "relative h-[300vh]"}`}
      aria-label="Founders Game"
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        {/* Display type — above the video so its black background never cuts the words off */}
        {/* Two equal halves split at the chip center: FOUNDERS ends and GAME
            starts at the same 7u distance from the centerline. */}
        <div className="relative z-20 flex w-full flex-col items-center justify-center px-[4vw] md:grid md:grid-cols-2 md:px-0">
          <h1 className="display text-[calc(var(--u)*13)] md:justify-self-end md:pr-[calc(var(--u)*7)] md:text-[calc(var(--u)*6)]">
            Founders
          </h1>
          <div className="h-[calc(var(--u)*82)] md:hidden" aria-hidden />
          <p className="display text-[calc(var(--u)*13)] md:justify-self-start md:pl-[calc(var(--u)*7)] md:text-[calc(var(--u)*6)]">
            Game
          </p>
        </div>

        {/* Chips — rendered video as the background layer, scrubbed by scroll, inert to pointers */}
        <div
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
          aria-hidden
        >
          <ChipVideo progress={progress} />
        </div>

      </div>
    </section>
  );
}
