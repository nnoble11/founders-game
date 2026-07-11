"use client";

import { forwardRef, useMemo } from "react";
import type { Group } from "three";

export type ChipColors = {
  body: string;
  stripes: string;
  center: string;
};

type PokerChipProps = {
  colors: ChipColors;
  position?: [number, number, number];
  scale?: number;
};

const STRIPE_COUNT = 6;

/**
 * Procedural poker chip: a cylinder body, six edge stripes that wrap over
 * the rim onto the faces (boxes slightly taller and deeper than the body),
 * and an inset center disc. Placeholder until the rendered chip video lands.
 */
const PokerChip = forwardRef<Group, PokerChipProps>(function PokerChip(
  { colors, position = [0, 0, 0], scale = 1 },
  ref,
) {
  const stripes = useMemo(
    () =>
      Array.from({ length: STRIPE_COUNT }, (_, i) => {
        const angle = (i / STRIPE_COUNT) * Math.PI * 2;
        return {
          position: [Math.cos(angle) * 0.94, 0, Math.sin(angle) * 0.94] as [
            number,
            number,
            number,
          ],
          rotation: [0, -angle, 0] as [number, number, number],
        };
      }),
    [],
  );

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh>
        <cylinderGeometry args={[1, 1, 0.22, 64]} />
        <meshStandardMaterial color={colors.body} roughness={0.42} metalness={0.05} />
      </mesh>
      {stripes.map((s, i) => (
        <mesh key={i} position={s.position} rotation={s.rotation}>
          <boxGeometry args={[0.18, 0.24, 0.36]} />
          <meshStandardMaterial color={colors.stripes} roughness={0.5} metalness={0.02} />
        </mesh>
      ))}
      <mesh>
        <cylinderGeometry args={[0.62, 0.62, 0.226, 48]} />
        <meshStandardMaterial color={colors.center} roughness={0.55} metalness={0} />
      </mesh>
    </group>
  );
});

export default PokerChip;
