# How I add a new project to my website

Projects live in one file: `data/projects.json`. You never need to touch any HTML.

## Steps

1. Open `data/projects.json` in any text editor (or GitHub's web editor if your site is on GitHub).
2. Copy one existing project object (the `{ ... }` block for one project) and paste it as a new item in the array — remember the comma between items.
3. Fill in the fields for your new project:

```json
{
  "slug": "unique-url-friendly-name",       // becomes project.html?slug=unique-url-friendly-name
  "title": "Full Project Title",
  "shortTitle": "Short Card Title",
  "category": "Category · Sub-category",
  "featured": false,                         // true = appears in the "Flagship Platforms" list
  "order": 5,                                // controls sort order (lower = earlier)
  "visibility": "public",                    // "public" | "unlisted" | "client-only"
  "summary": "One or two sentence description shown on cards.",
  "stats": [ { "label": "Something tracked", "value": "12" } ],
  "businessProblem": "What business problem existed?",
  "approach": "What analytical methodology / approach was used?",
  "modules": [ { "name": "Module name", "detail": "What it does." } ],
  "decisionSupport": ["Decision this supports", "Another decision"],
  "businessApplications": ["Application 1", "Application 2"],
  "usp": ["What sets it apart"],
  "technology": ["R", "Power BI", "..."],
  "dataNote": "Say clearly if the data shown is illustrative/synthetic.",
  "downloads": {
    "presentation": "assets/media/your-project/deck.pdf",
    "pdf": "assets/media/your-project/brief.pdf",
    "video": "https://www.youtube.com/embed/xxxx",
    "demoLink": "https://your-demo-url.com"
  },
  "tags": ["tag1", "tag2"]
}
```

4. Save the file. That's it — `portfolio.html`, the homepage flagship list, and `project.html` all read from this file automatically.
5. If you're hosting on Netlify/Cloudflare Pages connected to GitHub, just commit and push — the live site updates automatically within a minute or two.

## Visibility field

- `"public"` — shows everywhere.
- `"unlisted"` — the direct project.html?slug=... link works, but it won't appear in any grid or list. Useful for sharing a case study privately with one prospect before it's ready for everyone.
- `"client-only"` — treat as not ready to publish; not rendered by the current site logic (a future login-gated area could use this flag later).

## Fields that can be left out

Any field can be omitted if not applicable yet — the page will simply skip that section (e.g. no `decisionSupport` array means that block won't render).
