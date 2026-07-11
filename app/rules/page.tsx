import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Official rules — Founders Game",
};

export default function RulesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="display text-4xl md:text-5xl">Official rules</h1>
      <p className="mt-8 leading-relaxed text-bone/70">
        Founders Game events are private, application-based social events.
        They are free to attend and there is no buy-in. No purchase is
        necessary to apply, attend, or receive any prize.
      </p>
      <p className="mt-4 leading-relaxed text-bone/70">
        Full official contest rules — covering eligibility, prize details,
        sponsor grant terms, and tax notes — are being finalized and will be
        published here before the first table is dealt.
      </p>
      <p className="mt-12">
        <Link href="/" className="btn-ghost">
          Back to the game
        </Link>
      </p>
    </main>
  );
}
