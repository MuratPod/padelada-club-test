# Padelada · предстартовые экраны: «Играю сейчас» и «Создать матч по QR» (v1)

Демо открывается по ссылке из отчёта (`?s=40` — «Играю сейчас», `?s=41` — «Матч по QR»; состояния — чипы справа). PNG: `png-prestart/`.
Система Festa D4, светлая и тёмная темы, сетка 4, без градиентов и теней. Исключение: `shadowCoral` у coral-кнопки только в светлой теме (как в home-error).

## 1. Решение

**Нажатие «Играю сейчас» на Главной не создаёт игру.** Оно открывает нижний лист «Новая игра» поверх главной (экран-лист: главная остаётся видна под затемнением).
- В листе всё уже выбрано по умолчанию: клуб — ближайший, счёт — Ventaja, смена сторон — включена. Для игры в одно нажатие достаточно «Начать игру».
- Игра создаётся, а таймер, часы и Live Activity запускаются **только по нажатию «Начать игру»**. Закрытие листа (✕, смахивание вниз, тап по затемнению) ничего не создаёт и не запускает.
- Тот же блок «Клуб + Правила» используется в «Матче по QR». Там главная кнопка называется «Создать матч», а QR появляется только после её нажатия.

Почему лист, а не отдельный экран: пользователь остаётся в контексте главной, а всё содержимое умещается в 541 pt высоты (390×844).

## 2. Размеры (pt, ширина 390; на 360 меняются только ширины)

### 2.1. Лист «Новая игра» (`.ps`, экран 40, состояние «По умолчанию»)
| Элемент | Значение |
|---|---|
| Лист | на всю ширину, прижат к низу, высота по содержимому = 541 (на 390×844), верхние углы radius 36 (`r-xl`), рамка сверху 1 px `lineStrong`, тени нет |
| Затемнение | `ink` 45 % (`scrim`), под листом главная как есть |
| Отступы листа | сверху 8, по бокам 16, снизу 34 (`max(34, safeBottom)` в RN: `paddingBottom: max(16, insets.bottom)`) |
| Ручка | 36×4, radius 2, `lineStrong`, по центру, отступ снизу 4 |
| Шапка | высота 56; заголовок Montserrat Alternates 800 24/28 (кириллица — через `dc` как в home-error), кнопка ✕ 48×48, фон `surfaceSunk`, иконка `x` |
| Подпись секции («Клуб», «Правила») | Golos 700 13/18, `inkMuted`, отступ сверху 12, снизу 4, слева 4 |
| Строка клуба | высота 72 (min), padding 12/16/12/12, radius `r-lg`, фон `surface`, рамка 1 px `line` (box-shadow 0 0 0 1px), круг 48 `tintMint` с иконкой `map-pin` 24 stroke 2, зазор 12; название Golos 700 17/22, подпись 400 13/18 `inkMuted` («Palamós · 1,2 km · Más cercano»), шеврон `chevron-right` 24 `inkMuted`. Вся строка — одна цель касания |
| Карточка «Правила» | padding 12, radius `r-lg`, фон `surface`, рамка 1 px `line`; высота 188 |
| Сегмент Ventaja / Punto de oro | высота 56 (трек `segmentTrack`, padding 4, radius 999), кнопки 48 по высоте и поровну по ширине (163 на 390, 148 на 360), Golos 700 15/18, активная — `inverse` / `onInverse`; `role=radiogroup`, названия не переводятся |
| Пояснение | Golos 400 13/18 `inkMuted`, отступ сверху 8, слева и справа 4, min-height 36 (2 строки, чтобы кнопки не прыгали при смене сегмента) |
| Строка «Меняемся сторонами» | высота 56, разделитель сверху 1 px `line`, отступ сверху 8, текст Golos 700 16/20, переключатель 52×32 radius 16; трек выкл `lineStrong`, вкл `inverse`; движок 24, отступ 4, цвет `surface` / `onInverse`; вся строка нажимается (`role=switch`) |
| Главная кнопка «Начать игру» | coral-пилюля `brandCoral`, текст/иконка `onBrand` #24123A, **min-height 56**, ширина 100 % (358 на 390), Golos 700 17/22, иконка `play` 24 stroke 2, отступ сверху 20, `shadowCoral` только в светлой теме |
| Строка-подсказка | Golos 500 13/18 `inkMuted`, отступ сверху 12, по центру, иконка `timer` 16; в ca/es может быть в 2 строки |

Вертикаль (390×844, всё в pt): 8 · ручка 4 + 4 · шапка 56 · 12 + подпись 18 + 4 · строка клуба 72 · 12 + подпись 18 + 4 · карточка правил 188 · 20 · кнопка 56 · 12 + подсказка 18 · 34 = 541. Лист не бывает выше 560, поэтому на 360×640 включается прокрутка внутри листа (`maxHeight = 100 % − safeTop − 16`).

