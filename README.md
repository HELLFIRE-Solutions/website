# HELLFIRE AI Solutions — Website

Публічний сайт HELLFIRE AI Solutions: позиціонування, пропозиція (модулі під ключ / фахівець на контракт), сегменти клієнтів, CTA на контакт з людиною (не чат-бот).

Перший полігон для модуля [UNI Tag](../uni-tag) (llms.txt, structured data) — dogfooding GEO/AEO на власному сайті.

**Стек:** [Astro](https://astro.build), статична генерація (`output: 'static'`), без фреймворку на клієнті — чат-віджет на vanilla JS.

**Статус:** живий — **https://hellfiresol.com**. Три сторінки готові (Landing, Communicator, Legal), pixel-fidelity до дизайн-хендоффу. `llms.txt` + schema.org (Organization JSON-LD) додано. CI/CD (`.github/workflows/deploy.yml`) деплоїть `dist/` на сервер при пуші в `main`. Деталі — [DEPLOYMENT.md](./DEPLOYMENT.md).

## Розробка

```
npm install
npm run dev      # http://localhost:4321
npm run build     # -> dist/
```

**Ліцензія:** MIT.
