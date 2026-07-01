# Platov Generalcon — Website

A single-page site for Platov Generalcon (painting, drywall, flooring, decks, tile, renovations, home maintenance, and lock installation), built in plain HTML/CSS/JS so it can be hosted for free on GitHub Pages.

```
platov-generalcon/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    └── gallery/        ← put your real job photos in here
```

## 1. Things to customize before launch

Open `index.html` and search for these — they're placeholders:

| What | Find | Where |
|---|---|---|
| Instagram link | `https://www.instagram.com/platovgeneralcon` | header, hero, gallery, contact, footer (6 spots — same URL everywhere, so a find-and-replace-all works) |
| Service area | `<!-- TODO: add your service area -->` | hero eyebrow line, About card |
| About bio | `<!-- TODO: add a sentence or two... -->` | About section |
| Phone/email | commented block in the Contact section | only add this if you actually want it public |

**Tip:** in most editors (VS Code, Sublime, etc.) you can use Find & Replace across the file — search `platovgeneralcon` and swap in your real handle once.

## 2. Adding your real photos

The gallery currently shows styled placeholder tiles (a dashed "Add photo" icon) instead of fake stock images — so the site never claims work that isn't yours.

To swap one in:

1. Drop your photo into `assets/gallery/` (JPGs around 1200px wide load fast; keep each file under ~500KB if you can — [squoosh.app](https://squoosh.app) is a free way to compress).
2. In `index.html`, find the matching tile, e.g.:
   ```html
   <div class="tile-media" style="background-image:url('assets/gallery/REPLACE-painting.jpg')">
   ```
3. Change `REPLACE-painting.jpg` to your actual filename, e.g. `painting-colonial-exterior.jpg`.
4. Update the caption text in the `<figcaption>` right below it.

The placeholder icon disappears automatically once a real image loads behind it.

To add more tiles, copy one whole `<figure class="tile">...</figure>` block and paste it into the `.tile-grid` div.

## 3. Showing video clips

GitHub Pages isn't a great place to host raw video files (slow, eats your repo's storage). Instead, two of the gallery tiles are set up as **clip tiles** that link straight out to an Instagram post or Reel:

```html
<a class="tile tile-clip" href="https://www.instagram.com/p/YOUR_POST_ID/" target="_blank" rel="noopener">
```

Just point the `href` at the specific post/Reel URL. To add more, copy a `tile-clip` block.

If you'd rather self-host a short clip, you can replace a tile's contents with a native `<video>` tag instead:
```html
<video class="tile-media" src="assets/gallery/deck-rebuild.mp4" controls muted playsinline poster="assets/gallery/deck-rebuild-poster.jpg"></video>
```
Keep clips short and compressed (under ~15MB) since GitHub has file size limits.

## 4. Preview it locally

You can just double-click `index.html` to open it in a browser. For a closer-to-production preview (so relative paths behave exactly like they will live), run a tiny local server from this folder:

```bash
python3 -m http.server 8000
```
then visit `http://localhost:8000`.

## 5. Publish with GitHub Pages

1. **Create a repository.** On [github.com](https://github.com), click **New repository**. Name it whatever you like (e.g. `platov-generalcon`). Keep it **Public** (required for free GitHub Pages on a personal account).
2. **Upload the files.** Easiest path if you're not using git on the command line:
   - Open your new repo → **Add file → Upload files**.
   - Drag in `index.html`, the `css` folder, the `js` folder, and the `assets` folder.
   - Commit the changes.

   Or, with git installed locally:
   ```bash
   cd platov-generalcon
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/platov-generalcon.git
   git push -u origin main
   ```
3. **Turn on Pages.** In the repo, go to **Settings → Pages**. Under "Build and deployment," set **Source** to **Deploy from a branch**, set the branch to **main** and the folder to **/ (root)**, then **Save**.
4. **Wait ~1 minute**, then refresh that Pages settings tab — it'll show your live URL, something like:
   ```
   https://YOUR-USERNAME.github.io/platov-generalcon/
   ```
5. **Future updates:** any time you edit a file and push (or re-upload it through the GitHub web UI), the live site updates automatically within a minute or two.

### Optional: a custom domain

If you buy a domain (e.g. `platovgeneralcon.com`), go to **Settings → Pages → Custom domain**, enter it there, and add the DNS records GitHub shows you at your domain registrar. GitHub will also provision free HTTPS for it.

## Notes

- The ruler/tape-measure graphic, the service ticker, and the "job ticket" styling on the service and gallery cards are all done in CSS/SVG — no images required, so the site stays fast.
- Fonts (Big Shoulders Display, Inter, JetBrains Mono) load from Google Fonts via the `<link>` tags in `index.html` — no install needed, just requires the visitor to be online, which they will be.
- The site is responsive down to small phones and respects `prefers-reduced-motion` for the ticker animation.
