# Deployment

## Stack

Static site built with [Astro](https://astro.build) (`output: 'static'`) — no server runtime needed at request time. `npm run build` produces plain HTML/CSS/JS in `dist/`.

## Target

Shared DigitalOcean droplet from session 02 (`164.90.235.66`, EU region `fra1`), served by nginx. Deploy user `hellfire` (no sudo, own `/opt/hellfire` workspace) owns this site's files at `/opt/hellfire/website/`.

## CI/CD

`.github/workflows/deploy.yml` builds and rsyncs `dist/` to `/opt/hellfire/website/` over SSH on every push to `main`, using the org-level secrets/vars set up in session 02:

- `secrets.HELLFIRE_DEPLOY_KEY` — private half of the `hellfire` deploy keypair
- `vars.HELLFIRE_DEPLOY_HOST` — `164.90.235.66`
- `vars.HELLFIRE_DEPLOY_USER` — `hellfire`

## Still blocking a live deploy

- **Domain**: `hellfire.dev` not purchased yet (Bob's plan: 2026-07-21). No domain → no nginx `server_name` → no TLS cert → nothing to point the workflow's output at yet.
- **nginx vhost**: not created — waiting on the domain above. Once it exists, add a server block like:

  ```nginx
  server {
    listen 443 ssl;
    server_name hellfire.dev www.hellfire.dev;
    root /opt/hellfire/website;
    index index.html;

    location / {
      try_files $uri $uri/ $uri.html =404;
    }

    ssl_certificate     /etc/letsencrypt/live/hellfire.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/hellfire.dev/privkey.pem;
  }

  server {
    listen 80;
    server_name hellfire.dev www.hellfire.dev;
    return 301 https://$host$request_uri;
  }
  ```

  `.dev` is on the Chrome HSTS-preload list — issue the Let's Encrypt cert (`certbot --nginx`) *before* pointing DNS at this box or announcing the URL; plain HTTP will hard-fail in Chrome from the first request.

- **`astro.config.mjs`** already assumes `site: 'https://hellfire.dev'` (used for canonical URLs, sitemap, OG tags) — no change needed once the domain is live.

## What's not blocked

The build itself is deploy-ready now: `npm run build` succeeds, output is fully static, and the GitHub Actions workflow is wired to the real deploy credentials. The only missing piece is the domain + nginx vhost on the server side.
