# GAPS — что нужно для сборки превью
## Мурат / Manager
- Hero: утверждено «Tu pádel. Tu comarca. Tu club.»
- contestants_count — НЕ показываем (решено).
- ca/en/uk переводы — после утверждения es; uk на «ты».
- FAQ: подтвердить 5 вопросов (п.5 про другую комарку — проверить правило).
- Хостинг без Cloudflare (ES): выбрать провайдера; снять 301 .club→.com только по «да».
- Legal: ссылки на padelada.com (решено).
## Design
- Видео для hero (без узнаваемых людей), постер, вес ≤3 МБ.
- Фото комарок и корта без людей; карта 42 комарок (SVG с slug).
- Упростить club-v3: убрать карточки-фичи, плашку Maqueta.
## Бэк
- Миграция zone_founder_contest + RPC zone_founder_public в проде (сейчас draft PR #875).
- RPC/view открытых турниров для anon (без имён) — нет в контракте.
- Список 42 slug/названий (zones) для карты и SSG.
- AASA + assetlinks в корне .club; associatedDomains в новой сборке TF/Play.
## Сборка
- site-club: SSG по slug + клиентский fetch статуса; 404 для null.
- Префиксы языков; hreflang; noindex на превью.

## Сделано ночью 1.11 (draft PR, club-test)
- Комарка + captain на ca/en/ru/uk (?demo=empty|contest|active, X/16, faltan N, без contestants_count; active без Fundador).
- Переключатель языка на комарке ведёт на ту же комарку (и сохраняет ?demo).
- 404.html, app-only/ (заглушка «это в приложении») на 5 языках, .well-known/ AASA+assetlinks (копия из padelada/site/root; в проде нужны в КОРНЕ .club).
## Осталось на утро
- FAQ5 (Мурат). Вычитка ca/en/uk носителем. Hero/видео/фото/карта 42 — Design. Бэк #875 RPC. Хостинг без CF + снятие 301 — по «да».

## 1.11 ~01:40 (Madrid) — PR #5 MERGED (00:34Z = 01:34 Madrid), Pages redeployed (pages-build-deployment success)
- Smoke live https://muratpod.github.io/padelada-club-test/public-shell-k8r2qz/ : es(root)/ca/en/ru/uk index+comarca+captain 200; footer terms→padelada.com/terms/, privacy→/privacy/, текст по языку — PASS; hreflang es/ca/en/ru/uk+x-default=es — PASS; noindex — PASS; FAQ4 server time на всех 5 — PASS.
- Мелочь: public-shell-k8r2qz/404.html ок (Términos/Privacidad). Но сайтовый 404 Pages (напр. для несуществующего /es/) показывает футер «Condiciones / Política de privacidad» — вероятно корневой 404.html репо, не наш шелл. ES живёт в корне шелла, /es/ не существует (by design).
- Локальный COPY-ca-en-uk.build.py устарел (футер → padelada.com/); источник истины — main.
- STOP до утра: FAQ5, #888, DNS, прод, CF, фото. Pending: Design, бэк (#875 RPC).

## 1.11 ~02:45 (Madrid) — draft PR fix/root-404-footer-labels
- Корневой 404.html репо: Condiciones→Términos, Política de privacidad→Privacidad (href не трогал).
- Инвентарь шелла vs STRUCTURE: все страницы дерева есть (index ×5, comarca+captain ×5, app-only ×5, 404, .well-known AASA/assetlinks/security.txt); якоря club/comarcas/torneos/capitanes/fundador/faq/app на всех языках. Битых относительных ссылок нет.
- COPY-ca-en-uk.build.py: футер → /terms/ и /privacy/ (был padelada.com/).
- Без решений дальше не двигается: FAQ5 (Мурат), hero-видео/фото/карта 42 SVG (Design), лента турниров + RPC #875 + список 42 slug (бэк), хостинг без CF/301 (Мурат «да»).
