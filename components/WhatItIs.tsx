import Reveal from "./Reveal";

export default function WhatItIs() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-32 md:py-44" aria-label="What Founders Game is">
      <Reveal>
        <p className="eyebrow mb-10">01 — The game</p>
        <p className="text-3xl leading-snug md:text-5xl md:leading-tight">
          Free-to-play poker nights that seat founders and investors at the
          same table. <span className="text-bone/50">No buy-in, ever.</span>{" "}
          Every table is curated.
        </p>
      </Reveal>
    </section>
  );
}
