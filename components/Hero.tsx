"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
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

  const founderDrift = useTransform(smooth, [0, 1], ["0vw", "-2.5vw"]);
  const gamesDrift = useTransform(smooth, [0, 1], ["0vw", "2.5vw"]);
  const cueOpacity = useTransform(smooth, [0, 0.12], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className={reduceMotion ? "relative h-svh" : "relative h-[300vh]"}
      aria-label="Founders Game"
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        {/* Display type — above the video so its black background never cuts the words off */}
        {/* Two equal halves split at the chip center: FOUNDERS ends and GAME
            starts at the same 5vw distance from the centerline. */}
        <div className="relative z-20 flex w-full flex-col items-center justify-center px-[4vw] md:grid md:grid-cols-2 md:px-0">
          <motion.h1
            className="display text-[13vw] md:justify-self-end md:pr-[5vw] md:text-[6vw]"
            style={reduceMotion ? undefined : { x: founderDrift }}
          >
            Founders
          </motion.h1>
          <div className="h-[38svh] md:hidden" aria-hidden />
          <motion.p
            className="display text-[13vw] md:justify-self-start md:pl-[5vw] md:text-[6vw]"
            style={reduceMotion ? undefined : { x: gamesDrift }}
          >
            Game
          </motion.p>
        </div>

        {/* Chips — rendered video as the background layer, scrubbed by scroll, inert to pointers */}
        <div
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
          aria-hidden
        >
          <ChipVideo progress={progress} />
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
          style={reduceMotion ? undefined : { opacity: cueOpacity }}
          aria-hidden
        >
          <span className="eyebrow">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}
