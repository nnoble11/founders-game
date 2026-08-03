import Reveal from "./Reveal";

export default function WhatItIs() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-32 md:py-44" aria-label="What Founders Game is">
      <Reveal>
        <p className="text-3xl leading-snug md:text-5xl md:leading-tight">
          Invite-only poker for founders and investors.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone/60 md:text-xl">
          There&apos;s no buy-in. Games are intentionally small, two or three
          tables max. Games are tournament style, with a prize for the winner.
          The point is to get interesting people at a table and start
          interesting conversations.
        </p>
      </Reveal>
    </section>
  );
}
