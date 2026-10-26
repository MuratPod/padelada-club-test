# Письмо club_welcome — «Вы в Club Padelada» (Padelada Design, 26.10.2026)

Превью (закрытая ссылка, noindex): https://muratpod.github.io/padelada-club-test/club-welcome-email-w7k3qd/
Живые страницы по языкам: `https://muratpod.github.io/padelada-club-test/club-welcome-email-w7k3qd/view/club_welcome.ru.html` (и `uk`, `es`, `ca`, `en`).
Ничего не отправлялось и не публиковалось на padelada.com.

## 1. Что это и куда класть

`club_welcome` — приветственное письмо члену клуба. Сейчас уходит как простой текст из `supabase/functions/_shared/mail.ts`
(`TEMPLATES.club_welcome`, функция `mail`, `sendMail(db, user, 'club_welcome', { no })`, номер = `founder_no ?? member_no`).
Здесь — оформленная HTML-версия на 5 языков. Тексты взяты из `mail.ts` (es/ca/en/ru/uk; номер вынесен в карточку), добавлены только подписи карточки номера, кнопка и подвал.

```
club-welcome-email-v1/
  templates/club_welcome.{es,ca,en,ru,uk}.html   готовые шаблоны, переменные {{name}} {{member_number}} {{club_url}} {{support_url}}
  templates/club_welcome.{lang}.txt              текстовая версия (multipart/alternative)
  templates/subjects.json                          темы писем
  resend/club_welcome.{lang}.html|.txt            то же с переменными в стиле проекта {{{NAME}}} {{{MEMBER_NUMBER}}} {{{CLUB_URL}}} {{{SUPPORT_URL}}}
  assets/padelada-logo.png, padelada-logo-on-dark.png   логотип 464×90 (показывается 155×30, это 3×)
  view/                                            примеры с подставленными Marc / 997 (только для просмотра)
  png/                                             кадры (светлая/тёмная × языки × ширины)
  preview.html (= index.html)                      оба режима рядом
  tools/                                           build.py, texts.py (все тексты), render.py, contrast.py, validate.py, logos.py, preview.py
```

**Куда положить.** `resend/*` лежит в формате, который понимает существующая сборка (`supabase/templates/email/resend/`, `scripts/email/build-mail-templates.mjs`,
`renderHtmlMail`/`sendHtmlMail` в `_shared/mailHtml.ts`): переменные `{{{ИМЯ}}}` экранируются в HTML, адреса проверяются как `https://`.
Нужно (на стороне разработки): добавить вид `club_welcome` в `RESEND_KINDS`, в `variables.json` четыре переменные (`NAME`, `MEMBER_NUMBER`, `CLUB_URL`, `SUPPORT_URL`; запасные значения: `NAME` — пусто или «Padelada», `CLUB_URL` — `https://padelada.com/`),
в `subjects.json` темы из `templates/subjects.json`, и в `mail/index.ts` вызывать `sendHtmlMail(db, user, 'club_welcome', {...})` вместо `sendMail`. Текст `.txt` берётся из `resend/club_welcome.<lang>.txt` (в `renderHtmlMail` текст сейчас собирается в коде — для club_welcome нужна ветка с этими файлами).
`templates/*` — те же файлы с `{{name}}`-переменными для любой другой системы шаблонов.

**Картинки.** Две PNG из `assets/` публикуются вместе с сайтом **до** включения письма: `https://padelada.com/assets/email/padelada-logo.png` и `.../padelada-logo-on-dark.png`
(как у остальных писем, папка `site/assets/email/`; `padelada-logo-on-dark.png` там уже есть — тот же файл). Абсолютные URL уже стоят в шаблонах.
Ссылки `{{club_url}}` и `{{support_url}}` — обычные `https://` (универсальная ссылка на вкладку «Клуб»; пользовательские схемы `padelada://` почтовые клиенты режут).

## 2. Переменные

| Переменная (templates) | Resend | Пример | Заметка |
|---|---|---|---|
| `{{name}}` | `{{{NAME}}}` | Marc | имя из профиля; длинное имя переносится |
| `{{member_number}}` | `{{{MEMBER_NUMBER}}}` | 997 | число без знака «№»: знак зависит от языка и стоит в шаблоне |
| `{{club_url}}` | `{{{CLUB_URL}}}` | https://padelada.com/club | кнопка «Открыть клуб» |
| `{{support_url}}` | `{{{SUPPORT_URL}}}` | https://padelada.com/support | подвал |

Язык письма — `profiles.language` (es по умолчанию), как в `mail.ts`. Ru на «вы», uk на «ви»; «Club Padelada», «Padelada» — латиницей.

## 3. Тексты на 5 языках

