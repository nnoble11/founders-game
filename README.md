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

The clip must be encoded all-intra (every frame a keyframe): a seek can
only paint after decoding from the previous keyframe, so sparse
keyframes make the scrub stutter. When swapping in a new render:

```bash
ffmpeg -i render.mp4 -c:v libx264 -preset veryslow -crf 22 -g 1 \
  -pix_fmt yuv420p -movflags +faststart -an public/test01.mp4
```

If the new clip's frame rate differs from 24 fps, update `FPS` in
`components/ChipVideo.tsx`.

## Game 001 archival plate (trial)

The Game 001 section shows a duotone photograph (`public/game001.jpg`).
The bone-on-black duotone is applied in CSS (grayscale + a bone-colored
multiply overlay), so the file itself should be a plain high-contrast
grayscale scan — swap the file and the treatment follows, no code
change. The current file is a placeholder frame from the chip render;
the intended image is the 1943 OWI boarding-house poker game photograph
from the Library of Congress [FSA/OWI collection](https://www.loc.gov/pictures/collection/fsa/)
(public domain — download the highest-res JPEG from the item page,
export as grayscale JPEG ~1920px wide). Update the `alt` text in
`components/GameOne.tsx` if a different photograph is chosen.

## Application form (dormant)

The site is invite-only for now, so the application form is unmounted.
`components/ApplicationForm.tsx` and its server action (`app/actions.ts`)
stay in the repo and must keep compiling in case it returns as a
request-an-invite form. With no env vars set the action logs submissions
server-side and still succeeds; to wire up Airtable, copy `.env.example`
to `.env.local` and fill in the keys.
