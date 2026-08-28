# Founders Game — site

Single-page marketing site for Founders Game: application-based, no-buy-in
poker nights seating founders and investors at the same table.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS v4, framer-motion for the
hero's scroll scrub and section reveals. Deploys on Vercel.

## Develop

```bash
npm install
npm run dev
```

## Notes

- The three hero chips are a rendered video (`public/test01.mp4`) scrubbed
  directly by scroll position, so scrolling back plays the motion in reverse.
- `prefers-reduced-motion` freezes the hero video at a static frame and
  disables reveals.

## Private invitation

The unlisted invitation uses one universal URL:

```text
/invite
```

The current Luma RSVP page is built in, and `NEXT_PUBLIC_LUMA_URL` can override
it for a future event. The supplied, cropped card artwork is stored at
`public/invite-card-face.png`; `INVITE_CARD_FACE_URL` can override it with an
absolute URL. The approved diamond back is stored at
`public/invite-card-back.png` and is also used for the link preview. The route
is excluded from search indexing so the unlisted invitation stays private.
Luma handles registration, confirmation email, calendar invites, mobile wallet
tickets, and event check-in after the handoff.
