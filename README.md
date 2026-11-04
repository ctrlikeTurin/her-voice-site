# Her Voice website

Live at https://her-voice.pages.dev. A Cloudflare Pages site with a small editor built in.

## Layout

- `public/`: the site (`index.html`, `styles.css`, `app.js`)
- `functions/api/`: `data` (load and save content), `upload` (photos and videos), `auth` (editor login)
- `functions/media/[id].js`: serves uploaded photos and videos
- `lib/auth.js`: editor password check
- `wrangler.jsonc`: Cloudflare config; the `SITE` KV namespace stores content and uploads

## Editing the live site

Open the site, click **Editor login** in the footer and enter the editor password. Click dashed text to change it, upload photos or videos, add links, then click **Save changes**.

## Deploy

```
npx wrangler login
npx wrangler pages deploy public --project-name her-voice --branch main
```

The editor password is a Pages secret, not stored in this repo:

```
npx wrangler pages secret put EDIT_PASSWORD --project-name her-voice
```

For local testing, put `EDIT_PASSWORD=...` in a `.dev.vars` file (git-ignored), then run
`npx wrangler pages dev public --kv SITE`.