| Блок | `es` | `ca` | `en` | `ru` | `uk` |
|---|---|---|---|---|---|
| Тема письма (subject) | Ya eres de Club Padelada | Ja ets de Club Padelada | You’re in Club Padelada | Вы в Club Padelada | Ви в Club Padelada |
| Заголовок | Ya eres de Club Padelada | Ja ets de Club Padelada | You’re in Club Padelada | Вы в Club Padelada | Ви в Club Padelada |
| Приветствие | ¡Hola, {{name}}! Ya eres miembro de Club Padelada. | Hola, {{name}}! Ja ets membre de Club Padelada. | Hi {{name}}, you’re now a member of Club Padelada. | Здравствуйте, {{name}}! Теперь вы член Club Padelada. | Вітаємо, {{name}}! Тепер ви член Club Padelada. |
| Знак номера | N.º | Núm. | No. | № | № |
| Подпись под номером | miembro de Club Padelada | membre de Club Padelada | member of Club Padelada | член Club Padelada | член Club Padelada |
| Текст про карточку | Tu tarjeta está en la pestaña Club de la app. | La teva targeta és a la pestanya Club de l’app. | Your card is in the Club tab of the app. | Карточка — во вкладке «Клуб» в приложении. | Картка — у вкладці «Клуб» у застосунку. |
| Кнопка | Abrir el club | Obrir el club | Open the club | Открыть клуб | Відкрити клуб |
| Подпись | Nos vemos en la pista. | Ens veiem a la pista. | See you on court. | До встречи на корте. | До зустрічі на корті. |
| Подвал | Recibes este correo porque te has hecho miembro de Club Padelada. | Reps aquest correu perquè t’has fet membre de Club Padelada. | You’re receiving this email because you became a member of Club Padelada. | Вы получили это письмо, потому что стали членом Club Padelada. | Ви отримали цей лист, тому що стали членом Club Padelada. |
| Ссылка поддержки | Ayuda | Ajuda | Support | Поддержка | Підтримка |
| Прехедер | Tu número de miembro es el N.º {{member_number}}. Tu tarjeta ya está en la app. | El teu número de membre és el Núm. {{member_number}}. La teva targeta ja és a l’app. | Your member number is No. {{member_number}}. Your card is already in the app. | Ваш номер члена клуба — № {{member_number}}. Карточка уже в приложении. | Ваш номер члена клубу — № {{member_number}}. Картка вже в застосунку. |

Знак номера: es «N.º», ca «Núm.», en «No.», ru/uk «№» (как в `mail.ts`). Шрифт Montserrat Alternates рисует заглавную N строчной формой — это особенность гарнитуры.
Темы es/ca взяты из `mail.ts` («Ya eres de Club Padelada», «Ja ets de Club Padelada»), а не из примера в задаче («Ya estás en…», «Ja ets a…»): они уже в продакшене и значат то же. Если нужна версия «Ya estás en» — одна правка в `tools/texts.py` и `python3 tools/build.py`.
Украинский: «Ви в Club Padelada» — «в» верно (после гласной «и», перед согласной «P»); «Вітаємо», «застосунок», «Підтримка» — как в остальных письмах проекта.

## 4. Вёрстка и размеры (pt = css px)

Таблицы + inline-стили. Контейнер `max-width:600`, внешний отступ 36/16/44 (на ≤480: 20/12/28).

| Блок | Размер |
|---|---|
| Логотип | PNG 155×30 (файл 464×90), в «плашке» 8/16 pt; светлая версия — тёмный знак, тёмная — светлый |
| Белая карточка | радиус 24, рамка 1 px `#F0DCD2` (тёмная `#3A3B40`), отступ 40/40/36 (≤480: 30/20/28, ≤350: 26/16/24) |
| Заголовок | Montserrat Alternates 800, 30/36 (≤480: 26/32, ≤350: 23/29) |
| Приветствие | Golos Text 400, 18/27 |
| Карточка номера | mango `#FFB547`, радиус 20, отступ 28/16/26; номер Montserrat Alternates 800 64/72 (≤480: 54/62, ≤350: 46/54); подпись Golos 700 14/20, верхний регистр, трекинг 1,2 |
| Текст про карточку | Golos 400, 17/26 |
| Кнопка | coral `#FF5E5B`, текст ink `#24123A`, Golos 700 16/22, высота **52** (отступ 15 + строка 22 + 15), ширина 260 (на ≤480 — 100 %), радиус 999; Outlook — VML `roundrect` 260×52, `arcsize=50%` |
| Подпись | 17/26, «Padelada» Montserrat Alternates 800 |
| Подвал | 13/19, muted `#5F4F70`; ссылка поддержки Golos 700 с подчёркиванием, на строке отдельно; отписки нет (транзакционное письмо) |

Без градиентов, теней, свечения, иконок Lucide и эмодзи. Единственное «градиентное» место — служебное: плашка логотипа дополнительно окрашена одноцветным `linear-gradient(c,c)`, чтобы Gmail (iOS/Android) не инвертировал её (приём из `supabase/templates/email/README.md`); на глаз градиента нет.

## 5. Цвета

