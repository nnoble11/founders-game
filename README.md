# Founders Game — site

Single-page marketing site for Founders Game: application-based, no-buy-in
poker nights seating founders and investors at the same table.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS v4, Three.js via
@react-three/fiber for the hero chips, framer-motion for scroll scrub and
section reveals. Deploys on Vercel.

## Develop

```bash
npm install
npm run dev
```

## Application form backend

The form posts through a server action (`app/actions.ts`). With no env vars
set it logs submissions server-side and still succeeds, so the site works end
to end before the backend decision is final. To wire up Airtable, copy
`.env.example` to `.env.local` and fill in the keys.

## Notes

- The three hero chips are procedural Three.js placeholders; a rendered chip
  video will replace them later. The scroll scrub plumbing stays the same.
- `prefers-reduced-motion` freezes the hero at a static frame and disables
  reveals; no-WebGL browsers get a flat CSS fallback.
