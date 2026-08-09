# ElectroLink BD — Authorized Partners Website

A Next.js (App Router) site with a home page and an interactive authorized
partner locator (retail chains + dealer points), built with Tailwind CSS and
Framer Motion.

## Stack

- **Next.js 15** (App Router, JavaScript)
- **Tailwind CSS 3**
- **Framer Motion** for page and interaction animations
- **lucide-react** for icons
- **Mapbox GL JS** (loaded via CDN, optional) for the interactive map

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Enabling the map (optional)

The `/partners` page works fully without any setup — search, tabs, and cards
all run on local data. To turn on the interactive map:

1. Create a free account at [mapbox.com](https://account.mapbox.com/) and copy
   your public token.
2. Copy `.env.local.example` to `.env.local` and paste your token:

   ```
   NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_token_here
   ```

3. Restart `npm run dev`.

Without a token, the map panel shows a placeholder instead of failing.

## Project structure

```
app/
  layout.js          Root layout (fonts, Navbar, Footer)
  page.js             Home page
  partners/page.js    Partner locator page
components/
  Navbar.js           Responsive nav with mobile menu
  Footer.js           Site footer
  Hero.js             Home page hero
  Features.js         "Why ElectroLink" section
  PartnerCTA.js        CTA banner linking to /partners
  AuthorizedPartners.js  Search, tabs, grid/list + map layout for /partners
  PartnerCard.js      Individual partner card (grid view)
  PartnerListRow.js   Individual partner row (list view)
  PartnersMap.js       Mapbox integration (client-only)
hooks/
  useLazyReveal.js    Progressive/lazy-loading logic for long lists
lib/
  partnersData.js     Retail chain and dealer point data
```

## Lazy loading & grid/list views

With 100+ dealer points, rendering everything on first paint would be
wasteful. `/partners` instead:

- Renders **12 items at a time** (`PAGE_SIZE` in `AuthorizedPartners.js`) and
  reveals the next batch automatically as you scroll, via the
  `useLazyReveal` hook (`IntersectionObserver` on a sentinel element).
- Also shows a "Load more" button under the list — useful for keyboard
  users, and as a fallback if `IntersectionObserver` isn't available.
- Resets to the first batch whenever the active tab or search query changes.
- Lets you flip between **Grid** and **List** view (top toolbar) — grid
  uses `PartnerCard`, list uses the more compact `PartnerListRow`, both
  fed by the same lazily-revealed slice of data.

## Editing partner data

All locations live in `lib/partnersData.js` as two plain arrays,
`retailChains` and `dealerPoints`. Add, edit, or remove entries there —
every field (`name`, `address`, `coordinates`, `phone`, `workingHours`,
`googleMapLink`) maps directly to what's shown on the card and map popup.
Entries without real `coordinates` (`null`) still show up in the list/search,
they just won't get a map pin.

## Customizing the brand

- Colors and fonts are defined as design tokens in `tailwind.config.js`
  (`teal`, `amber`, `ink`, `slate`, `paper`) and wired to Google Fonts
  (Space Grotesk, Inter, JetBrains Mono) in `app/layout.js`.
- Nav links live in `components/Navbar.js` (`NAV_LINKS`).
- Footer links and contact details live in `components/Footer.js`.
- "ElectroLink BD" is a placeholder brand name — swap it in `Navbar.js`,
  `Footer.js`, and `app/layout.js` metadata.

## Responsiveness

Every section is built mobile-first with Tailwind breakpoints (`sm`, `md`,
`lg`, `xl`): the navbar collapses to a slide-down menu below `md`, partner
cards reflow from 1 → 2 → 3 columns, and the map stacks above the list on
small screens.
