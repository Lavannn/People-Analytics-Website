# How I add a new PDF / PPT / video / article

## Adding a downloadable file (PDF, PPT, PPTX, XLSX) to a project

1. Put the file in `assets/media/<project-slug>/` — create the folder if it doesn't exist.
   Example: `assets/media/ml-studio/ml-studio-overview.pdf`
2. Open `data/projects.json`, find the project, and point the relevant `downloads` field at that path:
   ```json
   "downloads": {
     "presentation": "assets/media/ml-studio/ml-studio-overview.pdf"
   }
   ```
3. Save and publish. The download chip on that project's page will now be a live link instead of "coming soon."

Keep individual files under ~20MB where possible — most free static hosts are fine with this, but very large video files are better hosted on YouTube/Vimeo and embedded instead (see below).

## Adding a video

- **Preferred:** upload to YouTube or Vimeo (unlisted is fine if you don't want it publicly searchable), then set:
  ```json
  "downloads": { "video": "https://www.youtube.com/embed/VIDEO_ID" }
  ```
- **Self-hosted:** only for short clips. Put the `.mp4` in `assets/media/<project-slug>/` and link to it directly the same way as a PDF.

## Adding an article, whitepaper, or case study to Insights & Resources

Open `data/articles.json` (currently empty — `[]`) and add an object:

```json
{
  "title": "Article title",
  "category": "People Analytics",     // any of: People Analytics, Workforce Intelligence, HR Transformation,
                                        // Machine Learning, Statistics, Employee Listening, Organization Analytics,
                                        // Skills Intelligence, AI & HR, Workforce Planning
  "type": "Article",                   // Article | Whitepaper | Case Study | Framework | Video
  "excerpt": "One or two sentence summary shown on the card.",
  "link": "assets/media/insights/my-article.pdf",   // or an external URL
  "visibility": "public"
}
```

The Insights page filter bar is generated automatically from whatever categories appear in this file — no other changes needed.

## Setting up the contact form to email you directly (optional, recommended)

The form on `consulting.html` currently uses a `mailto:` fallback, which opens the visitor's own email client — this works everywhere with zero setup, but some visitors on mobile without a configured mail app won't be able to send it easily.

To receive submissions directly without that limitation:
1. Create a free account at [formspree.io](https://formspree.io) (or a similar free form backend).
2. Create a new form and copy the endpoint URL it gives you.
3. In `consulting.html`, replace:
   ```html
   <form class="enquiry" action="mailto:lvangapandu@gmail.com" method="post" enctype="text/plain">
   ```
   with:
   ```html
   <form class="enquiry" action="https://formspree.io/f/your-id" method="POST">
   ```
4. Publish. Submissions will now arrive in your inbox via Formspree's free tier (typically up to 50 submissions/month).