### 2.2. Выбор клуба (`ClubSheet`, состояние «Выбор клуба», экран 40)
- Тот же лист: вместо содержимого кнопка назад 48×48 (`chevron-left`) + заголовок «Выберите клуб» и список из 5 клубов, `radiogroup`. Высота 507 (390×844).
- Строка: min 64, radius `r-lg`, круг 48 (`tintMint` / `tintMango` попеременно) с `volleyball`, название 16/20 700, подпись 13/18 `inkMuted` («Palamós · 1,2 km»), расстояние по возрастанию; зазор между строками 8.
- Выбранный (ближайший) — рамка 2 px `ink` и галочка `check` 24; у ближайшего в подписи «· Más cercano».
- Тап по строке сразу выбирает клуб и возвращает к «Новая игра» (без кнопки «Готово», шаг лишний). Назад — то же без изменения выбора.
- Демо-список: Club Pàdel Palamós 1,2 km (выбран) · Pàdel Sant Feliu 6 km · Pàdel Platja d’Aro 9 km · Club Esportiu Calonge 11 km · Padel Club Begur 24 km.

### 2.3. Состояние «Кнопка нажата» (`play-pressed`)
`scale(.96)` на кнопке «Начать игру» (как `is-press` в home-error), цвет и размер те же, тени нет. После отпускания: создаётся игра, лист закрывается, запускается таймер. Само нажатие ничего не меняет в тексте.

### 2.4. «Матч по QR»: шаг до QR (экран 41, «Шаг до QR»)
- Шапка: кнопка назад 48×48 (`circ`, `surfaceSunk`) + заголовок 24/28 (Montserrat Alternates 800), отступы 8/16/4.
- Тело: **те же блоки «Клуб» и «Правила»** (строки 2.1). Менять клуб и правила можно прямо здесь.
- Нижняя панель (`pqbar`, прижата к низу, не в области прокрутки): padding 12/16/34, кнопка «Создать матч» coral min-height 56, иконка `qr-code`; под ней подсказка «QR появится после создания матча» 13/18 `inkMuted`.
- Нажатие создаёт матч и открывает «QR создан». QR до этого момента не существует.

