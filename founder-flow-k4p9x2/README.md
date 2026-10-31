# founder-flow-k4p9x2 — превью (noindex)

Контракт padelada.club ↔ приложение: конкурс основателя комарки (MuratPod/padelada#875, `docs/contracts/club-founder-flow.md`).
Только превью. НЕ мержить в корень зеркала без слова Мурата. Домен padelada.club не деплоится.

URL: https://muratpod.github.io/padelada-club-test/founder-flow-k4p9x2/

- `/comarca/baix-emporda/` — условия + статус (никогда не открывает приложение). Состояния: `?demo=empty|contest|active` (по умолчанию contest). Mock: `data/zone_founder_public.mock.json` (форма RPC `zone_founder_public`).
- `/comarca/baix-emporda/captain/` — лендинг «приложения нет» (App Store + Google Play). На проде этот путь — Universal Link, открывает приложение.
- Языки: es (корень), `ca/`, `en/`, `ru/`, `uk/`.
- empty|contest → «Стать основателем» + счётчик; active → без кнопки. Без имён, фото, Plus/Max.
- `.well-known/apple-app-site-association` и `assetlinks.json` — образцы из контракта. **На проде они должны лежать на apex padelada.club** (`/.well-known/…`, Content-Type application/json, без редиректа); здесь — только для проверки содержимого (GitHub Pages отдаёт AASA без нужного Content-Type и из подпапки).