| Роль | Светлая | Тёмная |
|---|---|---|
| Фон страницы | `#FFF1EA` | `#0A1124` |
| Карточка | `#FFFFFF` + рамка `#F0DCD2` | `#141C30` + рамка `#3A3B40` |
| Текст | ink `#24123A` | `#F5F5F7` |
| Второстепенный текст (подвал) | `#5F4F70` | `#A8AAB2` |
| Карточка номера | mango `#FFB547`, текст ink | то же (цвет бренда не меняется) |
| Кнопка | coral `#FF5E5B`, текст ink | то же |

Контраст (WCAG): ink/белая 17,18; ink/фон 15,56; muted/фон 6,70; ink/mango 9,78; ink/coral (текст кнопки) 5,73; светлый текст/surface 15,57; muted/фон тёмный 8,10; muted/surface 7,31.
Проверено скриптом по всем текстовым узлам × фактический фон, 5 языков × 2 темы: минимум 5,73 для обычного текста, 9,78 для крупного, нарушений нет (`contrast.md`).
Заливки: кнопка к белой карточке 3,00 (светлая) и 5,66 к карточке (тёмная); карточка номера к белой карточке 1,76 (светлая): граница оформительская, содержимое (номер 9,78) читается; если нужна граница ≥3, добавить 2 px ink-рамку, скажите.

## 6. Тёмная тема и клиенты

- **Основной путь.** `meta color-scheme` и `supported-color-schemes` = `light dark`, `:root{color-scheme:light dark}`, `@media (prefers-color-scheme:dark)`: Apple Mail, iOS Mail, Thunderbird, Samsung Mail, Outlook для Mac/iOS/Android с настройкой темы. В тёмной теме подменяется логотип (`pd-logo-l` ↔ `pd-logo-d`), фон, карточка, цвета текста.
- **Outlook.com / приложения Outlook с принудительной тёмной.** Правила `[data-ogsc]` (цвет текста) и `[data-ogsb]` (фон): подтверждены имитацией атрибутов в Chromium, на реальном Outlook не проверялись.
- **Gmail (iOS/Android/web).** `prefers-color-scheme` не поддерживает, сам инвертирует цвета. Светлое письмо превращается в тёмное «автоматически»: белая карточка станет тёмной, текст светлым. Логотип-плашка защищена (остаётся светлой с тёмным знаком, смотрится как светлая метка). Кнопка и карточка номера Gmail может затемнить; контраст в таком случае сохраняется. На реальном Gmail не проверялось.
- **Outlook для Windows (Word).** Нет скруглений карточек, шрифты Arial (правило `mso`), кнопка через VML (260×52, скруглённая). Ширина 600 через условную таблицу.
- **Веб-шрифты** (`<link>` Google Fonts в `<!--[if !mso]>`) — только усиление; Gmail, Outlook, часть Android их игнорируют: запасные шрифты Trebuchet MS / Arial (заголовок), Arial / Helvetica (текст). Кадры «без веб-шрифтов» есть в превью.
- **Блокировка картинок.** Если картинки выключены, вместо логотипа виден текст alt «Padelada» шрифтом заголовка (цвет и размер заданы).
- Прехедер скрыт, добавлен «наполнитель» (`&#8199;&#847;`), чтобы за ним не показывался текст письма. Вес письма ~10 КБ (лимит клиппинга Gmail 102 КБ).

## 7. Проверки (26.10.2026)

- Кадры Chromium: `png/club-welcome-<lang>-<light|dark>-<600|375>.png` (5 языков × 2 темы × 2 ширины), `ru` ещё 320, плюс `ru`/`en` без веб-шрифтов (375). Всего 26 PNG (13 видов × 2 темы), измерения — в `png/_render-report.json`.
- Горизонтального скролла нет ни на одной ширине (scrollWidth ≤ clientWidth); кнопка 52 pt в высоту на всех кадрах.
- Контраст: см. раздел 5, нарушений нет.
- HTML: разбор html5lib без ошибок, все теги закрыты, `alt` у каждой картинки, абсолютные URL картинок, нет внешнего CSS (кроме шрифтов-усиления), вес < 100 КБ, четыре переменные на месте, VML-кнопка, `color-scheme`, `data-ogsc`/`data-ogsb`. W3C `vnu` и `tidy` в окружении не ставятся (нет Java), заменено на html5lib + свои проверки (`tools/validate.py`).

Воспроизвести: `python3 tools/build.py && python3 tools/build.py --fallback && python3 tools/render.py && python3 tools/contrast.py && python3 tools/validate.py`.

## 8. Что осталось сделать разработке

1. Опубликовать две PNG в `site/assets/email/` (до включения письма) и проверить, что они открываются по `https://padelada.com/assets/email/...`.
2. Подключить `club_welcome` как HTML-письмо (раздел 1); `from` остаётся `Padelada <hola@padelada.com>`; текстовая версия обязательна.
3. Определить `club_url` и `support_url` (универсальные ссылки, `https`).
4. Тестовое письмо себе: Gmail (iOS и web), Apple Mail, Outlook (Windows и web) в обеих темах. Присылайте скриншоты, поправлю.
