# paddy-screen-v1
Экран Paddy: чат с памятью, кнопка «Что умею» + лист, шапка A/B, пустой чат, нет сети.
Сборка: `python3 tools/build.py` → index.html. PNG: `python3 tools/render.py --lang es,ca,en,ru,uk --theme light,dark --out png` и `python3 tools/widths.py`.
Проверки: `tools/check.py --taps --lang all --widths 340,360,390,430`, `tools/contrast.py`, `tools/flow.py` (клик-тест).
Живой макет: `index.html` (`?s=40&v=A|B`). Решения: DECISIONS.md.
