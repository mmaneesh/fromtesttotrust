# From Test to Trust

Personal portfolio for Maneesh Maddala, a Principal SDET Engineer at Morningstar, Inc. The site presents experience, AI systems, speaking work, and field notes through a compact editorial interface.

**Live site:** [fromtesttotrust.com](https://fromtesttotrust.com)

## What this project is

This is a static Astro portfolio designed around one simple idea: quality engineering is broader than testing alone. The site connects test architecture, risk management, trustworthy AI, and the systems that make those practices repeatable.

The homepage is organized as a tabbed single-page experience:

- **About** — profile, current focus, and evidence-backed career metrics.
- **Experience** — career history and education.
- **AI Systems** — case-study cards and detail pages for agentic SDLC, model routing, guardrails/evals, and reusable skills.
- **Speaking** — talks and workshop material.

## What we built

- A responsive, editorial portfolio with light and dark themes.
- Keyboard-accessible tab navigation that keeps the active view in the URL hash (`#about`, `#experience`, `#ai-systems`, and `#speaking`).
- Data-driven content models for profile information, career history, AI systems, speaking, and field notes.
- Static detail pages for each AI system and speaking engagement.
- Distinct inline SVG field-note illustrations for each AI System card. Artwork intentionally swaps contrast by theme: light art on dark cards and dark art on light cards.
- Source-level regression tests that protect the AI System cards, Experience content, company naming, and hash navigation.

## Tech stack

| Area             | Technology                                                           |
| ---------------- | -------------------------------------------------------------------- |
| Framework        | [Astro](https://astro.build/) 4 with TypeScript                      |
| Styling          | [Tailwind CSS](https://tailwindcss.com/) 3 and CSS custom properties |
| Typography       | Inter, Newsreader, and Geist Mono fallbacks                          |
| Content          | Typed local data modules in `src/data/`                              |
| Testing          | Node.js built-in test runner                                         |
| Code quality     | ESLint, Prettier, Husky, and lint-staged                             |
| Deployment model | Static site generation                                               |

## Project structure

```text
src/
├── components/       Reusable UI, navigation, illustrations, and view modules
├── data/             Typed portfolio content
├── layouts/          Shared page shell and metadata
├── pages/            Homepage plus generated system and speaking pages
└── styles/           Global theme tokens and base styles
tests/                Source-contract regression tests
```

To update portfolio content, start in `src/data/`. Presentation changes generally belong in `src/components/` or `src/styles/global.css`.

## Run locally

### Prerequisites

- Node.js 18.17 or newer
- npm

### Install and start

```bash
git clone https://github.com/mmaneesh/fromtesttotrust.git
cd fromtesttotrust
npm install
npm run dev
```

Astro prints the local URL when it starts, usually `http://localhost:4321`.

Useful local URLs:

- `/#about`
- `/#experience`
- `/#ai-systems`
- `/#speaking`

## Commands

| Command                | Purpose                                         |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Start the development server with hot reload.   |
| `npm test`             | Run all regression tests.                       |
| `npm run lint`         | Run ESLint with warnings treated as errors.     |
| `npm run format:check` | Check formatting across the repository.         |
| `npm run format`       | Apply Prettier formatting.                      |
| `npm run build`        | Produce the static production build in `dist/`. |
| `npm run preview`      | Serve the production build locally.             |

Before opening a pull request, run:

```bash
npm test
npm run lint
npm run build
```

## How the site works

Astro builds the site statically. Content is kept in TypeScript data modules rather than a CMS, which keeps portfolio updates reviewable in version control. The homepage loads all four top-level views and the navigation controls visibility client-side; the active view is mirrored to the URL hash for shareable links and browser history consistency.

AI System and speaking detail pages are generated from the IDs defined in their respective data modules. The AI System cards use inline SVG artwork rather than external images, preserving sharp rendering, predictable theme contrast, and fast static delivery.

## Contributing

1. Create a branch from the latest `main`.
2. Make focused changes.
3. Add or update regression tests for behavior changes.
4. Run the verification commands above.
5. Open a pull request with a concise summary and verification results.

## License

This project is released under the [MIT License](LICENSE).
