import Reveal from "./Reveal";

export default function GameOne() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-32 md:py-44" aria-label="Game 001 — San Francisco">
      <Reveal>
        <p className="eyebrow mb-10">02 — Game 001 · San Francisco</p>
        <p className="max-w-3xl text-xl leading-relaxed text-bone/75 md:text-2xl">
          August 2026 · 27 seats. A 1916 manor in the hills. Professional
          dealers. Dinner, an open bar, and $5,000 across the final three.
          Location shared with confirmed seats.
        </p>
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
