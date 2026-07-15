import Reveal from "./Reveal";

export default function TheSeason() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-32 md:py-44" aria-label="The standing game">
      <Reveal>
        <p className="eyebrow mb-10">03 — The season</p>
        <p className="max-w-3xl text-xl leading-relaxed text-bone/75 md:text-2xl">
          One-off founder tournaments come and go. This is the standing game —
          monthly tables, a season leaderboard, one final table a year.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="display mt-16 text-4xl md:text-6xl">
          Nine seats a table.
          <br />
          <span className="text-bone/40">Every seat is decided.</span>
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="mt-16 text-bone/60">
          Seats are by invitation.{" "}
          <a
            href="mailto:hello@foundersgame.com"
            className="underline hover:text-bone"
          >
            hello@foundersgame.com
          </a>
        </p>
      </Reveal>
    </section>
  );
}
