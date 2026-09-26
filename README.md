# portfolio-maxxing

Retro video-game portfolio site for Jethro Clein David. React + Vite + TypeScript,
client-side routing, static export hosted on Firebase Hosting.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:5173 in a browser.

## Build & preview

```sh
npm run build
npm run preview
```

## Deploy to Firebase Hosting

```sh
npm run build
firebase use --add      # first time only: link a Firebase project
firebase deploy
```

`firebase.json` already maps all routes to `/index.html` so client-side routing
works on the static host.

## Routes

- `/` — showcase: neofetch hero + all projects with read-more links
- `/projects/:slug` — project detail (zerosum, pineapple-agent, password-manager,
  automation-system, noted)

All site content lives in `src/data/portfolio.ts` — edit that file to update
copy without touching layout code.

## Demo videos

Each project detail page embeds demo clips, wired via the `demos` array in
`portfolio.ts` (`src` = video URL, `filename` = label, `caption` = subtext).
`src` can be a local file under `public/demos/` or a remote URL —
pineapple-agent streams its two real clips from its live Firebase site.
Entries pointing at a missing file render a styled "demo offline" panel
instead of a broken player, so unfinished demos degrade gracefully.
Local clips are git-ignored (video files are heavy).
