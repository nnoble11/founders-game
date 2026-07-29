import Reveal from "./Reveal";

export default function GameOne() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-32 md:py-44" aria-label="Game 001 — San Francisco">
      <Reveal>
        <p className="max-w-3xl text-xl leading-relaxed text-bone/75 md:text-2xl">
          August 2026 · 27 seats. A 1916 manor in the hills. Professional
          dealers. Dinner, an open bar, and $5,000 across the final three.
          Location shared with confirmed seats.
        </p>
      </Reveal>
      {/* Archival plate. The duotone (grayscale + bone multiply) happens in
          CSS, so the image ships as a plain grayscale scan — swap
          public/game001.jpg for the real print, no code change. Currently a
          placeholder frame from the chip render until the LOC scan lands. */}
      <Reveal delay={0.05}>
        <figure className="relative isolate mt-16 overflow-hidden">
          <img
            src="/game001.jpg"
            alt="A poker game in a boarding house, 1943 — seven players around a table, mid-hand"
            className="w-full grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-bone mix-blend-multiply" aria-hidden />
        </figure>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="display mt-16 text-4xl md:text-6xl">
          Doors at six. Cards at seven.
          <br />
          <span className="text-bone/40">One winner.</span>
        </p>
      </Reveal>
    </section>
  );
}
