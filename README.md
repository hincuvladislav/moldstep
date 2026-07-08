# Moldstep

Marketing website for **Moldstep LLC** — custom AI applications and IT services consulting.

Live stack: [Astro 5](https://astro.build) static site + [TailwindCSS 4](https://tailwindcss.com), deployed on [Vercel](https://vercel.com), forms delivered by [FormSubmit](https://formsubmit.co). No backend, no database, no CMS — content lives in code.

---

## 1. Local development

### Requirements

- **Node.js 20+** (developed on Node 24)
- npm (comes with Node)

### Setup

```bash
git clone https://github.com/hincuvladislav/moldstep.git
cd moldstep
npm install
npm run dev        # dev server at http://localhost:4321 with hot reload
```

Other commands:

```bash
npm run build      # production build to dist/
npm run preview    # serve the production build locally
```

The build must complete with `[build] Complete!` and zero errors before any deploy.

---

## 2. Project structure

```
src/
├── components/
│   ├── Header.astro          # Sticky nav + mobile hamburger menu
│   ├── Footer.astro          # Bottom bar (©, nav links) — embedded in dark sections
│   ├── CtaSection.astro      # Dark CTA band w/ optional floating 3D panels (home)
│   ├── MiniScene.astro       # Animated 3D CSS miniatures inside service cards
│   ├── CaseArt.astro         # Greyscale SVG illustrations for case studies
│   └── ProcessTimeline.astro # Auto-advancing "How we work" timeline
├── layouts/
│   └── BaseLayout.astro      # <head> meta/SEO + global JS (parallax, tilt, tap-expand)
├── lib/
│   └── site.ts               # ★ ALL content and config: nav, services, case studies,
│                             #   company info, form endpoint
├── pages/
│   ├── index.astro           # Home: hero, #services, #process, #work, #about, CTA
│   ├── contact.astro         # Quick contact form
│   ├── start-project.astro   # Detailed project-brief form
│   └── 404.astro
└── styles/
    └── global.css            # Design tokens (@theme), keyframes, shared utilities
public/
├── favicon.svg
└── robots.txt                # Points crawlers at the sitemap
```

**Navigation model:** the site is effectively single-page. Header links `Services`, `Work`, `About` scroll to home-page anchors (`/#services` etc.). Only `/contact` and `/start-project` are separate pages.

### Editing content

Everything textual lives in `src/lib/site.ts` — company name, email, nav, the six services, the case studies. Edit there, not in page templates. The `reasons` (About cards) and `stats` (hero numbers) arrays live at the top of `src/pages/index.astro`.

### Design system

- Colors are defined once in `src/styles/global.css` under `@theme` (dark: `night`, `edge-*`, `dusk-*`; light: `ink`, `line`, `surface-*`). Use the token classes (`bg-night`, `text-dusk-2`, …), not raw hex.
- Font: Space Grotesk (self-hosted via `@fontsource-variable/space-grotesk`).
- Interactive effects are data-attribute driven (wired in `BaseLayout.astro`):
  - `data-parallax` (zone) + `data-scene` (child) → mouse-parallax 3D scenes; `data-base-x/y`, `data-range-x/y` set angles. `--bx`/`--by` CSS vars drive the idle sway on touch devices.
  - `data-expand` → cards that expand on hover (desktop), tap (touch), or focus (keyboard); the reveal block has class `expandable`.
  - `data-tilt` / `data-lift` → 3D tilt-on-hover cards.
- `prefers-reduced-motion` disables all decorative animation.

---

## 3. Forms (FormSubmit)

Both forms — **Contact** (`/contact`) and **Start a project** (`/start-project`) — POST to FormSubmit's AJAX endpoint. **No FormSubmit account exists or is needed**; the service is keyed to a destination email address.

### How it's wired

- Endpoint is defined once: **`formEndpoint` in `src/lib/site.ts`**:
  ```ts
  export const formEndpoint = "https://formsubmit.co/ajax/<DESTINATION_EMAIL>";
  ```
- Each form sends hidden fields:
  - `form` — `contact` or `project-brief` (tells submissions apart)
  - `_subject` — the email subject line
  - `_template: table` — formats the email as a table
  - `_captcha: false` — disables FormSubmit's captcha page
- The client JS treats a submission as delivered **only if the JSON response has `success: "true"`** — FormSubmit returns HTTP 200 even on failure, so do not "simplify" this to a status check. On failure the user sees an inline error with a mailto fallback.

### Activation (required once per email + domain)

FormSubmit requires a one-time activation:

1. Submit either form once from the site.
2. FormSubmit emails an **"Activate Form"** link to the destination address.
3. Click it. All subsequent submissions are delivered.

Activation is tied to the **origin domain**, so expect to activate twice: once during local dev (`localhost`) and once after the first submission from the production domain.

### Production checklist for forms

1. Decide the real destination inbox (e.g. `hello@moldstep.com` once that mailbox exists) and update `formEndpoint` in `src/lib/site.ts`.
2. Deploy, submit a test message from the production site, click the activation link that arrives.
3. Submit one more test from each form (`/contact` and `/start-project`) and confirm both emails arrive with the right subject.
4. **Privacy (recommended):** after activation, FormSubmit provides a random alias for the address (see their docs / activation email). Swap the alias into `formEndpoint` so the raw email is not exposed in the page source.

---

## 4. Deploying to production (Vercel)

The site is fully static (`astro build` → `dist/`) — no adapter, no server functions, no environment variables required.

### First-time setup (on the deploying account)

1. Ensure the deploying account has access to the GitHub repo (fork or transfer, or add as collaborator).
2. Go to [vercel.com/new](https://vercel.com/new) → **Import** the repo.
3. Vercel auto-detects **Astro**. Defaults are correct:
   - Build command: `astro build` (or `npm run build`)
   - Output directory: `dist`
   - Install command: `npm install`
4. Deploy. Every push to `main` becomes a production deploy; every branch/PR gets a preview URL.

### Custom domain

1. Vercel project → **Settings → Domains** → add the production domain and follow the DNS instructions.
2. If the domain is **not** `moldstep.com`, update the canonical URL in **two places** and redeploy:
   - `site` in `astro.config.mjs` (drives sitemap + canonical URLs)
   - `site.url` in `src/lib/site.ts`
   - also update the `Sitemap:` line in `public/robots.txt`

### Post-deploy checklist

- [ ] All pages load: `/`, `/contact`, `/start-project`, and a bogus URL renders the 404 page
- [ ] Header anchors scroll to the right home sections
- [ ] `https://<domain>/sitemap-index.xml` and `/robots.txt` resolve
- [ ] Forms: activation done on the production domain, test submissions arrive (section 3)
- [ ] Check the site on a phone: cards expand on tap, menu closes after tapping a link

---

## 5. Known gaps / nice-to-haves

- **OG image**: `og:image` is not set — social shares have no preview card. Add a 1200×630 image to `public/` and a meta tag in `BaseLayout.astro`.
- **Case studies** are realistic placeholders — swap in real projects in `src/lib/site.ts` when available.
- **Analytics**: none installed. On Vercel, enabling Web Analytics in the dashboard + `@vercel/analytics` is the lightest option.
- `hello@moldstep.com` is displayed on the site but the mailbox may not exist yet — set up mail for the domain or change `site.email`.
