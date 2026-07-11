import Link from "next/link";

/** Small chip glyph — the logo mark. */
function ChipMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="13" stroke="#F5EFE0" strokeWidth="1.5" />
      <circle
        cx="14"
        cy="14"
        r="9"
        stroke="#F5EFE0"
        strokeWidth="1.5"
        strokeDasharray="4.7 4.7"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-bone/10 px-6 py-14">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-3">
          <ChipMark />
          <span className="display text-lg">Founders Game</span>
        </div>
        <nav className="flex flex-col gap-2 text-sm text-bone/60 md:items-end" aria-label="Footer">
          <a href="mailto:hello@foundersgame.com" className="hover:text-bone">
            hello@foundersgame.com
          </a>
          <Link href="/privacy" className="hover:text-bone">
            Privacy policy
          </Link>
          <Link href="/rules" className="hover:text-bone">
            Official rules
          </Link>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-5xl text-xs leading-relaxed text-bone/35">
        Founders Game events are private, application-based social events.
        They are free to attend, with no buy-in. Nothing on this site is an
        offer of securities or investment advice.
      </p>
    </footer>
  );
}
