# HELLFIRE AI Solutions — Website

Public HELLFIRE AI Solutions site: positioning, offer (turnkey modules / specialist on contract), client segments, CTA to contact a human (not a chatbot).

First testbed for the [UNI Tag](../uni-tag) module (llms.txt, structured data) — dogfooding GEO/AEO on our own site.

**Stack:** [Astro](https://astro.build), static generation (`output: 'static'`), no client-side framework — chat widget in vanilla JS.

**Status:** live — **https://hellfiresol.com**. Three pages done (Landing, Communicator, Legal), pixel-fidelity to the design handoff. `llms.txt` + schema.org (Organization JSON-LD) added. CI/CD (`.github/workflows/deploy.yml`) deploys `dist/` to the server on push to `main`. Details — [DEPLOYMENT.md](./DEPLOYMENT.md).

## Development

```
npm install
npm run dev      # http://localhost:4321
npm run build     # -> dist/
```

**License:** MIT.