### 2.5. «QR создан» (экран 41, «QR создан»)
- Карточка `surface` радиус `r-lg`, padding 20/16, рамка 1 px `line`: QR-плейсхолдер 216×216 (белая плитка 12 padding, radius 16, модули `ink` #24123A: **не настоящий QR**, подпись «QR de ejemplo» 12/16 600 `inkMuted`), заголовок «Partido creado» 22/26 (Montserrat Alternates 800), подпись «Que los demás escaneen el QR» 14/20 `inkMuted`.
- Строка-резюме под карточкой: круг 48 `tintMint`, название клуба 16/20 700, правила одной строкой 14/20 `inkMuted`.
- Нижняя кнопка «Listo»: coral, min-height 56, иконка `check`.
- Создание матча по QR, как и «Играю сейчас», **не запускает таймер, часы и Live Activity**: они стартуют, когда игра начата в самом матче.

## 3. Токены
Все цвета из Festa/home-error: фон `bg`, лист и карточки `surface`, текст `ink` (#24123A в светлой теме), второй текст `inkMuted`, рамки `line` / `lineStrong`, сегмент `segmentTrack`, активное `inverse`/`onInverse`, кнопка `brandCoral` #FF5E5B + `onBrand` #24123A (5,73:1), круги `tintMint`/`tintMango`, затемнение `ink` 45 %. Иконки Lucide stroke 2: `play`, `map-pin`, `chevron-right`, `chevron-left`, `x`, `check`, `timer`, `volleyball`, `qr-code`. Градиентов нет; единственная тень — `shadowCoral` на coral-кнопке в светлой теме.

Для React Native: лист — `Modal` (transparent) или bottom-sheet; затемнение `rgba(36,18,58,.45)` в обеих темах; `paddingBottom: Math.max(16, insets.bottom)` (на iPhone с индикатором это 34); кнопка `minHeight: 56`, `borderRadius: 999`; все строки `minHeight` 56–72 с `hitSlop` не нужен, цели уже ≥ 48.

## 4. Поведение
1. Тап «Играю сейчас» на главной: открывается лист, **игра не создаётся**, запросов к серверу нет, таймер, часы (Apple Watch) и Live Activity не запускаются.
2. Значения по умолчанию: клуб = ближайший по геолокации (если геолокации нет — последний использованный, если и его нет — первый в списке), счёт Ventaja, «Меняемся сторонами» включено. Последний выбор можно запоминать для следующего раза, но это решение за продуктом.
3. Тап по строке клуба открывает `ClubSheet` (2.2). Выбор клуба возвращает назад.
4. Тап «Начать игру»: создаётся игра с выбранными значениями, лист закрывается, запускаются таймер, часы и Live Activity. Один запрос и один переход. Повторное нажатие во время создания блокируется (кнопка неактивна, иконка `refresh-cw` крутится, как «Загрузка» в home-error).
5. Закрытие листа ничего не создаёт. Сегмент и переключатель меняются локально, без запросов.
6. «Матч по QR»: шаг до QR показывает то же резюме; «Создать матч» создаёт матч и показывает QR; назад возвращает на предыдущий экран. До нажатия QR в интерфейсе нет.
7. Текст под кнопкой («Таймер и часы начнут работу после нажатия») показывается всегда, он объясняет, что до нажатия ничего не стартует.

## 5. Тексты и ключи i18n (es · ca · en · ru · uk)
Названия режимов счёта «Ventaja» и «Punto de oro» не переводятся (в `play.scoring.adv` и `play.scoring.gold` одинаковое значение во всех языках). Обращение русское на «вы», украинское на «ви»; в этих экранах прямых обращений нет, кроме подсказок. Демо-имя игрока «Marc» не использовалось: имён на экранах нет.

**`prestart.play.title`**
- es: Nueva partida
- ca: Nova partida
- en: New game
- ru: Новая игра
- uk: Нова гра

**`prestart.play.club`**
- es: Club
- ca: Club
- en: Club
- ru: Клуб
- uk: Клуб

**`prestart.play.nearest`**
- es: Más cercano
- ca: El més proper
- en: Nearest
- ru: Ближайший
- uk: Найближчий

**`prestart.play.clubs.title`**
- es: Elige club
- ca: Tria club
- en: Choose a club
- ru: Выберите клуб
- uk: Оберіть клуб

**`prestart.play.rules`**
- es: Reglas
- ca: Regles
- en: Rules
- ru: Правила
- uk: Правила

**`prestart.play.scoring.adv`**
- es: Ventaja
- ca: Ventaja
- en: Ventaja
- ru: Ventaja
- uk: Ventaja

**`prestart.play.scoring.gold`**
- es: Punto de oro
- ca: Punto de oro
- en: Punto de oro
- ru: Punto de oro
- uk: Punto de oro

**`prestart.play.scoring.advHint`**
- es: Con 40–40 hay que ganar dos puntos seguidos.
- ca: Amb 40–40 cal guanyar dos punts seguits.
- en: At 40–40 you need to win two points in a row.
- ru: При 40–40 нужно выиграть два мяча подряд.
- uk: При 40–40 потрібно виграти два м’ячі поспіль.

**`prestart.play.scoring.goldHint`**
- es: Con 40–40 se decide en un solo punto.
- ca: Amb 40–40 es decideix en un sol punt.
- en: At 40–40 one point decides the game.
- ru: При 40–40 всё решает один мяч.
- uk: При 40–40 усе вирішує один м’яч.

**`prestart.play.sides`**
- es: Cambiamos de lado
- ca: Canviem de costat
- en: Switch sides
- ru: Меняемся сторонами
- uk: Міняємося сторонами

**`prestart.play.start`**
- es: Empezar partida
- ca: Començar partida
- en: Start game
- ru: Начать игру
- uk: Почати гру

**`prestart.play.hint`**
- es: El temporizador y el reloj empezarán al pulsar
- ca: El temporitzador i el rellotge començaran en prémer
- en: The timer and watch start when you tap
- ru: Таймер и часы начнут работу после нажатия
- uk: Таймер і годинник почнуть роботу після натискання

**`prestart.qr.title`**
- es: Partido con QR
- ca: Partit amb QR
- en: Match with QR
- ru: Матч по QR
- uk: Матч за QR

**`prestart.qr.create`**
- es: Crear partido
- ca: Crear partit
- en: Create match
- ru: Создать матч
- uk: Створити матч

**`prestart.qr.hint`**
- es: El QR aparecerá al crear el partido
- ca: El QR apareixerà en crear el partit
- en: The QR appears once you create the match
- ru: QR появится после создания матча
- uk: QR з’явиться після створення матчу

**`prestart.qr.created`**
- es: Partido creado
- ca: Partit creat
- en: Match created
- ru: Матч создан
- uk: Матч створено

**`prestart.qr.scan`**
- es: Que los demás escaneen el QR
- ca: Que els altres escanegin el QR
- en: Ask the others to scan the QR
- ru: Пусть остальные отсканируют QR
- uk: Нехай інші відскануюють QR

**`prestart.qr.done`**
- es: Listo
- ca: Fet
- en: Done
- ru: Готово
- uk: Готово

**`prestart.qr.demo`**
- es: QR de ejemplo
- ca: QR d’exemple
- en: Sample QR
- ru: Пример QR
- uk: Приклад QR


Уже существующие ключи (без изменений): `tab_*`, T.back («Atrás/Enrere/Back/Назад/Назад»), T.close («Cerrar/Tancar/Close/Закрыть/Закрити»).

## 6. Проверки
- `check.py --lang all --widths 360,390,430 --taps`: 150 видов (5 языков × 2 темы × 5 состояний × 3 ширины), **0 проблем**: нет переполнения, горизонтального скролла, обрезанных текстов, все тап-цели ≥ 48.
- `ps_contrast.py` (контраст текста против реального фона, 510 измерений на 5 состояний × 2 темы × 5 языков): **0 провалов**, худший 5,37:1 (порог 4,5). Кнопка coral: `onBrand` на `brandCoral` 5,73:1. Токеновый `contrast.py`: 0 провалов.
- Не проверено на устройстве: поведение жеста смахивания листа и Live Activity — это нативная часть.
- В QR-плейсхолдере и демо-списке клубов — вымышленные данные, настоящий QR генерирует приложение.
