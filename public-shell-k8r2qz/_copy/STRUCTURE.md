# Club Padelada — публичная оболочка (черновик, не прод)
Источник: решения Мурата + контракт MuratPod/padelada PR #875 (docs/contracts/club-founder-flow.md). Без карточек-фич: простой вертикальный поток.

## Языки
es по умолчанию (`/`), остальные: `/ca/`, `/en/`, `/ru/`, `/uk/` (ru/uk — на «ты»). hreflang + x-default=es.

## Дерево
```
/                                   главная (public)
/#club  /#comarcas  /#torneos  /#fundador  /#faq  /#app   — якоря
/comarca/<slug>/                    условия + статус комарки (public, НЕ открывает приложение)
/comarca/<slug>/captain             Universal Link; без приложения — fallback-лендинг + сторы
/legal/terminos/  /legal/privacidad/  /contacto (mailto)
/.well-known/apple-app-site-association   (JSON, без редиректа, только /comarca/*/captain)
/.well-known/assetlinks.json
404
```
`<slug>` = zones.slug `^[a-z0-9-]{2,60}$`. Неизвестный slug / RPC → null → 404-стиль «Esta comarca no existe» + ссылка на карту.

## Главная — порядок блоков (без карточек)
1. Hero: фраза (1 строка) + видео (без людей в кадре / лица не узнаваемы) + одна кнопка «Descargar la app».
2. Клуб и достоинства — 3–4 строки текста, не плитки.
3. Фото комарок и корта + карта 42 комарок (клик → /comarca/<slug>/).
4. Афиша открытых турниров (список строк: дата, комарка, уровень; без имён игроков).
5. Капитаны — короткий текст «у каждой комарки свой капитан» (без имён/аватаров; если нужны аватары — инициалы).
6. «Hazte Fundador» — 3 короткие строки + ссылка на карту.
7. FAQ — 5 вопросов.
8. Сторы: App Store id6819019168, Google Play com.padelada.app.

## Шапка / футер
Шапка: логотип Club Padelada · языки ES/CA/EN/RU/UK · «Descargar». Меню-якорей нет (одна страница), на мобиле — только кнопка.
Футер: Términos · Privacidad · Contacto · сторы. «Entrar» на сайте нет.

## Public vs members-only
Public: всё выше + счётчик комарки (members_count/16), статус, наличие капитана.
Members-only (muro, jugador, cuenta, рейтинг, вход OTP): НЕ на сайте → заглушка «Esto está en la app» + сторы.

## Комарка: состояния (RPC zone_founder_public, anon)
- empty / contest: кнопка «Hazte Fundador» → app_url (/captain) + счётчик X/16 (+ «faltan N»). contestants_count не показываем как имена; можно «N personas compiten» — TODO решение.
- active: без кнопки; «Esta comarca ya tiene Fundador» + капитан есть/нет; дата founded_at (опц.).
- Никаких имён, фото, id.

## Убрано
Plus/Max, цены, награды, «Club gratis», «para siempre», имена игроков, алгоритм рейтинга, люди на фото, «захвати комарку», плашка Maqueta/Ejemplo, noindex (снять только на проде).
