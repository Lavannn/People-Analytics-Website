# How I add a video, presentation, or webinar

All media lives in one file: `data/media.json`. You never touch any HTML.

Each entry appears on the **Media** page automatically, and entries marked `"featured": true` also show in the teaser on the homepage.

## The three types

| Type | What it does | Which field to fill |
|---|---|---|
| `Video` | Plays in a popup player on the page, without leaving the site | `embedUrl` |
| `Webinar` | Same as Video — just labelled differently in the filter bar | `embedUrl` |
| `Presentation` | Opens a PDF/deck in a new tab | `externalUrl` |

## Adding a video or webinar (YouTube / Vimeo)

1. Upload the video to YouTube or Vimeo. **Unlisted works fine** — it won't be publicly searchable, but it will still play on your site.
2. Get the **embed** URL, not the normal watch URL:
   - YouTube watch URL: `https://www.youtube.com/watch?v=ABC123`
   - Embed URL to use: `https://www.youtube.com/embed/ABC123`
   - Vimeo embed URL: `https://player.vimeo.com/video/123456789`
3. Add an entry to `data/media.json`:

```json
{
  "slug": "attrition-model-walkthrough",
  "title": "Walkthrough: Building an Attrition Prediction Model",
  "type": "Video",
  "category": "People Analytics",
  "date": "2026-01-15",
  "description": "One or two sentences shown on the card.",
  "thumbnail": "",
  "embedUrl": "https://www.youtube.com/embed/ABC123",
  "externalUrl": "",
  "duration": "12 min",
  "featured": true,
  "visibility": "public"
}
```

**Why YouTube/Vimeo instead of uploading the file?** Free static hosts (GitHub Pages, Netlify, Cloudflare Pages) are not built to stream large video files, and GitHub in particular has file size limits. Hosting video externally keeps your site fast and stays comfortably inside every free tier.

## Adding a presentation or deck

1. **Export your PPT/PPTX to PDF first.** Browsers display PDFs natively; they cannot display .pptx files, which will simply download instead of opening.
2. Put the PDF in `assets/media/<slug>/`, e.g. `assets/media/workforce-planning/briefing.pdf`
3. Add the entry with `type` set to `Presentation` and the path in `externalUrl`:

```json
{
  "slug": "workforce-planning-briefing",
  "title": "Workforce Planning Maturity — Executive Briefing",
  "type": "Presentation",
  "category": "Workforce Intelligence",
  "date": "2025-11-03",
  "description": "The deck used to brief an ExCo on scenario-based workforce planning.",
  "thumbnail": "",
  "embedUrl": "",
  "externalUrl": "assets/media/workforce-planning/briefing.pdf",
  "duration": "24 slides",
  "featured": true,
  "visibility": "public"
}
```

Keep PDFs under ~20MB. If a deck is image-heavy, compress it before uploading (most PDF exporters have a "reduced size" or "web" option).

## Thumbnails (optional but recommended)

If `thumbnail` is left as `""`, the card shows a clean branded gradient with a play/slide icon — it looks intentional, not broken, so you can launch without any images at all.

To use a real thumbnail: save a 16:9 image (1280×720 is ideal) into `assets/media/<slug>/` and set the path:
```json
"thumbnail": "assets/media/workforce-planning/thumb.jpg"
```

A good thumbnail is usually a screenshot of the dashboard or the title slide — visitors decide whether to click based on this.

## Field reference

| Field | Required | Notes |
|---|---|---|
| `slug` | yes | Unique, url-friendly. Used internally. |
| `title` | yes | Shown on the card. |
| `type` | yes | `Video` \| `Webinar` \| `Presentation`. Drives the filter bar. |
| `category` | yes | Free text, e.g. "People Analytics". Shown in the card meta line. |
| `date` | no | `YYYY-MM-DD`. For your own ordering reference. |
| `description` | no | One or two sentences. |
| `thumbnail` | no | Leave `""` for the branded fallback. |
| `embedUrl` | for video | Must be the **embed** URL. |
| `externalUrl` | for decks | Local path or external link. |
| `duration` | no | e.g. "12 min", "24 slides". |
| `featured` | no | `true` = also appears on the homepage teaser. |
| `visibility` | yes | `"public"` shows it. Anything else hides it. |
| `demo` | no | `true` adds an "Illustrative example" badge. **Remove this from the sample entries once you add your real content.** |

## Removing the sample entries

`data/media.json` ships with three placeholder entries so you can see the layout working. When you add your first real item, delete the samples — or set their `visibility` to `"draft"` to hide them without losing the template.

## Filter bar

The filter chips on the Media page are generated automatically from whatever `type` values exist in the file. Add a new type (e.g. `"Podcast"`) and a new filter chip appears on its own — no code change.
