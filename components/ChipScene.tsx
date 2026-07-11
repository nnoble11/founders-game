"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import type { Group } from "three";
import PokerChip from "./PokerChip";

const BONE = { body: "#f5efe0", stripes: "#161613", center: "#eae2cd" };
const CHARCOAL = { body: "#1f1f1c", stripes: "#f5efe0", center: "#282824" };
const OXBLOOD = { body: "#6e1f26", stripes: "#f5efe0", center: "#5e1a20" };

type ChipSceneProps = {
  /** Scroll progress through the hero, 0 → 1. Read per-frame so the motion is scrubbed, not time-triggered. */
  progress: MotionValue<number>;
};

/**
 * Three chips bound directly to scroll position: one rises, one descends,
 * the anchored chip spins in place. Reversing scroll reverses the motion.
 */
export default function ChipScene({ progress }: ChipSceneProps) {
  const rising = useRef<Group>(null);
  const falling = useRef<Group>(null);
  const anchored = useRef<Group>(null);

  useFrame(() => {
    const p = progress.get();

    if (rising.current) {
      rising.current.position.set(-0.62, 0.38 + p * 1.35, -0.35);
      rising.current.rotation.set(Math.PI / 2 - 0.42, 0.12, 0.35 + p * 2.2);
    }
    if (falling.current) {
      falling.current.position.set(0.62, -0.38 - p * 1.35, -0.7);
      falling.current.rotation.set(Math.PI / 2 - 0.3, -0.15, -0.3 - p * 1.7);
    }
    if (anchored.current) {
      anchored.current.position.set(0, 0, 0.35);
      anchored.current.rotation.set(Math.PI / 2 - 0.5, 0, p * Math.PI);
    }
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 8]} intensity={2.4} color="#fff3dd" />
      <directionalLight position={[-6, -3, 3]} intensity={0.7} color="#f5efe0" />
      <PokerChip ref={rising} colors={OXBLOOD} scale={0.92} />
      <PokerChip ref={falling} colors={CHARCOAL} scale={0.92} />
      <PokerChip ref={anchored} colors={BONE} scale={1.02} />
    </>
  );
}
