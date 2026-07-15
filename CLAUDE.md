# CLAUDE.md — Founders Game Website

## What this project is
Founders Game hosts invite-only, no-buy-in poker nights that put
startup founders and investors at the same table. Players never pay
anything; revenue comes from sponsorships and dealflow. This repo is a
single-page marketing site. It is NOT a poker app — no gameplay, no
payments, no gambling functionality of any kind.

Note on naming: the brand on this site is "Founders Game" (hero reads
FOUNDERS / GAME around the chips). Domains owned: foundersgame.com and
founderspoker.com.

## The site is ONE page with five sections, in this order

### 1. Hero — the scroll-driven chips (the signature element)
- Full-viewport hero. Center: three 3D poker chips (will provide rendered video later).
- Scroll behavior: as the user scrolls through the hero, one chip rises,
  one chip descends, the third stays anchored (so as the user scrolls the video "plays").
  Motion is bound directly to scroll position (scrubbed, not
  time-triggered) so scrolling back reverses it.
- Flanking the chips in a modern, very bold sans-serif: "FOUNDERS" on
  the left, "GAME" on the right. Huge type — each word roughly 12–15vw,
  vertically centered, tight tracking. On mobile, stack: FOUNDERS above
  the chips, GAME below.

### 2. The game (01)
Short section, large readable type. Lead line — the first thing seen
after scrolling past the hero: "Networking sucks. Poker doesn't."
Supporting line (dimmed): invite-only poker, founders and investors at
the same table, there is no buy-in.

### 3. Game 001 · San Francisco (02)
The next event, stated flat: date, seat count, venue character (never
the address — "Location shared with confirmed seats" is the strongest
exclusivity signal on the page), dealers, dinner, open bar, and the
prize figure. Display pull-quote: "Doors at six. Cards at seven. One
winner." The numbering (Game 001, 002, …) quietly promises a future
archive — a later "Previous Games" page gets photos and the winner's
name, nothing else (a results page, not a recap blog).

### 4. The season (03)
The standing-game positioning: one-off founder tournaments come and go;
this is the standing game — monthly tables, a season leaderboard, one
final table a year. Display line: "Nine seats a table. Every seat is
decided." Ends with the only player path in: "Seats are by invitation."
plus the hello@ email. No application form.

### 5. Sponsors (04)
Single card: "Sponsor a table. One name per night." mailto CTA to
sponsors@foundersgame.com.

Footer: minimal — logo mark, contact email, privacy policy link,
disclaimer line (see Copy guardrails).

## Application form (DORMANT — not on the page)
The site is invite-only for now; there is no application. The form
below was built and still lives in the repo (components/ApplicationForm.tsx,
app/actions.ts) but is unmounted. Keep it compiling; it may return as a
request-an-invite form. If it comes back:
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


## Prizes (context for copy)
Prizes are sponsor-funded. Cash prizes are permitted and are stated
flat, as fact — "$5,000 across the final three" — never with hype and
never framed as gambling proceeds. Luxury never acts surprised by its
own generosity: no exclamation points, no "win big," no "up to."
Grants, credits, trophies, and charity donations remain fine where they
fit. Still never: "winnings," "prize money," "prize pool," "jackpot,"
"cash out." Prize figures are placeholders until the sponsor is locked;
swap in the real number, keep the flat delivery.

## Brand and voice
- Vibe: modern and bold, private-game energy. Confident and spare —
  scarcity and understatement over hype. Not casino, not corporate.
  Insiders know; that's the point. The page says "we're not selling you
  anything" without ever saying it.
- Copy is short, sentence case, no exclamation points.
- Words we like: table, seat, the game, the standing game, the season,
  dealflow, the room, one winner.
- BANNED from the page forever — if any of these appear, the illusion
  dies: exclusive, luxury, premium, curated, elevated, unforgettable,
  experience. Also still avoid: bet, gamble, casino, jackpot, cash out,
  winnings, prize pool.
- "Networking" appears only to be dismissed ("Networking sucks. Poker
  doesn't.") — never as a description of what this is.
- Access framing: invite-only. "Seats are by invitation." Visible
  scarcity ("Nine seats a table.", "27 seats"). Never "sign up," "join
  the waitlist," or "apply" (the application is dormant). Withhold the
  venue: "Location shared with confirmed seats."
- Never mention data collection, graphs, or databases in user-facing
  copy — externally it's "every seat is decided."

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
- Forms: none mounted for MVP (application is dormant; its server
  action → Airtable code stays in the repo). No database, no CMS.

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
- Prize language per Prizes section — sponsor-funded, stated flat
- Stub a /rules page link in the footer (official contest rules:
  eligibility, no purchase necessary, prizes, tax note) — final text
  comes from a lawyer
- Footer disclaimer: events are private, invitation-based social
  events; nothing on this site is an offer of securities or investment
  advice

## Definition of done
- Hero scroll scrub is smooth (60fps on a mid-tier laptop, no jank on
  iPhone), reverses cleanly, and has a reduced-motion static fallback
- Lighthouse 90+ mobile for performance and accessibility despite the 3D
- A cold visitor understands what this is within one screen of scrolling
  and knows seats are by invitation within 10 seconds