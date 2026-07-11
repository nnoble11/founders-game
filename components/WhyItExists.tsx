import Reveal from "./Reveal";

export default function WhyItExists() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-32 md:py-44" aria-label="Why Founders Game exists">
      <Reveal>
        <p className="eyebrow mb-10">02 — Why</p>
        <p className="max-w-3xl text-xl leading-relaxed text-bone/75 md:text-2xl">
          The best deals don&apos;t start in pitch meetings. They start in
          rooms where people actually talk — where a founder and an investor
          spend three hours reading each other over cards instead of thirty
          minutes over a deck.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="display mt-16 text-4xl md:text-6xl">
          Poker is the excuse.
          <br />
          <span className="text-bone/40">The table is the product.</span>
        </p>
      </Reveal>
    </section>
  );
}
