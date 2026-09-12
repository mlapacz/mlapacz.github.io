# mlapacz.github.io

Personal site of Michał Łapacz. Plain static HTML and CSS, no build step, no framework,
no analytics. Served by GitHub Pages straight from the `master` branch; the `.nojekyll`
file keeps Jekyll out of the way.

## Files

| Path | What it is |
|---|---|
| `index.html` | The whole site: hero, stack chart, now, how I work, selected work, career, contact |
| `404.html` | Not-found page in the same style |
| `assets/css/style.css` | All styling. Colour and type tokens are at the top under `:root` |
| `assets/js/site.js` | Theme toggle and the chart reveal. The page works without it |
| `assets/fonts/` | Archivo (OFL) and Commit Mono (MIT), self-hosted so no visitor data goes to Google |
| `assets/img/mark.svg` | Favicon: the fat T |

## Editing

- **Text**: edit `index.html` directly. Each section is marked with a `<!-- ==== name ==== -->` comment.
- **Stack chart**: each row is a `<li class="stack__row">`. The bar's `grid-column: A/B` maps years
  to columns as `A = start − 2004` and `B = end − 2003` (2005 is column 1, 2026 is column 22).
  Add `data-now` to a bar that is still in use; it turns amber.
- **Photo**: put a square image at `assets/img/portrait.jpg` and uncomment the `<img class="portrait">`
  block in the hero. The layout adapts on its own.
- **Email**: uncomment the email row at the end of the contact list and fill in the address.
- **Colours**: light and dark palettes live in `:root` and `:root[data-theme="dark"]` in `style.css`.
  The visitor's OS preference is used by default; the button in the top bar overrides it and remembers
  the choice in `localStorage`.

## Preview locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy

Push to `master`. GitHub Pages publishes the root of the branch within a minute or two.
