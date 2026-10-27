# Таб-бар «стекло» v3: 5 вкладок (решение Мурата 27.10, build 105)

Автор: Padelada Design · 27.10.2026. Заменяет v2 (home-error-v1/TABBAR-SPEC.md, 4 вкладки + Paddy). Живой макет: `index.html?s=64&st=spec` (лист размеров), `?s=60` (Клубы).

**Что изменилось относительно v2:** кнопки Paddy в панели больше нет; вкладок пять: Главная · Матчи · **Чаты (центр, крупнее, бейдж)** · Клубы · Профиль. Высота 72, низ 20/12, поля 12, внутренний отступ 14, подпись Golos 600 12/14 (W < 375: 11/14) — **без изменений**.

## 1. Значения для React Native (pt)

```ts
// src/components/tabBarSurface.ts
export const TAB_BAR_HEIGHT = 72;
export const TAB_BAR_SIDE = 12;          // при ширине < 340 — 8
export const TAB_BAR_SIDE_SMALL = 8;
export const TAB_BAR_PAD_H = 14;
export const TAB_PAD_TOP = 6;
export const TAB_LENS = 44;              // обычная вкладка: линза 44×44, значок 22
export const TAB_ICON = 22;
export const TAB_LABEL_LINE = 14;
export const TAB_PAD_BOTTOM = 8;         // 6 + 44 + 14 + 8 = 72
// центральная вкладка «Чаты»
export const TAB_CHATS_W = 68;           // фиксированная ширина ячейки
export const TAB_CHATS_ZONE_W = 64, TAB_CHATS_ZONE_H = 52;   // линза/зона значка (вместо 44×44)
export const TAB_CHATS_ICON = 28;
export const TAB_CHATS_LENS_TOP = -4;    // линза y = −4…48: выступает на 4 над капсулой; подпись на общей линии
export const TAB_CHATS_LENS_RADIUS = 26;
export const TAB_BADGE_H = 24;           // с обводкой 2 цвета панели; min ширина 28 (1–2 цифры), «99+» 32
export const TAB_BADGE_DX = 9, TAB_BADGE_TOP = -8;   // левый край = центр ячейки + 9; верх = −8 от верха капсулы
export const TAB_MIN_BOTTOM = 12;
export const TAB_CONTENT_GAP = 16;
export function tabBarBottom(safeBottom: number, os: 'ios'|'android'): number {
  return os === 'ios' ? Math.max(TAB_MIN_BOTTOM, safeBottom - 14) : Math.max(TAB_MIN_BOTTOM, safeBottom);
}
export const tabBarSide = (w: number) => (w < 340 ? TAB_BAR_SIDE_SMALL : TAB_BAR_SIDE);
/** Ширина обычной ячейки: 4 одинаковых, «Чаты» 68, зазоров нет. */
export const tabCellWidth = (w: number) => (w - 2 * tabBarSide(w) - 2 * TAB_BAR_PAD_H - TAB_CHATS_W) / 4;
export const tabLabelSize = (w: number) => (w >= 375 ? 12 : 11);
export const tabBarContentInset = (safeBottom: number, os: 'ios'|'android') => TAB_BAR_HEIGHT + tabBarBottom(safeBottom, os) + TAB_CONTENT_GAP;
```

Компонент:
- порядок и маршруты: `home, matches, chats (center), clubs, profile`; у «Чаты» `tabBarBadge` = число непрочитанных (все чаты + Paddy), «99+» с 100; `accessibilityLabel` «Чаты, N непрочитанных».
- контейнер: `position:'absolute', left/right: side + insets, bottom: tabBarBottom(...), height: 72, borderRadius: 999`, стекло как в v2 (`BlurView` + полупрозрачный `tabBar`, 1 px обводка).
- обычная ячейка: `flex: 1`, `height: 72`, `paddingTop: 6`, линза 44×44 под активной (blur + яркость, ободок 1 px, внутреннее кольцо mango в тёмной / ink в светлой теме, как в v2).
- «Чаты»: `width: 68`, `flex: 0`, `paddingTop: 6`; зона значка 64×52 с `marginTop: −10`, `marginBottom: 2` (значок 28 по центру зоны; активная линза занимает всю зону 64×52, `top: −4`, `borderRadius: 26`); подпись на той же строке, что у соседей (y = 50…64).
- подпись: `GolosText_600SemiBold` для всех языков, `maxFontSizeMultiplier={1}`, одна строка.
- бейдж: `position:'absolute'`, `minWidth: 24` (+ обводка 2 → 28), `height: 24`, `borderRadius: 12`, `backgroundColor: brandCoral`, текст `onBrand` Golos 700 12/20, `borderWidth: 2`, `borderColor: tabBar`.
- нижний отступ контента: 108 (iPhone с индикатором), 100 (SE без индикатора).

## 2. Расчёт ячейки

ячейка = (W − 24 − 28 − 68) / 4 = (W − 120) / 4 → 360: 60 · 375: 63,75 · 390: 67,5 · 393: 68,25 · 414: 73,5 · 430: 77,5. При W < 340 (поле 8): (W − 112) / 4.

## 3. Таблица запасов (реальный замер, pt; минимум по 5 языкам × 5 подписям)

| W, pt | поля | бар | ячейка | «Чаты» | шрифт | тап (мин.) | до края ячейки | между подписями | до контура капсулы |
|---|---|---|---|---|---|---|---|---|---|
| 360 | 12 | 336 | 60 | 68×72 | 11/14 | 60×72 | 5.4 | 17.6 | 6 |
| 375 | 12 | 351 | 63.75 | 68×72 | 12/14 | 63.75×72 | 5.1 | 17.5 | 5.8 |
| 390 | 12 | 366 | 67.5 | 68×72 | 12/14 | 67.5×72 | 7 | 21.2 | 6.8 |
| 393 | 12 | 369 | 68.25 | 68×72 | 12/14 | 68×72 | 7.3 | 22 | 7 |
| 414 | 12 | 390 | 73.5 | 68×72 | 12/14 | 68×72 | 10 | 27.2 | 8.3 |
| 430 | 12 | 406 | 77.5 | 68×72 | 12/14 | 68×72 | 12 | 30.9 | 9.1 |

Границы подписей — по Range/advance (без боковых полей глифа), поэтому реальный запас на ≈ 0,5 pt больше. Критерии: до края ячейки ≥ 4, до контура капсулы ≥ 5, между подписями ≥ 8 — **на 360–430 выполнены**; ниже 340 не проверялось на гарантию.

## 4. Тап-цели и контраст

- Ячейки панели: 72 высота × 60–77,5 ширина (центр 68×72) ≥ 48.
- Контраст (`contrast.md`): подписи и значки ink на tabBar ≥ 4,5 (светлая 16,7; тёмная 15,6 по токенам), активный значок в тёмной теме — mango на tabBar ≥ 4,5, бейдж: ink на coral 5,73. Модель стекла по худшим фонам — 0 провалов. `check.py` (320 видов, 360/375/393/430): 0 проблем.

## 5. Что менять относительно билда 101/104

1. Убрать кнопку Paddy из панели; Paddy — первый элемент списка «Чаты» (как в `chats-pinned-paddy-v1`).
2. Пять вкладок, «Чаты» по центру крупнее (64×52 / значок 28) с бейджем.
3. Новый экран «Клубы» (анонсы всех клубов игрока + «Мои клубы»; пусто для новичка) — см. `SPEC.md`.
4. Остальные пункты v2 (низ 20/12, высота 72, поля 12, Golos 600 для всех языков, низ контента 108/100) — как были.
