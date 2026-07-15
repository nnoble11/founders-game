import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy policy — Founders Game",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="display text-4xl md:text-5xl">Privacy policy</h1>
      <p className="mt-8 leading-relaxed text-bone/70">
        We collect the information you share with us solely to seat tables
        and run Founders Game events. We don&apos;t sell your
        information, and we don&apos;t share it beyond what&apos;s needed to
        operate an event you attend.
      </p>
      <p className="mt-4 leading-relaxed text-bone/70">
        A complete privacy policy will be published here before the first
        table is dealt. Questions in the meantime:{" "}
        <a href="mailto:hello@foundersgame.com" className="underline hover:text-bone">
          hello@foundersgame.com
        </a>
        .
      </p>
      <p className="mt-12">
        <Link href="/" className="btn-ghost">
          Back to the game
        </Link>
      </p>
    </main>
  );
}
