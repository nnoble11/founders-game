import Reveal from "./Reveal";

export default function WhatItIs() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-32 md:py-44" aria-label="What Founders Game is">
      <Reveal>
        <p className="eyebrow mb-10">01 — The game</p>
        <p className="text-3xl leading-snug md:text-5xl md:leading-tight">
          Networking sucks. Poker doesn&apos;t.{" "}
          <span className="text-bone/50">
            Invite-only poker. Founders and investors at the same table. There
            is no buy-in.
          </span>
        </p>
      </Reveal>
    </section>
  );
}
