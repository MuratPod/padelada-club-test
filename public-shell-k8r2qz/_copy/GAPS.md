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
