# CLAUDE.md — Founders Game Website

## What this project is
Founders Game hosts application-based, no-buy-in poker nights that put
startup founders and investors at the same table. Players never pay
anything; revenue comes from sponsorships and dealflow. This repo is a
single-page marketing site. It is NOT a poker app — no gameplay, no
payments, no gambling functionality of any kind.

Note on naming: the brand on this site is "Founders Game" (hero reads
FOUNDER / GAMES around the chips). Domains owned: foundersgame.com and
founderspoker.com.

## The site is ONE page with four sections, in this order

### 1. Hero — the scroll-driven chips (the signature element)
- Full-viewport hero. Center: three 3D poker chips (will provide rendered video later).
- Scroll behavior: as the user scrolls through the hero, one chip rises,
  one chip descends, the third stays anchored (so as the user scrolls the video "plays").
  Motion is bound directly to scroll position (scrubbed, not
  time-triggered) so scrolling back reverses it.
- Flanking the chips in a modern, very bold sans-serif: "FOUNDER" on the
  left, "GAMES" on the right. Huge type — each word roughly 12–15vw,
  vertically centered, tight tracking. On mobile, stack: FOUNDER above
  the chips, GAMES below.

### 2. What Founders Game is
Short section. 2–3 sentences max, large readable type:
free-to-play poker nights that seat founders and investors at the same
table. No buy-in, ever. Every table is curated.

### 3. Why it was made
Short narrative section. The premise: the best deals don't start in
pitch meetings — they start in rooms where people actually talk. Poker
is the excuse; the table is the product. Keep it to one short paragraph
plus optionally one pull-quote-style line. Confident, no hype.

### 4. How to get involved
Two paths, side by side (stacked on mobile):
- "Apply for a seat" — primary CTA. Links to the application form
  (inline section or modal; inline preferred for MVP).
- "Sponsor a table" — secondary CTA. mailto link or short inquiry form.
Application form fields and data handling: see below.

Footer: minimal — logo mark, contact email, privacy policy link,
disclaimer line (see Copy guardrails).

## Application form fields
Structured fields only, no resume uploads. All applicants:
- Full name, email, LinkedIn URL, city
- Role: founder / investor / operator (branches the form)

If founder: company name + URL, one-line description, stage (pre-seed /
seed / Series A / Series B+ / bootstrapped), student founder? (y/n),
currently raising? (y/n + round size), and one sentence: "What would
make this table valuable for you?"

If investor: firm (or "angel") + URL, check size range and stage focus,
sectors of interest (multi-select), actively deploying? (y/n)

If operator: company and role, one sentence on what they bring to a table.

Under 2 minutes to complete. Conditional fields, not separate pages.
Every field maps to a clean column — this data feeds curation.


## Game tiers and prizes (context for copy)
Prizes are always sponsor-funded, never cash to individuals:
- Early-stage / student tables: non-dilutive startup grant to the
  winner's COMPANY (e.g., "[Sponsor] Founder Grant"), cloud credits, or
  services package. If an investor wins a mixed table, they choose which
  founder at the table receives the grant.
- Mid-tier tables: sponsor-provided experience prizes.
- Exclusive tables: trophy, engraved chip, champions board, or donation
  to the winner's chosen charity. No monetary prizes at this tier.
Copy may reference grants but NEVER as "winnings," "prize money," or
"prize pool." "Win a grant for your startup" — yes. "Win $5,000" — never.

## Brand and voice
- Vibe: modern and bold, private-game energy. Confident and spare —
  scarcity and understatement over hype. Not casino, not corporate.
- Copy is short, sentence case, no exclamation points.
- Words we like: table, seat, apply for a seat, the game, dealflow,
  the room, founder grant.
- Words to avoid: bet, gamble, casino, jackpot, win money, cash out,
  winnings, prize pool, networking event (say "the table" instead).
- Application framing: selective, not bureaucratic. "Apply for a seat."
  Visible scarcity ("Tables seat 9."). Never "sign up" or "join the
  waitlist."
- Never mention data collection, graphs, or databases in user-facing
  copy — externally it's "every table is curated."

## Visual design
- Direction: modern bold. Massive condensed/grotesque sans display type
  (e.g., Archivo Expanded/Black, Space Grotesk Bold, or similar — pick
  one with real weight at 900), clean sans for body. The FOUNDER/GAMES
  hero type sets the register for the whole page.
- Palette: Black background, white (#F5EFE0) type
- Generous whitespace, few decorations. The chips are the only
  illustration on the page — no stock photos, no card-suit confetti,
  no neon.
- Spend the boldness in the hero; keep sections 2–4 quiet, disciplined,
  type-led.
- Mobile-first. The hero must feel just as intentional on a phone
  (stacked type, chips scaled down, same scroll scrub).

## Tech stack
- Next.js (App Router) + TypeScript + Tailwind CSS
- Three.js via @react-three/fiber + @react-three/drei for the hero
- framer-motion for scroll progress and section reveals (subtle only)
- Deploy: Vercel. Analytics: Vercel Analytics or Plausible.
- Forms: server action → Airtable API. No database, no CMS for MVP.

## Conventions
- Components in /components, PascalCase, one per file
- Server components by default; "use client" only for the hero scene,
  scroll hooks, and the form
- Tailwind for all styling; no CSS modules
- Minimal dependencies — question every new package
- Semantic HTML, accessible forms (labels, focus states), keyboard
  navigable, prefers-reduced-motion respected everywhere

## Copy guardrails (legal-sensitive)
- Always "free to attend" and "no buy-in"
- Never promise investment outcomes, returns, or introductions-for-fees
- Prize language per Game tiers section — grants/credits/trophies only
- Stub a /rules page link in the footer (official contest rules:
  eligibility, no purchase necessary, prizes, tax note) — final text
  comes from a lawyer
- Footer disclaimer: events are private, application-based social
  events; nothing on this site is an offer of securities or investment
  advice

## Definition of done
- Hero scroll scrub is smooth (60fps on a mid-tier laptop, no jank on
  iPhone), reverses cleanly, and has a reduced-motion static fallback
- Lighthouse 90+ mobile for performance and accessibility despite the 3D
- Applications land in Airtable with all fields intact (test founder,
  investor, and operator branches end to end)
- A cold visitor understands what this is within one screen of scrolling
  and can find "Apply for a seat" within 10 seconds