# COPY es (черновик)
## Главная
**Hero:** Tu pádel. Tu comarca. Tu club.  
Sub: Club Padelada une a los jugadores de cada comarca: partidos, torneos y un capitán que lo mueve todo.  
Botón principal: Encuentra tu comarca → #comarcas (Descargar solo en cabecera y #app)

**#club — El club**  
Juegas con gente de tu nivel, cerca de casa.  
Cada comarca tiene su comunidad y su capitán.  
Torneos abiertos todo el año.  
Todo se organiza desde la app.

**#comarcas** — Título: 42 comarcas, un mismo club. · Sub: Elige la tuya en el mapa. · CTA mapa: Ver comarca

**#torneos** — Título: Torneos abiertos · Vacío: Pronto habrá nuevos torneos en tu comarca. · Fila CTA: Apuntarse en la app

**#capitanes** — Cada comarca tiene un capitán: organiza partidos, abre torneos y da la bienvenida a los nuevos.

**#fundador — Hazte Fundador de tu comarca**  
Invita a jugadores a tu comarca.  
Si por tu invitación entra el jugador 16, eres el Fundador (cuenta la hora del servidor).  
El Fundador es el capitán mientras quiera serlo.  
CTA: Elige tu comarca

**#faq**  
1. ¿Qué es Club Padelada? — Una comunidad de pádel organizada por comarcas, con partidos y torneos en la app.  
2. ¿Cómo me uno? — Descarga la app, elige tu comarca y ya estás dentro.  
3. ¿Qué hace el capitán? — Organiza la vida de la comarca: partidos, torneos y nuevos miembros.  
4. ¿Cómo se elige al Fundador? — Es quien invita al jugador 16 de la comarca. Si hay empate, decide la hora del servidor.  
5. ¿Puedo jugar en otra comarca? — Sí, en torneos abiertos; tu comarca es la de tu zona.  

**#app** — Todo el club, en tu móvil. [App Store] [Google Play]  
Footer: Términos → https://padelada.com/ · Privacidad → https://padelada.com/ · Contacto

## /comarca/<slug>/
Título: {name}
- **empty:** Esta comarca aún no tiene Fundador. ¡Sé el primero! Invita a jugadores y hazte Fundador. · Contador: {members_count} de 16 jugadores · Botón: Hazte Fundador
- **contest:** La comarca está en marcha: faltan {members_left} jugadores para llegar a 16. Quien invite al jugador 16 será el Fundador. · Contador: {members_count} de 16 · Botón: Hazte Fundador
- **active:** {name} ya tiene Fundador. {has_captain ? "La comarca tiene capitán." : "Pronto tendrá capitán."} Únete y juega con tu comarca. · Botón: Descargar la app
Condiciones (todas): El Fundador es quien invita al jugador 16 (hora del servidor). Es capitán hasta que decida dejarlo. No mostramos nombres de participantes.
404: Esta comarca no existe. · Ver el mapa

## /comarca/<slug>/captain (fallback sin app)
Título: Hazte Fundador de {name}  
Texto: Instala Club Padelada para participar. Después de instalar, abre la app: te llevará a tu comarca.  
[App Store] [Google Play] · Enlace: Ver condiciones → /comarca/<slug>/

## Members-only stub
Esto está en la app. Descárgala para entrar. [App Store] [Google Play]


Nota: no se muestra contestants_count («N compiten»); solo X/16 y «faltan N».

## Решено (1.11)
- Hero: «Tu pádel. Tu comarca. Tu club.»; CTA «Encuentra tu comarca».
- Комарка: только «X de 16 jugadores» и «faltan N»; contestants_count нет; имён нет.
