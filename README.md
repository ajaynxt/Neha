# AJAY NXT Portfolio

Cinematic, scroll-led portfolio website for **Ajay Saini / AJAY NXT**.

## Included

- Scroll-scrub cinematic hero video
- Featured client + selected demo work
- Filterable library of 25 live demo websites
- Playable Video Editing section with modal player
- Skills / capabilities and about section
- Contact + social links
- Fully responsive desktop/mobile layout
- Reduced-motion accessibility fallback
- No build step: plain HTML, CSS and JavaScript

## Run locally

Because the site loads local MP4 assets, use a small local server rather than opening `index.html` directly.

### Python

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## GitHub Pages

1. Create a new GitHub repository.
2. Upload all files and folders from this ZIP to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select `main` and `/ (root)` and save.

## Video note

The site currently contains the 4 Video Editing films supplied for the portfolio. The grid can accept a fifth film later by duplicating one `.film-card` block in `index.html` and adding the new MP4 + poster under `assets/`.

## Main files

- `index.html` — page structure/content
- `styles.css` — visual system, responsive design and animation styles
- `script.js` — hero scroll scrubbing, filtering, reveals, video player and mobile navigation
- `assets/videos/` — hero and portfolio films
- `assets/posters/` — video posters

## Contact links currently included

- Website: ajaynxt.com
- Email: ajayx3neha@gmail.com
- WhatsApp / Phone: +91 99295 62585
- Instagram: @ajay_nxt_
- LinkedIn: /in/ajaynxt/
- X: @Ajay_Nxt_
- Threads: @ajay_nxt_
- Facebook: provided AJAY NXT profile/share link
