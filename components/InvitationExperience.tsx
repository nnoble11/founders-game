"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type DeviceOrientationPermissionEvent = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

type InvitationExperienceProps = {
  cardFaceUrl: string;
  lumaUrl: string;
};

const MAX_POINTER_TILT = 8;
const MAX_DEVICE_TILT = 10;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function InvitationExperience({
  cardFaceUrl,
  lumaUrl,
}: InvitationExperienceProps) {
  const tiltRef = useRef<HTMLSpanElement>(null);
  const calibrationRef = useRef<{ beta: number; gamma: number } | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [orientationEnabled, setOrientationEnabled] = useState(false);

  const setTilt = useCallback(
    (rotateX: number, rotateY: number, sheenX = 50, sheenY = 50) => {
      const element = tiltRef.current;
      if (!element) return;

      element.style.setProperty("--invite-rx", `${rotateX.toFixed(2)}deg`);
      element.style.setProperty("--invite-ry", `${rotateY.toFixed(2)}deg`);
      element.style.setProperty("--invite-sx", `${sheenX.toFixed(1)}%`);
      element.style.setProperty("--invite-sy", `${sheenY.toFixed(1)}%`);
    },
    [],
  );

  useEffect(() => {
    if (!orientationEnabled) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta === null || event.gamma === null) return;

      if (!calibrationRef.current) {
        calibrationRef.current = { beta: event.beta, gamma: event.gamma };
      }

      const baseline = calibrationRef.current;
      const beta = clamp(
        (event.beta - baseline.beta) * 0.5,
        -MAX_DEVICE_TILT,
        MAX_DEVICE_TILT,
      );
      const gamma = clamp(
        (event.gamma - baseline.gamma) * 0.5,
        -MAX_DEVICE_TILT,
        MAX_DEVICE_TILT,
      );

      setTilt(-beta, gamma, 50 + gamma * 2.5, 50 + beta * 2.5);
    };

    window.addEventListener("deviceorientation", handleOrientation, true);
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
      calibrationRef.current = null;
    };
  }, [orientationEnabled, setTilt]);

  const requestOrientation = async () => {
    if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const OrientationEvent = window.DeviceOrientationEvent as DeviceOrientationPermissionEvent;

    try {
      if (typeof OrientationEvent.requestPermission === "function") {
        const permission = await OrientationEvent.requestPermission();
        setOrientationEnabled(permission === "granted");
      } else {
        setOrientationEnabled(true);
      }
    } catch {
      // The card still works with touch, keyboard, and pointer input.
    }
  };

  const reveal = () => {
    if (revealed) return;
    setRevealed(true);
    void requestOrientation();
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (
      event.pointerType === "touch" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    setTilt(
      (0.5 - y) * MAX_POINTER_TILT * 2,
      (x - 0.5) * MAX_POINTER_TILT * 2,
      x * 100,
      y * 100,
    );
  };

  return (
    <main className="invite-shell">
      <div className="invite-ambient" aria-hidden="true" />
      <section className="invite-experience" aria-labelledby="invite-title">
        <h1 id="invite-title" className="sr-only">
          Your Founders Game invitation
        </h1>

        <button
          type="button"
          className="invite-card-button"
          aria-label={revealed ? "Founders Game invitation" : "Reveal invitation"}
          aria-pressed={revealed}
          onClick={reveal}
          onPointerLeave={() => setTilt(0, 0)}
          onPointerMove={handlePointerMove}
        >
          <span className={revealed ? "invite-card-float is-revealed" : "invite-card-float"}>
            <span ref={tiltRef} className="invite-card-tilt">
              <span className="invite-card-inner">
                <span className="invite-card-side invite-card-back" aria-hidden="true">
                  <img
                    className="invite-card-image"
                    src="/invite-card-back.png"
                    alt=""
                    draggable={false}
                  />
                </span>

                <span className="invite-card-side invite-card-front">
                  <img
                    className="invite-card-image"
                    src={cardFaceUrl}
                    alt=""
                    draggable={false}
                  />
                  <span className="invite-sheen" aria-hidden="true" />
                </span>
              </span>
            </span>
          </span>
        </button>

        <p className={revealed ? "invite-prompt is-hidden" : "invite-prompt"} aria-hidden={revealed}>
          Tap to reveal
        </p>

        <div className={revealed ? "invite-actions is-visible" : "invite-actions"} aria-hidden={!revealed}>
          <p className="invite-game-line">
            San Francisco {"\u00b7"} Game I
          </p>
          <p>By invitation only</p>
          <a
            className="invite-rsvp"
            href={lumaUrl}
            rel="noopener"
            tabIndex={revealed ? 0 : -1}
            target="_blank"
          >
            Take your seat
            <span aria-hidden="true">{"\u2197"}</span>
          </a>
        </div>
      </section>
    </main>
  );
}
