# Lavan Kumar Vangapandu — People Analytics & HR Transformation

A static, content-driven consulting and portfolio website. No build step, no server, no database.

## What's here

```
index.html            Home
about.html             Career journey, competencies, education
what-i-do.html         Capability areas
portfolio.html         Portfolio listing (data-driven)
project.html           Project detail template (reads ?slug=... from projects.json)
insights.html          Insights & Resources library (data-driven, filterable)
media.html             Videos, presentations & webinars (data-driven, filterable)
consulting.html        Services, engagement models, contact form
data/
  projects.json        All portfolio projects — edit this to add/change projects
  articles.json         All insights/resources — edit this to add articles
  media.json            All videos/decks/webinars — edit this to add media
assets/
  css/style.css         All styling
  js/main.js             Shared nav + JSON loader
  js/portfolio.js        Renders portfolio grid + project detail pages
  js/insights.js         Renders insights grid + filters
  js/media.js            Renders media grid, filters + video lightbox
  js/contact.js          Contact form submission (set your endpoint here)
  media/                 PDFs, images, videos — organize by project slug
docs/
  HOW-TO-ADD-A-PROJECT.md
  HOW-TO-ADD-CONTENT.md
  HOW-TO-ADD-MEDIA.md
sitemap.xml, robots.txt  SEO
```

## Deploying for free

**Option A — Netlify (recommended, easiest)**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag this whole folder in.
3. You get a live URL like `yourname.netlify.app` instantly. Free tier, no credit card.
4. For auto-deploy on every edit: push this folder to a GitHub repo, then in Netlify choose "Import an existing project" and connect the repo instead.

**Option B — Cloudflare Pages**
1. Push this folder to a GitHub repository.
2. In the Cloudflare dashboard, create a Pages project connected to that repo.
3. Build command: none. Output directory: `/` (root).
4. You get `yourname.pages.dev` for free.

**Option C — GitHub Pages**
1. Push this folder to a GitHub repository named `yourusername.github.io` (for a user site) or any repo name (for a project site).
2. In the repo Settings → Pages, set the source to the root of the main branch.
3. You get `yourusername.github.io` (or `yourusername.github.io/reponame`) for free.

## Before going live, update:

1. Replace `https://lavankumar.example/` in `sitemap.xml`, `robots.txt`, and the `<link rel="canonical">` / Open Graph tags in `index.html` with your real domain once you have one (even the free `*.netlify.app` URL works fine to start).
2. Add real LinkedIn/YouTube links in every footer (`href="https://www.linkedin.com/"` placeholders).
3. **Set your contact form endpoint.** Open `assets/js/contact.js` and paste your Formspree (or similar) URL into `FORM_ENDPOINT` on line 9. Until you do, the form falls back to opening the visitor's email client — which works, but loses some visitors. This is the single highest-impact thing to do before launch.
4. Remove the three sample entries in `data/media.json` once you add your real videos and decks — see `docs/HOW-TO-ADD-MEDIA.md`.
5. As real project screenshots, PDFs, decks and videos become available, follow `docs/HOW-TO-ADD-A-PROJECT.md` and `docs/HOW-TO-ADD-MEDIA.md` to attach them.

## Connecting a custom domain later

All three hosts above support adding a custom domain for free (you only pay the domain registrar, typically $10–15/year). No code or architecture changes are required — you simply point the domain's DNS at the host and update the canonical URLs mentioned above.

## Adding an admin/CMS later

If hand-editing JSON ever becomes inconvenient, this structure can be connected to a free headless CMS (e.g. Decap CMS, formerly Netlify CMS) with a small config file, since content already lives in structured JSON. No redesign required — this was a deliberate architecture choice.
