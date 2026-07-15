import Reveal from "./Reveal";

export default function Sponsors() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-32 md:py-44" aria-label="Sponsors">
      <Reveal>
        <p className="eyebrow mb-10">04 — Sponsors</p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        <Reveal className="flex flex-col justify-between border border-bone/15 p-8 md:p-10">
          <div>
            <h2 className="display text-3xl md:text-4xl">Sponsor a table</h2>
            <p className="mt-4 text-bone/60">One name per night.</p>
          </div>
          <a
            href="mailto:sponsors@foundersgame.com?subject=Sponsoring%20a%20table"
            className="btn-ghost mt-10 self-start"
          >
            Get in touch
          </a>
        </Reveal>
      </div>
    </section>
  );
}
