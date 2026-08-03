import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-bone/10 px-6 py-14">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <span className="display text-lg">Founders Game</span>
        <nav className="flex flex-col gap-2 text-sm text-bone/60 md:items-end" aria-label="Footer">
          <Link href="/privacy" className="hover:text-bone">
            Privacy policy
          </Link>
          <Link href="/rules" className="hover:text-bone">
            Official rules
          </Link>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-5xl text-xs leading-relaxed text-bone/35">
        Founders Game events are private, invitation-based social events.
        They are free to attend, with no buy-in. Nothing on this site is an
        offer of securities or investment advice.
      </p>
    </footer>
  );
}
