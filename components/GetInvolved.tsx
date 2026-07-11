import Reveal from "./Reveal";
import ApplicationForm from "./ApplicationForm";

export default function GetInvolved() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-32 md:py-44" aria-label="How to get involved">
      <Reveal>
        <p className="eyebrow mb-10">03 — Get involved</p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        <Reveal className="flex flex-col justify-between border border-bone/15 p-8 md:p-10">
          <div>
            <h2 className="display text-3xl md:text-4xl">Apply for a seat</h2>
            <p className="mt-4 text-bone/60">
              Tables seat 9. Tell us who you are and what would make a table
              valuable for you — takes under two minutes.
            </p>
          </div>
          <a href="#apply" className="btn-primary mt-10 self-start">
            Apply below
          </a>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col justify-between border border-bone/15 p-8 md:p-10">
          <div>
            <h2 className="display text-3xl md:text-4xl">Sponsor a table</h2>
            <p className="mt-4 text-bone/60">
              Put your name on a founder grant, a night, or a season. We&apos;ll
              share the deck and the calendar.
            </p>
          </div>
          <a
            href="mailto:sponsors@foundersgame.com?subject=Sponsoring%20a%20table"
            className="btn-ghost mt-10 self-start"
          >
            Get in touch
          </a>
        </Reveal>
      </div>

      <div id="apply" className="scroll-mt-16 pt-24 md:pt-32">
        <Reveal>
          <h2 className="display mb-3 text-4xl md:text-5xl">The application</h2>
          <p className="mb-12 max-w-xl text-bone/60">
            Every seat is placed by hand. The more specific you are, the better
            your table.
          </p>
        </Reveal>
        <ApplicationForm />
      </div>
    </section>
  );
}
