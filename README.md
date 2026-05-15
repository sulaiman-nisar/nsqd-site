# NSQD Site

Bespoke fabrication and brand activation. Dubai + Cape Town.

Production site: [nsqd.co](https://nsqd.co)

## Stack

- **Astro** + **MDX** — static-first, file-based content
- **Tailwind CSS** — utility-first styling, brand tokens in `tailwind.config.mjs`
- **GSAP** — hero rotation (Phase 2), pipeline animation (Phase 2)
- **Lenis** — smooth scroll site-wide, respects `prefers-reduced-motion`
- **Resend** — transactional email for the contact form
- **Plausible** — privacy-respecting analytics, no cookies
- **Cloudflare Pages** — hosting, auto-deploy from GitHub on push

## Run locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static build → dist/
npm run preview  # serve the built site
```

## Deploy

Cloudflare Pages, connected to this GitHub repo. Every push to `main` builds and ships.

Build settings in the Cloudflare dashboard:
- **Framework preset:** Astro
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node version:** 20 (set `NODE_VERSION=20` under Environment Variables if needed)

## Environment variables

Copy `.env.example` to `.env` for local dev. In production, set these in
**Cloudflare Pages → Settings → Environment variables**.

| Variable | Where | Notes |
|---|---|---|
| `PUBLIC_SITE_URL` | Production | `https://nsqd.co` |
| `PUBLIC_WHATSAPP_PROJECTS` | Public | `971551476222` (Sulaiman) |
| `PUBLIC_WHATSAPP_QUOTES` | Public | `971502753175` (Pranav) |
| `PUBLIC_INSTAGRAM_URL` | Public | Instagram URL |
| `PUBLIC_LINKEDIN_URL` | Public | LinkedIn URL |
| `PUBLIC_PLAUSIBLE_DOMAIN` | Public | `nsqd.co` |
| `RESEND_API_KEY` | **Server only** | `re_xxx` from resend.com/api-keys |
| `CONTACT_TO_PROJECTS` | Server only | `sulaiman@nsqd.co` |
| `CONTACT_TO_QUOTES` | Server only | `pranav@nsqd.co` |
| `CONTACT_FROM` | Server only | `NSQD Site <noreply@nsqd.co>` — sender domain must be verified in Resend |

## Contact form routing

Subject dropdown drives the recipient:

- **New project / Partnership / Other** → `sulaiman@nsqd.co`
- **Quote request** → `pranav@nsqd.co`

Handler: `functions/api/contact.ts` (Cloudflare Pages Function).

## Photography assets

Drop new images into `/public/images/` under the right subfolder. Filenames must
be kebab-case and match what's referenced in components and MDX frontmatter.

### Folder map

```
public/images/
├── hero/                      # Homepage hero
│   └── apc-scale-model-hero.jpg
├── work/                      # Case study heroes + galleries
│   ├── 1rebel-spin-wheel-hero.jpg
│   ├── apc-scale-model-hero.jpg          + -01.jpg, -02.jpg, …
│   ├── people-and-co-union-day-hero.jpg
│   ├── nyu-trophy-hero.jpg
│   └── graff-hero.jpg
├── project-types/             # Bento tile imagery (Track A)
│   ├── activations-that-move.jpg
│   ├── brand-objects-at-scale.jpg
│   ├── precision-pieces.jpg
│   └── print-and-apply.jpg
├── logos/                     # Client logos — SVG preferred
└── studio/                    # Jebel Ali + Cape Town studio shots
```

### Photo specs

- **Format:** high-quality JPEG, sRGB color profile
- **Min long-edge:** 2400px · **Hero:** 3200px+
- **Naming:** kebab-case, descriptive (`apc-scale-model-hero.jpg`, `1rebel-spin-wheel-01.jpg`)
- **Backgrounds:** dark or seamlessly isolatable preferred
- **Optimization:** Cloudflare Images CDN handles resizing — upload originals

## Adding a case study

1. Drop hero image into `/public/images/work/{slug}-hero.jpg`
2. Drop gallery shots into `/public/images/work/{slug}-01.jpg`, `-02.jpg`…
3. Create `/src/content/work/{slug}.mdx` with frontmatter (see existing files for shape)
4. Push to `main` → Cloudflare auto-builds the new page at `/work/{slug}`

## Brand system (do not drift)

- Background `#0A0A0A` · Text `#FFFFFF` · Highlight `#FFB600` (saffron amber)
- Primary font: **Poppins** · Secondary: **IBM Plex Sans**
- Yellow is a highlighter — never a button color. WhatsApp green is the action.
- Voice: confident, not corporate. Show the craft. Name brands, numbers, deadlines.
- Forbidden: agency-speak, editorial-modernist polish, serif display, marquees, animated cursors, licensed-IP imagery.

## Project phases

- **Phase 1** (current) — full static site, contact form, WhatsApp wiring, static hero image
- **Phase 2** — 3D rotating APC hero (Three.js, GLB), The Floor pipeline animation (GSAP MotionPath, full motion + material realism), capability tile mini-demos
- **Phase 3** (if earned) — sector pages, materials library, journal

## Domain note

Currently on `nsqd.co`. When `.com` is secured, add it as a second custom domain
in Cloudflare with a 301 redirect to `.co`. No code change required.
