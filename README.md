# HELLFIRE AI Solutions — Website

Публічний сайт HELLFIRE AI Solutions: позиціонування, пропозиція (модулі під ключ / фахівець на контракт), сегменти клієнтів, CTA на контакт з людиною (не чат-бот).

Перший полігон для модуля [UNI Tag](../uni-tag) (llms.txt, structured data) — dogfooding GEO/AEO на власному сайті.

**Стек:** [Astro](https://astro.build), статична генерація (`output: 'static'`), без фреймворку на клієнті — чат-віджет на vanilla JS.

**Статус:** три сторінки готові (Landing, Communicator, Legal), pixel-fidelity до дизайн-хендоффу. `llms.txt` + schema.org (Organization JSON-LD) додано. Деплой підготовлено (`.github/workflows/deploy.yml`, org secrets з сесії 02), але не задеплоєно — блокується доменом `hellfire.dev` (сесія 02, очікується 2026-07-21). Деталі — [DEPLOYMENT.md](./DEPLOYMENT.md).

## Розробка

```
npm install
npm run dev      # http://localhost:4321
npm run build     # -> dist/
```

**Ліцензія:** MIT.
