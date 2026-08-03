import Reveal from "./Reveal";

export default function WhatItIs() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-32 md:py-44" aria-label="What Founders Game is">
      <Reveal>
        <p className="text-3xl leading-snug md:text-5xl md:leading-tight">
          Invite-only poker for founders and investors.
        </p>
      </Reveal>
    </section>
  );
}
