# Hunkkngor Creative Studio

Responsive static portfolio website, hosted on Netlify and backed up in GitHub.

## Current files
- `index.html`, `styles.css`, `script.js` — homepage and visual design
- `portfolio/` — three separate portfolio collection pages
- `portfolio.js` — renders published media from the catalogue
- `media.json` — portfolio catalogue (currently empty; no sample projects are presented as real work)

## Portfolio categories
- `frame-by-frame` — video and visual stories
- `colour-in-thought` — digital image work
- `words-that-move` — writing and sound

## Media catalogue format
Each published item can use: `title`, `description`, `category`, `type`, `status`, and `url`. Example (replace with your own real content):

```json
{
  "version": 1,
  "items": [
    {
      "title": "My video project",
      "description": "A short description.",
      "category": "frame-by-frame",
      "type": "Video",
      "status": "published",
      "url": "https://youtu.be/VIDEO_ID"
    }
  ]
}
```

YouTube URLs are embedded using the privacy-enhanced YouTube player. Direct image URLs and direct video file URLs can display previews. Other social platforms may restrict embeds; in those cases the page preserves a link to the original post. Do not use private or restricted posts as public portfolio items.

## Deployment
Upload the contents of this folder to the root of the connected GitHub repository. Netlify should use branch `main`, no build command, and publish directory `.`.

## Next planned stage
Add an owner-only admin login and protected Netlify Functions to validate and save catalogue changes. The browser must never contain a GitHub token or other deployment secret.
