# Deployment

## Status: live

**https://hellfiresol.com** (and `www.`) is deployed and serving the built site.

## Stack

Static site built with [Astro](https://astro.build) (`output: 'static'`) — no server runtime needed at request time. `npm run build` produces plain HTML/CSS/JS in `dist/`.

## Target

Shared DigitalOcean droplet from session 02 (`164.90.235.66`, EU region `fra1`, nginx). Site files live at `/var/www/hellfiresol.com/html/`, owned by the `hellfire` deploy user (world-readable so the nginx worker, running as `www-data`, can serve them without group membership changes).

nginx vhost: `/etc/nginx/sites-available/hellfiresol.com` (already existed from session 02's domain setup — HTTP→HTTPS redirect + TLS already wired). TLS cert (Let's Encrypt, auto-renewing) covers both `hellfiresol.com` and `www.hellfiresol.com`.

## CI/CD

`.github/workflows/deploy.yml` builds and rsyncs `dist/` to `/var/www/hellfiresol.com/html/` over SSH on every push to `main`, using the org-level secrets/vars from session 02:

- `secrets.HELLFIRE_DEPLOY_KEY` — private half of the `hellfire` deploy keypair
- `vars.HELLFIRE_DEPLOY_HOST` — `164.90.235.66`
- `vars.HELLFIRE_DEPLOY_USER` — `hellfire`

The `hellfire` user's authorized_keys and the target directory ownership were already correctly set up for this — no further server changes needed for future deploys via this workflow.

## Manual deploy (if ever needed outside CI)

```
npm run build
tar czf /tmp/dist.tar.gz -C dist .
scp /tmp/dist.tar.gz tetapi:/tmp/
ssh tetapi "sudo -u hellfire tar xzf /tmp/dist.tar.gz -C /var/www/hellfiresol.com/html && rm /tmp/dist.tar.gz"
```

## Rollback

The pre-launch placeholder page was backed up to `/var/www/hellfiresol.com/html.bak/` on the server before the first real deploy.
