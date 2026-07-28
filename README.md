# Founders Game — site

Single-page marketing site for Founders Game: invite-only, no-buy-in
poker nights seating founders and investors at the same table. Seats are
by invitation; there is no application or waitlist on the site.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS v4, framer-motion for
the hero scroll scrub and section reveals. Deploys on Vercel.

## Develop

```bash
npm install
npm run dev
```

## Hero

The chips are a rendered video (`public/test01.mp4`) scrubbed by scroll
position — `ChipVideo` maps hero scroll progress to `currentTime`, so
scrolling back plays it in reverse. `prefers-reduced-motion` collapses
the hero to a single viewport frozen at a mid-scroll frame.

## Application form (dormant)

The site is invite-only for now, so the application form is unmounted.
`components/ApplicationForm.tsx` and its server action (`app/actions.ts`)
stay in the repo and must keep compiling in case it returns as a
request-an-invite form. With no env vars set the action logs submissions
server-side and still succeeds; to wire up Airtable, copy `.env.example`
to `.env.local` and fill in the keys.
