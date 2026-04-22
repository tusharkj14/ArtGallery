# Art Gallery

A small browse-the-museum app, now backed by The Metropolitan Museum of Art's open
Collection API. Search works and artists, click any result to read its full record.

```bash
npm install
npm start      # http://localhost:4200
```

---

## Why I revisited it

I built the original version of this around three years ago as a way to learn Angular.
Coming back to it in 2026, basically everything was wearing its age: the API I had
pointed at was returning 403s on the image host, Angular 15 was already end-of-life,
`@angular/material@7` was paired with `@angular/core@15` (a mismatch that only ever
worked by luck), `@angular/flex-layout` had been deprecated, and the UI itself had the
classic "I just learned Bootstrap" fingerprint - dark green sidebar, cards that
scaled to 1.5x on hover and overlapped their neighbors, bright blue link-colored titles.

Rather than patch it, I did it in passes.

## What I changed, and how

### 1. Swapped out the API

The Art Institute of Chicago's IIIF image host had quietly moved behind Cloudflare with
`Cross-Origin-Resource-Policy: same-origin`, which meant every image in the deployed app
was returning 403. The JSON endpoints still worked, but without images the app was
meaningless.

I moved the whole data layer to the [Metropolitan Museum of Art Collection API](https://metmuseum.github.io/).
It's a close fit - no API key, CC0 licensed, and the image host sends
`Access-Control-Allow-Origin: *` so cross-origin loads just work. The only real adjustment
was that Met's `/search` only returns object IDs, so I have to follow up with a
`forkJoin` over `/objects/:id` to get the actual records. I cap it at 30 results per
search and drop any object whose `primaryImageSmall` is empty (common for non-public-domain
works).

I also switched from bare `fetch` to Angular's `HttpClient` while I was in there.

### 2. Fixed the small things that had accumulated

- `import { nextTick } from 'process'` sitting unused in a browser component.
- A dead `routerUrl()` method that built `/open/:${id}` with a stray colon.

### 3. Straightened out the dependency tree

- Bumped `@angular/material` from `^7.3.7` to match core.
- Dropped `@angular/flex-layout` entirely. Rewrote the three templates that used
  `fxLayout`/`fxFlex` in plain CSS (flexbox + a media query).
- Later, dropped Bootstrap too - it was fighting Material and inflating the bundle.

### 4. Upgraded Angular

I walked the project up six major versions, one at a time, running `ng update` for both
core and Material at each step and building between each:

| From &rarr; To | Notable schematic work |
|:---:|---|
| 15 &rarr; 16 | `zone.js` bump |
| 16 &rarr; 17 | `angular.json` cleanup |
| 17 &rarr; 18 | `HttpClientModule` auto-migrated to `provideHttpClient(withInterceptorsFromDi())` |
| 18 &rarr; 19 | Every component got an explicit `standalone: false` flag (keeps the NgModule shape) |

I stopped at Angular 19.2 because Angular 20+ needs Node 20.19+ or 22.12+ and my local
Node is 20.18. One `nvm` upgrade away from finishing the climb to 21.

### 5. Rewrote the UI

The old version had a dark green sidebar with an inline search, a Bootstrap grid of cards,
and a hover effect that zoomed each card to 1.5x so hovered cards physically overlapped
their neighbors. I tore it all out and rebuilt:

- **Sticky glassmorphic top bar** holding the logo, a centered search with an
  Artwork/Artist segmented toggle, a dark-mode toggle, and a GitHub link. One bar, every
  page. It reads and writes the URL (see below), so reloading preserves your search.
- **Hero landing** - when no search is active, a big editorial serif title, a lead
  paragraph, and six "try" chips (Van Gogh, Monet, Hokusai, Sunflowers, Starry Night,
  Portrait) that fire real searches. Replaces the old sidebar entirely.
- **Responsive card grid** using CSS grid's `repeat(auto-fill, minmax(240px, 1fr))`. No
  more hover-scale; cards lift on hover and the image subtly zooms within its frame.
- **Skeleton loaders** while the Met API is being walked - shimmering
  placeholder cards instead of a single spinner.
- **Empty state** for zero-result searches with a hint and the
  Artwork/Artist scope in context.
- **Detail page** - two-column with the image on the left, a sticky metadata
  column on the right with a proper `<dl>` of Date, Medium, Dimensions, Origin,
  Classification, Accession, plus tag pills and a "View on metmuseum.org" link.
- **Dark mode** via a `ThemeService` that toggles a `.dark` class on `<body>`, persists
  in `localStorage`, and defaults to `prefers-color-scheme`. Everything is driven by CSS
  custom properties (`--surface`, `--text`, `--accent`, ...) so there's exactly one place
  to change any color.
- **Typography** - [Inter](https://rsms.me/inter/) for UI, Fraunces for editorial
  display (the hero title, artwork titles, detail headings). Italicized serif for the
  accent word.

### 6. Made search state live in the URL

Originally, typing a query just called the service - the URL never changed. That
meant you couldn't share, bookmark, or reload a search, and browser back/forward between
searches didn't work (there were no history entries to navigate between).

Now the search lives in query params: `/?q=Van+Gogh&scope=Artist`. The header writes to
those params on submit, and the landing component reads them via `route.queryParamMap` to
fire the actual search. Reloads restore state, browser history works through the whole
search chain, and individual searches are shareable URLs.

## Layout

```
src/app/
  app.module.ts            // Single NgModule; HttpClient provided via provideHttpClient
  app-routing.module.ts    // '/'  and  '/open/:id'
  artworks.service.ts      // HttpClient + forkJoin against the Met API
  config.ts                // Endpoints + scope mapping
  theme.service.ts         // Dark-mode toggle (signal-backed)
  header/                  // Top bar, search, dark toggle
  landing/                 // Hero + query-param driven search
  result/                  // Grid, skeletons, empty state
  list-item/               // Individual card
  full-view/               // Detail page
  footer/                  // Attribution
```

## What I didn't get to

- **Pagination / infinite scroll.** Currently capped at 30 results per search. Met
  returns all matching IDs, so adding pagination is just slicing further into the array.
- **Tests.** Karma was deprecated in Angular 18. The existing specs still run, but I'd
  swap to Jest or Vitest before adding any new ones.

## Data &amp; credits

Data and images come from the
[Metropolitan Museum of Art Collection API](https://metmuseum.github.io/), licensed
CC0 1.0 Universal.
