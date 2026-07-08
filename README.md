# Moldstep

Marketing website for Moldstep LLC — custom AI applications and IT services consulting.

## Stack

- [Astro 5](https://astro.build) — static site generator
- [TailwindCSS 4](https://tailwindcss.com) — styling
- Deployed on [Vercel](https://vercel.com)

## Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Deployment (Vercel)

1. Import this repo at [vercel.com/new](https://vercel.com/new).
2. Vercel auto-detects Astro — no configuration needed (output is fully static).
3. Every push to `main` deploys to production; branches get preview URLs.

## Project structure

```
src/
├── components/   # Header, Footer, CTA, shared sections
├── layouts/      # BaseLayout (head, meta, header/footer shell)
├── lib/site.ts   # All site content: nav, services, case studies
├── pages/        # index, services, work, about, contact, 404
└── styles/       # global.css (Tailwind theme + design tokens)
```

## Editing content

All copy for services and case studies lives in `src/lib/site.ts` — edit there, not in the page templates.

The contact form posts to Formspree: create a free form at [formspree.io](https://formspree.io) and replace `YOUR_FORM_ID` in `src/pages/contact.astro`.
