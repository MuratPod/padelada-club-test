'use strict';
const LANGS=['es','ca','en','ru','uk'];
const LI={es:0,ca:1,en:2,ru:3,uk:4};
// строки: [es, ca, en, ru, uk]
const T={
tab_home:['Inicio','Inici','Home','Главная','Головна'],
tab_matches:['Partidos','Partits','Matches','Матчи','Матчі'],
tab_chats:['Chats','Xats','Chats','Чаты','Чати'],
tab_club:['Club','Club','Club','Клуб','Клуб'],
tab_profile:['Perfil','Perfil','Profile','Профиль','Профіль'],
back:['Atrás','Enrere','Back','Назад','Назад'],
close:['Cerrar','Tancar','Close','Закрыть','Закрити'],
chat_sub:['{n} jugadores','{n} jugadors','{n} players','{n} игроков','{n} гравців'],
tr_on:['Traducción','Traducció','Translation','Перевод','Переклад'],
tr_off:['Original','Original','Original','Оригинал','Оригінал'],
tr_aria:['Cambiar entre traducción y original','Canviar entre traducció i original','Switch between translation and original','Переключить перевод и оригинал','Перемкнути переклад і оригінал'],
orig_cap:['Original · ','Original · ','Original · ','Оригинал · ','Оригінал · '],
see_tr:['Ver traducción','Veure la traducció','See translation','Показать перевод','Показати переклад'],
see_orig:['Ver original','Veure l’original','See original','Показать оригинал','Показати оригінал'],
from_ca:['Traducido del catalán','Traduït del català','Translated from Catalan','Переведено с каталанского','Перекладено з каталанської'],
from_es:['Traducido del español','Traduït del castellà','Translated from Spanish','Переведено с испанского','Перекладено з іспанської'],
m0:{ca:'Bon dia! Avui hi ha pistes lliures a Palamós.',es:'¡Buenos días! Hoy hay pistas libres en Palamós.',en:'Good morning! There are free courts in Palamós today.',ru:'Доброе утро! Сегодня в Паламосе есть свободные корты.',uk:'Доброго ранку! Сьогодні в Паламосі є вільні корти.'},
today:['Hoy','Avui','Today','Сегодня','Сьогодні'],
m1:{ca:'Qui juga demà a Palamós?',es:'¿Quién juega mañana en Palamós?',en:'Who’s playing in Palamós tomorrow?',ru:'Кто завтра играет в Паламосе?',uk:'Хто завтра грає в Паламосі?'},
m2:{es:'Yo puedo a partir de las siete. Llevo pelotas.',ca:'Jo puc a partir de les set. Porto pilotes.',en:'I can play after seven. I’ll bring the balls.',ru:'Я могу после семи. Возьму мячи.',uk:'Я можу після сьомої. Візьму м’ячі.'},
m3:{es:'Me apunto. Reservo pista a las 19:00.',ca:'M’hi apunto. Reservo pista a les 19:00.',en:'I’m in. I’ll book a court for 19:00.',ru:'Я в деле. Забронирую корт на 19:00.',uk:'Я в грі. Забронюю корт на 19:00.'},
mv:{es:'¡Yo también voy! Si queréis, llego a las siete y reservo pista en Palamós.',ca:'Jo també hi sóc! Si voleu, arribo a les set i reservo pista a Palamós.',en:'Count me in! If you like, I’ll get there at seven and book a court in Palamós.',ru:'Я тоже в деле! Если хотите, приду к семи и забронирую корт в Паламосе.',uk:'Я теж у грі! Якщо хочете, прийду на сьому й забронюю корт у Паламосі.'},
lbl_tr:['Traducción','Traducció','Translation','Перевод','Переклад'],
lbl_ts:['Transcripción','Transcripció','Transcript','Расшифровка','Розшифровка'],
listen:['Escuchar con la voz de la autora','Escoltar amb la veu de l’autora','Listen in the author’s voice','Послушать голосом автора','Послухати голосом автора'],
ph:['Mensaje','Missatge','Message','Сообщение','Повідомлення'],
typed:['Llego a las siete. ¿Falta alguien para el partido?','Arribo a les set. Falta algú per al partit?','I’ll be there at seven. Does anyone need a fourth?','Буду к семи. Нужен ещё один игрок на матч?','Буду до сьомої. Потрібен ще один гравець на матч?'],
a_attach:['Adjuntar','Adjuntar','Attach','Прикрепить','Прикріпити'],
a_mic:['Dictado: toca. Mensaje de voz: mantén pulsado','Dictat: toca. Missatge de veu: mantén premut','Dictate: tap. Voice message: hold','Диктовка: нажмите. Голосовое: удерживайте','Диктування: натисніть. Голосове: утримуйте'],
send_text:['Texto','Text','Text','Текстом','Текстом'],
send_text_a:['Enviar como texto','Enviar com a text','Send as text','Отправить текстом','Надіслати текстом'],
myv:['Mi voz','La meva veu','My voice','Моим голосом','Моїм голосом'],
myv_full:['«Con mi voz»','«Amb la meva veu»','“In my voice”','«Моим голосом»','«Моїм голосом»'],
rec_hint:['Suelta para enviar · Desliza para cancelar','Deixa anar per enviar · Llisca per cancel·lar','Release to send · Slide to cancel','Отпустите — отправить · Смахните — отмена','Відпустіть — надіслати · Змахніть — скасувати'],
dict_t:['Dictando…','Dictant…','Dictating…','Диктовка…','Диктування…'],
dict_h:['Habla y pulsa «Listo»','Parla i prem «Fet»','Speak, then tap “Done”','Говорите и нажмите «Готово»','Говоріть і натисніть «Готово»'],
lit:['Literario','Literari','Polished','Литературно','Літературно'],
done:['Listo','Fet','Done','Готово','Готово'],
cancel:['Cancelar','Cancel·la','Cancel','Отмена','Скасувати'],
err_t:['No se pudo dictar','No s’ha pogut dictar','Dictation didn’t work','Не удалось продиктовать','Не вдалося продиктувати'],
err_b:['Inténtalo de nuevo o escribe el mensaje.','Torna-ho a provar o escriu el missatge.','Try again or type your message.','Попробуйте ещё раз или напишите сообщение.','Спробуйте ще раз або напишіть повідомлення.'],
retry:['Repetir','Repeteix','Try again','Повторить','Повторити'],
write:['Escribir','Escriure','Type','Написать','Написати'],
att_t:['Adjuntar','Adjuntar','Attach','Прикрепить','Прикріпити'],
photo:['Foto','Foto','Photo','Фото','Фото'],
video:['Vídeo','Vídeo','Video','Видео','Відео'],
file:['Archivo','Fitxer','File','Файл','Файл'],
place:['Ubicación','Ubicació','Location','Место','Місце'],
stick:['Stickers y GIF','Stickers i GIF','Stickers & GIFs','Стикеры и GIF','Стікери та GIF'],
lock_note:['Estos adjuntos son para miembros del club.','Aquests adjunts són per a membres del club.','These attachments are for club members.','Эти вложения — для членов клуба.','Ці вкладення — для членів клубу.'],
become:['Hazte miembro del club','Fes-te membre del club','Become a club member','Станьте членом клуба','Станьте членом клубу'],
become_c:['Hazte miembro del club para continuar','Fes-te membre del club per continuar','Become a club member to continue','Станьте членом клуба, чтобы продолжить','Станьте членом клубу, щоб продовжити'],
how_member:['Cómo ser miembro del club','Com ser membre del club','How to become a club member','Как стать членом клуба','Як стати членом клубу'],
nb_body:['Fotos, vídeos, archivos, enlaces, teléfonos, mensajes personales y grupos se abren cuando eres miembro del club. Escribir en el chat de tu comarca, dictar y enviar mensajes de voz ya puedes.','Fotos, vídeos, fitxers, enllaços, telèfons, missatges personals i grups s’obren quan ets membre del club. Escriure al xat de la teva comarca, dictar i enviar missatges de veu ja ho pots fer.','Photos, videos, files, links, phone numbers, personal messages and groups unlock when you’re a club member. You can already write in your comarca chat, dictate and send voice messages.','Фото, видео, файлы, ссылки, телефоны, личные сообщения и группы открываются, когда вы — член клуба. Писать в чат комарки, диктовать и отправлять обычные голосовые можно уже сейчас.','Фото, відео, файли, посилання, телефони, особисті повідомлення та групи відкриваються, коли ви — член клубу. Писати в чат комарки, диктувати й надсилати звичайні голосові можна вже зараз.'],
lim_t:['Dictado de hoy agotado','Dictat d’avui esgotat','Today’s dictation is used up','Диктовка на сегодня закончилась','Диктування на сьогодні закінчилось'],
lim_b:['Seguirá funcionando, pero literal, sin pulir el texto. Se renueva {d}.','Continuarà funcionant, però literal, sense polir el text. Es renova {d}.','It still works, but word for word, without polishing. Resets {d}.','Диктовка продолжит работать, но дословно, без литературной обработки. Обнулится {d}.','Диктування працюватиме далі, але дослівно, без літературної обробки. Обнулиться {d}.'],
lim_nb_b:['El dictado de hoy se ha agotado. Se renueva {d}.','El dictat d’avui s’ha esgotat. Es renova {d}.','Today’s dictation is used up. Resets {d}.','Диктовка на сегодня закончилась. Обнулится {d}.','Диктування на сьогодні закінчилось. Обнулиться {d}.'],
more_plus:['Más con Plus','Més amb Plus','More with Plus','Больше с Plus','Більше з Plus'],
my_limits:['Mis límites','Els meus límits','My limits','Мои лимиты','Мої ліміти'],
// №6
p6_voice_t:['«Con mi voz» es de Plus','«Amb la meva veu» és de Plus','“In my voice” is a Plus feature','«Моим голосом» — в Plus','«Моїм голосом» — у Plus'],
p6_voice_b:['Escribe o habla en tu idioma: la otra persona te oye con tu voz en el suyo.','Escriu o parla en el teu idioma: l’altra persona t’escolta amb la teva veu en el seu.','Write or speak in your language: the other person hears your voice in theirs.','Пишите или говорите на своём языке — собеседник услышит ваш голос на своём.','Пишіть або говоріть своєю мовою — співрозмовник почує ваш голос своєю.'],
p6_voice_r:['Hace falta: 18+, consentimiento y una muestra de tu voz.','Cal: 18+, consentiment i una mostra de la teva veu.','You’ll need: 18+, consent and a voice sample.','Нужны: 18+, согласие и запись образца голоса.','Потрібні: 18+, згода й запис зразка голосу.'],
p6_lim_t:['Hoy se acabó el límite','Avui s’ha acabat el límit','Today’s limit is used up','На сегодня лимит закончился','На сьогодні ліміт закінчився'],
p6_lim_b:['Plus da más dictado y Paddy. Se renueva {d}.','Plus dona més dictat i Paddy. Es renova {d}.','Plus gives more dictation and Paddy. Resets {d}.','Plus даёт больше диктовки и Paddy. Лимит обнулится {d}.','Plus дає більше диктування й Paddy. Ліміт обнулиться {d}.'],
p6_trv_t:['Viaja por otras comarcas','Viatja per altres comarques','Travel to other comarcas','Чаты других комарок','Подорожуй іншими комарками'],
p6_trv_b:['Con Plus tienes en el chat de otra comarca los mismos derechos que en casa, mientras Plus esté activo. En el perfil y el chat aparece la marca «de visita».','Amb Plus tens al xat d’una altra comarca els mateixos drets que a casa, mentre Plus estigui actiu. Al perfil i al xat apareix la marca «de visita».','With Plus you get the same rights as at home in another comarca’s chat while Plus is active. Your profile and chat show a “visiting” mark.','С Plus в чужой комарке у вас те же права, что дома, пока Plus активен. В профиле и чате будет пометка «в гостях».','З Plus у чаті чужої комарки у вас ті самі права, що вдома, поки Plus активний. У профілі й чаті буде позначка «у гостях».'],
p6_club_t:['Plus es para miembros del club','Plus és per a membres del club','Plus is for club members','Plus — для членов клуба','Plus — для членів клубу'],
p6_club_b:['Hazte miembro del club y se abren Plus, las fotos y «Con mi voz».','Fes-te membre del club i s’obren Plus, les fotos i «Amb la meva veu».','Become a club member to unlock Plus, photos and “In my voice”.','Станьте членом клуба — и откроются Plus, фото и «Моим голосом».','Станьте членом клубу — і відкриються Plus, фото та «Моїм голосом».'],
r_dict:['Dictado','Dictat','Dictation','Диктовка','Диктування'],
r_paddy:['Paddy','Paddy','Paddy','Paddy','Paddy'],
r_myv:['Con mi voz','Amb la meva veu','In my voice','Моим голосом','Моїм голосом'],
r_trv:['Otras comarcas','Altres comarques','Other comarcas','Другие комарки','Інші комарки'],
u_min:['min al mes','min al mes','min / month','мин в месяц','хв на місяць'],
u_day:['al día','al dia','per day','в сутки','на добу'],
u_msg:['mensajes al día','missatges al dia','messages per day','сообщений в сутки','повідомлень на добу'],
u_chr:['caracteres al mes','caràcters al mes','characters / month','знаков в месяц','символів на місяць'],
u_day_n:['{n} al día','{n} al dia','{n} per day','{n} в сутки','{n} на добу'],
u_min_n:['{n} min','{n} min','{n} min','{n} мин','{n} хв'],
incl:['Incluido','Inclòs','Included','Входит','Входить'],
price_ph:['Precio: lo muestra la tienda','Preu: el mostra la botiga','Price: shown by the store','Цена — из магазина','Ціна — з магазину'],
cta_plus:['Activar Plus','Activar Plus','Get Plus','Оформить Plus','Оформити Plus'],
cta_max:['Activar Max','Activar Max','Get Max','Оформить Max','Оформити Max'],
legal_ph:['[Texto legal de la suscripción — pendiente]','[Text legal de la subscripció — pendent]','[Subscription legal text — pending]','[Юридический текст подписки — ожидается]','[Юридичний текст підписки — очікується]'],
see_limits:['Ver mis límites','Veure els meus límits','See my limits','Мои лимиты','Мої ліміти'],
// №7
p7_t:['Límites','Límits','Limits','Лимиты','Ліміти'],
p7_s:['Perfil','Perfil','Profile','Профиль','Профіль'],
your_plan:['Tu plan','El teu pla','Your plan','Ваш план','Ваш план'],
free_note:['Plus y Max son para miembros del club.','Plus i Max són per a membres del club.','Plus and Max are for club members.','Plus и Max — для членов клуба.','Plus і Max — для членів клубу.'],
nb_note:['Todavía no eres miembro del club.','Encara no ets membre del club.','You’re not a club member yet.','Вы пока не член клуба.','Ви поки не член клубу.'],
st_ok:['Hay de sobra','Hi ha prou','Plenty left','Достаточно','Достатньо'],
st_low:['Queda poco','Queda poc','Running low','Мало','Мало'],
st_out:['Agotado','Esgotat','Used up','Исчерпано','Вичерпано'],
reset:['Se renueva {d}','Es renova {d}','Resets {d}','Обнулится {d}','Обнулиться {d}'],
left:['Quedan {u} de {t}','Queden {u} de {t}','{u} of {t} left','Осталось {u} из {t}','Залишилось {u} з {t}'],
u_chr_s:['car./mes','car./mes','chars/mo','зн./мес.','зн./міс.'],
of:['{u} de {t}','{u} de {t}','{u} of {t}','{u} из {t}','{u} з {t}'],
paddy_note:['La configuración inicial con Paddy no cuenta.','La configuració inicial amb Paddy no compta.','Initial setup with Paddy doesn’t count.','Первоначальная настройка с Paddy в лимит не входит.','Початкове налаштування з Paddy не входить у ліміт.'],
myv_na_free:['No disponible en Free · incluido en Plus','No disponible a Free · inclòs a Plus','Not available on Free · included in Plus','Недоступно в Free · входит в Plus','Недоступно у Free · входить у Plus'],
myv_na_nb:['Solo para miembros del club','Només per a membres del club','Club members only','Только для членов клуба','Лише для членів клубу'],
to_max:['Pasar a Max','Passar a Max','Upgrade to Max','Перейти на Max','Перейти на Max'],
nb_banner_b:['Así se abren Plus y «Con mi voz». Aquí no hay botón de compra.','Així s’obren Plus i «Amb la meva veu». Aquí no hi ha botó de compra.','That unlocks Plus and “In my voice”. There’s no purchase button here.','Так откроются Plus и «Моим голосом». Кнопки покупки здесь нет.','Так відкриються Plus і «Моїм голосом». Кнопки покупки тут немає.'],

// ---- правки App Manager: как стать членом клуба (ru account.pclub.*), микрофон
cs_intro:['El club se gana jugando: gratis y para siempre. Qué hace falta:','El club es guanya jugant: gratis i per sempre. Què cal:','You earn the club by playing: free and for life. What it takes:','Клуб заслуживают игрой — бесплатно и навсегда. Что нужно:','Клуб заслуговують грою — безкоштовно й назавжди. Що потрібно:'],
cs_games:['2 partidos verificados en 7 días: llevas {n}','2 partits verificats en 7 dies: en portes {n}','2 verified games in 7 days: {n} so far','2 проверенные игры за 7 дней — сыграно {n}','2 перевірені гри за 7 днів — зіграно {n}'],
cs_people:['Con 4 personas distintas: llevas {n}','Amb 4 persones diferents: en portes {n}','With 4 different people: {n} so far','С 4 разными людьми — пока {n}','З 4 різними людьми — поки {n}'],
cs_photo:['Una foto real en el perfil','Una foto real al perfil','A real photo in your profile','Настоящее фото в профиле','Справжнє фото в профілі'],
cs_name:['Tu nombre en el perfil','El teu nom al perfil','Your name in your profile','Имя в профиле','Ім’я в профілі'],
cs_auto:['Sin formularios ni aprobaciones: en cuanto se cumplen las condiciones, te aceptan solos. Eres miembro para siempre.','Sense formularis ni aprovacions: tan bon punt es compleixen les condicions, t’accepten sols. Ets membre per sempre.','No forms, no approvals: as soon as the conditions are met, you are admitted automatically. Membership is for life.','Ни анкет, ни одобрений: как только условия выполнены, вас принимают сами. Членство — навсегда.','Жодних анкет і схвалень: щойно умови виконано, вас приймають самі. Членство — назавжди.'],
how_h:['Cómo entrar','Com entrar','How to join','Как войти','Як вступити'],
todo:['Pendiente','Pendent','To do','Не выполнено','Не виконано'],
mic_t:['Sin acceso al micrófono','Sense accés al micròfon','No microphone access','Нет доступа к микрофону','Немає доступу до мікрофона'],
mic_b:['Para dictar o enviar mensajes de voz, permite el micrófono en los ajustes del teléfono.','Per dictar o enviar missatges de veu, permet el micròfon als ajustos del telèfon.','To dictate or send voice messages, allow the microphone in your phone settings.','Чтобы диктовать и отправлять голосовые, разреши микрофон в настройках телефона.','Щоб диктувати й надсилати голосові, дозволь мікрофон у налаштуваннях телефона.'],
mic_set:['Abrir ajustes','Obre els ajustos','Open settings','Открыть настройки','Відкрити налаштування'],
tip_1_old:['Toca: dictado','Toca: dictat','Tap: dictation','Тап — диктовка','Тап — диктування'],
tip_2_old:['Mantén: mensaje de voz','Mantén: missatge de veu','Hold: voice message','Удержание — голосовое','Утримання — голосове'],
toast_set:['Ajustes del sistema (no dibujados)','Ajustos del sistema (no dibuixats)','System settings (not drawn)','Системные настройки (не нарисованы)','Системні налаштування (не намальовані)'],
tip_1:['Dictar: voz a texto','Dictar: veu a text','Dictate: speech to text','Диктовка: речь в текст','Диктування: мова в текст'],
tip_2:['Voz: toca, habla, toca otra vez','Veu: toca, parla, toca un altre cop','Voice: tap, speak, tap again','Голосовое: нажмите, говорите, нажмите ещё раз','Голосове: натисніть, говоріть, натисніть ще раз'],
a_dict:['Dictar','Dictar','Dictate','Диктовка','Диктування'],
a_stop:['Parar grabación','Parar enregistrament','Stop recording','Остановить запись','Зупинити запис'],
a_del:['Descartar','Descarta','Discard','Удалить запись','Видалити запис'],
a_play:['Escuchar','Escolta','Play','Прослушать','Прослухати'],
a_send:['Enviar','Envia','Send','Отправить','Надіслати'],
rec_stop:['Toca otra vez para parar','Toca un altre cop per parar','Tap again to stop','Нажмите ещё раз, чтобы остановить','Натисніть ще раз, щоб зупинити'],
dict_lit:['Con tratamiento literario','Amb tractament literari','Literary polish on','Литературная обработка включена','Літературну обробку ввімкнено'],
myv_hold:['Mantén «Enviar» para enviar con tu voz','Mantén «Envia» per enviar amb la teva veu','Hold “Send” to send in your voice','Удерживайте «Отправить» — отправить своим голосом','Утримуйте «Надіслати» — надіслати своїм голосом'],
myv_sh_b:['Tu texto se enviará con una copia de tu voz. Solo mayores de 18 años y con el consentimiento ya dado.','El teu text s’enviarà amb una còpia de la teva veu. Només majors de 18 anys i amb el consentiment ja donat.','Your text will be sent with a copy of your voice. 18+ only, and only with the consent you already gave.','Текст уйдёт копией вашего голоса. Только 18+ и только с уже данным согласием.','Текст піде копією вашого голосу. Лише 18+ і лише з уже даною згодою.'],
myv_go:['Enviar con mi voz','Enviar amb la meva veu','Send in my voice','Отправить моим голосом','Надіслати моїм голосом'],
contact:['Contacto','Contacte','Contact','Контакт','Контакт'],
inv_game:['Invitar a jugar','Convidar a jugar','Invite to a game','Пригласить в игру','Запросити до гри'],
lbl_orig:['Original','Original','Original','Оригинал','Оригінал'],
toast_soon:['Pantalla de otro diseño (aún no dibujada)','Pantalla d’un altre disseny (encara no dibuixada)','Another design screen (not drawn yet)','Это другой экран (пока не нарисован)','Це інший екран (поки не намальований)'],
};
const NAMES={ca:'Baix Empordà'};
let S={screen:'3',lang:'ru',theme:'light',s3:'empty',s6:'voice',s6plan:'plus',s7:{plan:'free',level:'far'},tr:'on',orig:{},extra:[],text:'',stack:[],toast:null};
const q=new URLSearchParams(location.search);
const BARE=q.get('bare')==='1';
const t=(k,p)=>{let v=T[k][LI[S.lang]];if(p)for(const x in p)v=v.replace('{'+x+'}',p[x]);return v.replace('..','.')};
const tl=(k)=>T[k][S.lang]; // для словарей по языку
const isCyr=s=>/[\u0400-\u04FF]/.test(s);
const disp=s=>isCyr(s)?' dc':'';
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const ic=(n,c='')=>`<svg class="i ${c}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const nf=(n)=>{const s=String(n);if(n<1000)return s;const sep={es:'.',ca:'.',en:',',ru:'\u00A0',uk:'\u00A0'}[S.lang];return s.replace(/\B(?=(\d{3})+(?!\d))/g,sep)};
const TODAY=new Date(2026,9,25);
const dfmt=(d)=>new Intl.DateTimeFormat(S.lang,{day:'numeric',month:'short'}).format(d);
const dTomorrow=()=>({es:'mañana',ca:'demà',en:'tomorrow',ru:'завтра',uk:'завтра'})[S.lang];
const dMonth=()=>({es:'el 1 de noviembre',ca:'l’1 de novembre',en:'on November 1',ru:'1 ноября',uk:'1 листопада'})[S.lang];

/* ---------- состояния экрана №3 ---------- */
const ST3={
 'empty':{mode:'empty'},
 'typing':{mode:'typing'},
 'typing-plus':{mode:'typing',plus:true},
 'recording':{mode:'recording'},
 'voice-review':{mode:'voiceReview'},
 'dictation':{mode:'dictation'},
 'dictation-error':{mode:'dictErr'},
 'attach':{mode:'attach'},
 'newbie':{mode:'typing',member:false},
 'newbie-attach':{mode:'attach',member:false},
 'newbie-sheet':{mode:'typing',member:false,sheet:'club'},
 'stickers':{mode:'empty',sheet:'stickers'},
 'newbie-stickers':{mode:'typing',member:false,sheet:'stickers'},
 'limit':{mode:'empty',hint:'limit'},
 'limit-newbie':{mode:'empty',hint:'limit',member:false},
 'translate-off':{mode:'empty',tr:'off'},
 'voice-in':{mode:'empty',voiceIn:true},
 'myv-sheet':{mode:'typing',plus:true,sheet:'myv'},
 'mic-denied':{mode:'micDenied'},
 'mic-tip':{mode:'empty',tip:true},
};
const LBL3={
 'empty':'Пусто','typing':'Набор текста (без Plus)','typing-plus':'Набор (с Plus)','recording':'Запись: тап — остановить','voice-review':'Голосовое: прослушать и отправить','myv-sheet':'Долгое нажатие «Отправить» (Plus)',
 'dictation':'Диктовка идёт','dictation-error':'Диктовка: ошибка','attach':'Вложения','newbie':'Новичок: закрыто',
 'newbie-attach':'Новичок: вложения','stickers':'Стикеры','newbie-stickers':'Новичок: стикеры','newbie-sheet':'Новичок: «Стань членом»','limit':'Лимит исчерпан','limit-newbie':'Лимит: новичок',
 'translate-off':'Показан оригинал','voice-in':'Входящее голосовое: расшифровка','mic-denied':'Нет доступа к микрофону','mic-tip':'Подсказка: диктовка / голосовое'
};
const ST6={voice:'Из серой кнопки',limit:'Из исчерпанного лимита',travel:'Из путешествия',club:'Новичок (без покупки)'};
const ST7={plan:{free:'Free',plus:'Plus',max:'Max',newbie:'Новичок'},level:{far:'Достаточно',low:'Мало (<20%)',out:'Исчерпано'}};

/* ---------- данные №7 ---------- */
const LIM={
 free:{far:{v:[3,10],d:[2,10],p:[1,5]},low:{v:[9,10],d:[9,10],p:[4,5]},out:{v:[10,10],d:[10,10],p:[5,5]}},
 plus:{far:{v:[8,30],d:[12,40],p:[5,20],md:[1,3],mc:[1200,6000]},low:{v:[28,30],d:[38,40],p:[19,20],md:[2,3],mc:[5500,6000]},out:{v:[30,30],d:[40,40],p:[20,20],md:[3,3],mc:[4100,6000]}},
 max:{far:{v:[14,60],d:[20,100],p:[8,50],md:[1,5],mc:[6500,30000]},low:{v:[58,60],d:[96,100],p:[49,50],md:[4,5],mc:[28000,30000]},out:{v:[60,60],d:[100,100],p:[50,50],md:[5,5],mc:[12000,30000]}},
};
LIM.newbie=LIM.free;
const stat=(u,tot)=>{const left=tot-u;return left<=0?'out':(left/tot<0.2?'low':'ok')};


function clubSteps(){
 const rows=[['volleyball','cs_games'],['users','cs_people'],['image','cs_photo'],['user-round','cs_name']];
 return `<p class="cs-i">${esc(t('cs_intro'))}</p><ul class="cs">${rows.map(([i,k],j)=>`<li><span class="ic t${j%3+1}">${ic(i,'i22')}</span><span class="lb">${esc(t(k,{n:0}))}</span><span class="td" role="img" aria-label="${esc(t('todo'))}">${ic('circle','i22')}</span></li>`).join('')}</ul><div class="cs-a">${ic('badge-check','i22')}<span>${esc(t('cs_auto'))}</span></div>`}
function howSheet(){
 return `<div class="scrim" data-act="close-how"></div><div class="sheet" role="dialog"><div class="grab"></div><div class="sh-h"><h2 class="${disp(t('how_h')).trim()}">${esc(t('how_h'))}</h2><button class="circ" data-act="close-how" aria-label="${esc(t('close'))}">${ic('x','i24')}</button></div>${clubSteps()}</div>`}
/* ---------- рендер ---------- */
function status(){return `<div class="status"><span>9:41</span><span class="sb"><svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5" width="3" height="7" rx="1"/><rect x="10" y="2.5" width="3" height="9.5" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg><svg width="17" height="12" viewBox="0 0 17 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1.5 4.2a10 10 0 0 1 14 0"/><path d="M4 7a6.5 6.5 0 0 1 9 0"/><circle cx="8.5" cy="10" r="1" fill="currentColor"/></svg><svg width="27" height="13" viewBox="0 0 27 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="currentColor"/><rect x="2" y="2" width="19" height="9" rx="2" fill="currentColor"/><rect x="24" y="4" width="2" height="5" rx="1" fill="currentColor"/></svg></span></div><div class="mstrip"><button class="demo-btn" data-act="panel">${ic('settings-2','i14')}Демо</button></div>`}
const FBEST=4;/* лучшее исполнение F — по умолчанию (?menu=F); F1…F5 — варианты исполнения */
const RBEST=2;/* круг R1–R3 — отклонён Murat 25.10 22:18; по умолчанию D1 (пилюля) */
const MENUV=(new URLSearchParams(location.search).get('menu')||'D1').toUpperCase();
const RN=(m=>m?(m[1]?+m[1]:RBEST):0)(/^R([1-3])?$/.exec(MENUV));
const FN=(m=>m?(m[1]?+m[1]:FBEST):0)(/^F([1-5])?$/.exec(MENUV));
const DN=(m=>m?+m[1]:0)(/^D([1-4])$/.exec(MENUV));/* D1…D4 — исполнение овальной кнопки (правки 10); ?menu=D — прежний архивный D */
const FICO={1:'paddy1',2:'paddy2',3:'paddy3',4:'paddy3',5:'paddy2'};/* по умолчанию F (выбор Мурата 25.10: обычная вкладка с иконкой-силуэтом Paddy); E: овальная кнопка «Paddy»; D: пилюля с маленьким Paddy; F: обычная вкладка с иконкой; A: круг, Paddy целиком; B: без круга; C: компактный в круге-вырезе */
function tabbar(active){
 /* документ Paddy §11a: Главная, Матчи, Paddy (по центру, без подписи), Чаты, Профиль; «Клубы» переехали на Главную */
 const L=[['home','house','tab_home'],['matches','volleyball','tab_matches'],['paddy'],['chats','message-circle','tab_chats'],['profile','user-round','tab_profile']];
 const nbw=/newbie/.test(S.wst||'')||S.screen==='20';
 const fk=MENUV==='C'?'tabC':'tabF';
 const pact=active==='paddy'?'noop':(nbw?'go:8:onboarding':'go:8:chat');
 return `<nav class="tabs mv${RN?'Rx mvR'+RN:FN?'F mvF'+FN:DN?'Dx mvD'+DN:MENUV}" aria-label="tabs">${L.map(([id,i,k])=>id==='paddy'
  ?(RN?`<button class="tab rb rb${RN}${active==='paddy'?' on':''}" data-act="${pact}" aria-label="Paddy"><em class="rbc" aria-hidden="true">${pdSvg('tabF')}</em></button>`
  :DN?`<button class="tab pdp pdx pdx${DN}${active==='paddy'?' on':''}" data-act="${pact}" aria-label="Paddy"><em class="pdb" aria-hidden="true">${pdSvg('tabF')}</em></button>`
  :MENUV==='D'?`<button class="tab pdp pdD${active==='paddy'?' on':''}" data-act="${pact}" aria-label="Paddy"><em class="pdb" aria-hidden="true">${pdSvg(S.theme==='dark'?'tabFD':'tabF')}</em></button>`
  :MENUV==='E'?`<button class="tab pdp pdE${active==='paddy'?' on':''}" data-act="${pact}" aria-label="Paddy"><span>Paddy</span></button>`
  :FN?`<button class="tab pdf pdf${FN}${active==='paddy'?' on':''}" data-act="${pact}">${ic(FICO[FN],'i22')}<span>Paddy</span></button>`
  :`<button class="tab pdt${active==='paddy'?' on':''}" data-act="${active==='paddy'?'noop':(nbw?'go:8:onboarding':'go:8:chat')}" aria-label="Paddy"><em class="pdb" aria-hidden="true">${pdSvg(S.theme==='dark'?fk+'D':fk)}</em></button>`)
  :`<div class="tab${id===active?' on':''}">${ic(i,'i22')}<span>${esc(t(k))}</span></div>`).join('')}</nav>`}
const avCol=n=>'a'+(1+[...n].reduce((a,c)=>a+c.charCodeAt(0),0)%4);
const ini=n=>n.split(' ').map(w=>w[0]).join('').slice(0,2);
function wave(n=34,seed=3){let s='';for(let i=0;i<n;i++){const h=6+Math.abs(Math.sin(i*1.7+seed)*Math.cos(i*0.6))*24;s+=`<i style="height:${h.toFixed(0)}px"></i>`}return `<div class="wave" aria-hidden="true">${s}</div>`}

const lname=(o)=>({ca:{es:'catalán',ca:'català',en:'Catalan',ru:'каталанский',uk:'каталанська'},es:{es:'español',ca:'castellà',en:'Spanish',ru:'испанский',uk:'іспанська'}})[o][S.lang];
/* UI-1: в пузыре только перевод; оригинал — по касанию (S.orig[key]); глобальный переключатель «Оригинал» в шапке */
function msgText(key,orig,name,own){
 const L=S.lang;const txt=T[key][L];
 if(orig===L||own)return `<div class="tx">${esc(txt)}</div>`;
 const ot=T[key][orig];
 if(S.tr==='off')return `<div class="tx">${esc(ot)}</div><div class="ov origl">${esc(t('lbl_orig'))} · ${esc(lname(orig))}</div>`;
 if(S.orig[key])return `<div class="tx">${esc(txt)}</div><div class="orig"><div class="ov">${esc(t('lbl_orig'))} · ${esc(lname(orig))}</div><div class="tx it">${esc(ot)}</div></div>`;
 return `<div class="tx">${esc(txt)}</div>`;
}
function msgRow(name,body,wide,key){const c=avCol(name);return `<div class="mrow"><div class="avatar ${c}" aria-hidden="true">${ini(name)}</div><div class="bub${wide?' wide':''}"${key?` data-act="orig:${key}" role="button" tabindex="0"`:''}><div class="nm${disp(name)}">${esc(name)}</div>${body}</div></div>`}
function voiceMsg(){
 /* UI-5: звук оригинала + автоматически расшифровка с переводом на язык читателя; озвучки перевода нет */
 const L=S.lang;const vOrig=L==='ca'?'es':'ca';const ot=T.mv[vOrig];const tx=T.mv[L];
 const showO=S.orig.mv||S.tr==='off';
 const body=`<div class="vrow"><button class="vplay" data-act="noop" aria-label="${esc(t('a_play'))}">${ic('play','i22')}</button>${wave(26)}<span class="vtime">0:14</span></div>
 <div class="sep" data-act="orig:mv" role="button" tabindex="0"><div class="ov">${esc(t('lbl_ts'))} · ${esc(t('lbl_tr').toLowerCase())}</div><div class="tx">${esc(tx)}</div>${showO?`<div class="orig"><div class="ov">${esc(t('lbl_orig'))} · ${esc(lname(vOrig))}</div><div class="tx it">${esc(ot)}</div></div>`:''}</div>`;
 return msgRow('Carla Font',body,true);
}
function msgsHtml(c){
 let h='';
 h+=`<div style="align-self:center"><span class="tag" style="background:var(--surfaceSunk);color:var(--inkMuted)">${esc(t('today'))}</span></div>`;
 if(c.voiceIn){h+=voiceMsg()}
 else{
 h+=msgRow('Laia Ferrer',msgText('m0','ca'),false,'m0');
 h+=msgRow('Núria Vidal',msgText('m1','ca'),false,'m1');
 h+=msgRow('Pau Roca',msgText('m2','es'),false,'m2');
 }
 h+=`<div class="mrow own"><div class="bub"><div class="tx">${esc(T.m3[S.lang])}</div></div></div>`;
 for(const m of S.extra){h+=m.voice?`<div class="mrow own"><div class="bub" style="width:220px"><div class="vrow"><div class="vplay">${ic('play','i22')}</div>${wave(14,5)}<span class="vtime">0:07</span></div></div></div>`:`<div class="mrow own"><div class="bub"><div class="tx">${esc(m.text)}</div></div></div>`}
 return h}
function composer(c){
 const member=c.member!==false,plus=!!c.plus;
 const mode=c.mode;
 /* UI-4: нажал — запись, нажал ещё раз — остановить; затем прослушать и отправить */
 if(mode==='recording')return `<div class="comp"><div class="rec"><button class="circ sm2" data-act="rec-cancel" aria-label="${esc(t('a_del'))}">${ic('trash','i24')}</button><span class="dot" aria-hidden="true"></span><span class="tm">0:07</span><span class="sl">${esc(t('rec_stop'))}</span><button class="micbig" data-act="rec-stop" aria-label="${esc(t('a_stop'))}">${ic('square','i22')}</button></div></div>`;
 if(mode==='voiceReview')return `<div class="comp"><div class="rec rv"><button class="circ sm2" data-act="rec-cancel" aria-label="${esc(t('a_del'))}">${ic('trash','i24')}</button><button class="vplay" data-act="noop" aria-label="${esc(t('a_play'))}">${ic('play','i22')}</button>${wave(16,4)}<span class="vtime">0:07</span><button class="mic send" data-act="rv-send" aria-label="${esc(t('a_send'))}">${ic('arrow-up','i24')}</button></div></div>`;
 /* UI-6: текст диктовки появляется в самом поле ввода (с литературной обработкой, если включена) */
 if(mode==='dictation'){const txt=T.typed[LI[S.lang]];const part=txt.slice(0,Math.ceil(txt.length*0.62)).replace(/\s+\S*$/,'');
  return `<div class="comp"><div class="dstat"><span class="dot" aria-hidden="true"></span><b>${esc(t('dict_t'))}</b><span class="lit">${esc(t('dict_lit'))}</span></div><div class="crow"><div class="fld live">${esc(part)}<span class="caret"></span></div><button class="micbig" data-act="dict-done" aria-label="${esc(t('done'))}">${ic('check','i24')}</button></div></div>`}
 if(mode==='micDenied')return `<div class="comp errc"><div class="err">${ic('mic-off','i24')}<div><b>${esc(t('mic_t'))}</b><p>${esc(t('mic_b'))}</p></div></div><div class="arow"><button class="pill out" data-act="err-write">${ic('keyboard')}<span>${esc(t('write'))}</span></button><button class="pill inv" data-act="mic-settings">${ic('settings')}<span>${esc(t('mic_set'))}</span></button></div></div>`;
 if(mode==='dictErr')return `<div class="comp errc"><div class="err">${ic('circle-alert','i24')}<div><b>${esc(t('err_t'))}</b><p>${esc(t('err_b'))}</p></div></div><div class="arow"><button class="pill out" data-act="err-write">${ic('keyboard')}<span>${esc(t('write'))}</span></button><button class="pill inv" data-act="err-retry">${ic('rotate-ccw')}<span>${esc(t('retry'))}</span></button></div></div>`;
 const val=(mode==='typing')?(S.text||T.typed[LI[S.lang]]):S.text;
 const typed=mode==='typing'||(S.text&&mode!=='empty');
 const right=typed?`<button class="mic send" data-act="send" data-lp="send-lp" aria-label="${esc(t('send_text_a'))}">${ic('arrow-up','i24')}</button>`
  :`<button class="plus" data-act="dict" aria-label="${esc(t('a_dict'))}">${ic('speech','i24')}</button><button class="mic" data-act="mic" aria-label="${esc(t('a_mic'))}">${ic('mic','i24')}</button>`;
 const top=`<div class="crow"><button class="plus" data-act="attach" aria-label="${esc(t('a_attach'))}">${ic('plus','i24')}</button><textarea class="fld" rows="1" placeholder="${esc(t('ph'))}" aria-label="${esc(t('ph'))}">${esc(typed?val:'')}</textarea>${right}</div>`;
 const tip=c.tip?`<button class="tip" data-act="close-tip"><span>${ic('speech','i22')}<b>${esc(t('tip_1'))}</b></span><span>${ic('mic','i22')}<b>${esc(t('tip_2'))}</b></span></button>`:'';
 /* новичку подсказки про «Моим голосом» нет совсем */
 const hold=typed&&member?`<div class="holdh">${ic('audio-lines','i14')}<span>${esc(t('myv_hold'))}</span></div>`:'';
 return `<div class="comp">${tip}${top}${hold}</div>`}
function hintBox(c){
 if(c.hint!=='limit')return '';
 const member=c.member!==false;const d=dTomorrow();
 if(member)return `<div class="hint"><div class="h">${ic('triangle-alert')}<span>${esc(t('lim_t'))}</span></div><p>${esc(t('lim_b',{d}))}</p><div class="bt"><button class="pill inv" data-act="go6:limit">${esc(t('more_plus'))}</button><button class="pill out" data-act="go7:free:out">${esc(t('my_limits'))}</button></div></div>`;
 return `<div class="hint"><div class="h">${ic('lock')}<span>${esc(t('become_c'))}</span></div><p>${esc(t('lim_nb_b',{d}))}</p><div class="bt"><button class="pill out" data-act="how">${esc(t('how_member'))}</button><button class="pill out" data-act="go7:newbie:out">${esc(t('my_limits'))}</button></div></div>`}
function sheet3(c){
 const member=c.member!==false;
 if(c.mode==='attach'){
  const row=(i,k,cls,lock)=>`<button class="arowp${lock?' lock':''}" data-act="${lock?'lockedrow':'close-sheet'}" ${lock?'aria-disabled="true"':''}><span class="ic ${lock?'':cls}">${ic(i,'i22')}</span><span class="lb">${esc(t(k))}</span>${lock?ic('lock'):''}</button>`;
  return `<div class="scrim" data-act="close-sheet"></div><div class="sheet" role="dialog"><div class="grab"></div><div class="sh-h"><h2 class="${disp(t('att_t')).trim()}">${esc(t('att_t'))}</h2><button class="circ" data-act="close-sheet" aria-label="${esc(t('close'))}">${ic('x','i24')}</button></div>
  ${member?'':`<div class="lockn">${ic('lock')}<div>${esc(t('lock_note'))}<br><button class="pill out" data-act="how">${esc(t('how_member'))}</button></div></div>`}
  ${row('image','photo','t1',!member)}${row('video','video','t2',!member)}${row('file','file','t3',!member)}${row('contact','contact','t2',!member)}${row('map-pin','place','t1',false)}${row('sticker','stick','t2',false).replace('close-sheet','sheet:stickers')}${row('volleyball','inv_game','t3',!member)}</div>`}
 if(c.sheet==='stickers'){
  return `<div class="scrim" data-act="close-sheet"></div><div class="sheet" role="dialog"><div class="grab"></div><div class="sh-h"><h2 class="${disp(t('st_t')).trim()}">${esc(t('st_t'))}</h2><button class="circ" data-act="close-sheet" aria-label="${esc(t('close'))}">${ic('x','i24')}</button></div><div class="ov sech" style="margin-top:0">${esc(t('st_pack'))}</div><div class="stkgrid">${['hello','joy','think','oops','sport'].map(k=>`<button class="stkb" data-act="close-sheet" aria-label="${esc(t('st_aria'))} ${k}"><span class="pst" aria-hidden="true">${pdSvg(pdk(k))}</span></button>`).join('')}</div></div>`}
 if(c.sheet==='myv'){
  return `<div class="scrim" data-act="close-sheet"></div><div class="sheet" role="dialog"><div class="grab"></div><div class="sh-h"><h2 class="${disp(t('myv_full')).trim()}">${esc(t('myv_full'))}</h2><button class="circ" data-act="close-sheet" aria-label="${esc(t('close'))}">${ic('x','i24')}</button></div>\n  <p class="sbody">${esc(t('myv_sh_b'))}</p><div class="arow" style="flex-direction:column"><button class="pill pri cta" data-act="myv-go">${ic('audio-lines')}<span>${esc(t('myv_go'))}</span></button><button class="pill out" data-act="send">${esc(t('send_text_a'))}</button></div></div>`}
 if(c.sheet==='club'){
  return `<div class="scrim" data-act="close-sheet"></div><div class="sheet" role="dialog"><div class="grab"></div><div class="sh-h"><h2 class="${disp(t('become')).trim()}">${esc(t('become'))}</h2><button class="circ" data-act="close-sheet" aria-label="${esc(t('close'))}">${ic('x','i24')}</button></div>
  <p class="sbody">${esc(t('nb_body',{v:t('myv_full')}))}</p><button class="pill out" style="width:100%" data-act="how">${esc(t('how_member'))}</button></div>`}
 return ''}
function screen3(){
 const base=ST3[S.s3];const c={...base};
 const st=S.s3;
 if(S.sheetOverride)c.sheet=S.sheetOverride;
 const trMode=S.tr==='off'||c.tr==='off'?'off':'on';
 const saved=S.tr;S.tr=trMode;
 const subn=({es:'1.248',ca:'1.248',en:'1,248',ru:'1\u00A0248',uk:'1\u00A0248'})[S.lang];
 const html=`${status()}
 ${chatHdr('Baix Empordà',esc(t('chat_sub',{n:subn})),`<button class="circ" aria-label="${esc(t('back'))}">${ic('chevron-left','i24')}</button>`)}
 <div class="msgs">${msgsHtml(c)}</div>
 ${hintBox(c)}${composer(c)}${tabbar('chats')}${sheet3(c)}`;
 S.tr=saved;return html}

/* №6 */
function screen6(){
 const src=S.s6;const plan=S.s6plan;const d=dTomorrow();
 const hero={voice:['p6_voice_t','p6_voice_b'],limit:['p6_lim_t','p6_lim_b'],travel:['p6_trv_t','p6_trv_b'],club:['p6_club_t','p6_club_b']}[src];
 const title=t(hero[0]);
 let heroH=`<div class="hero"><span class="badge">${ic('star','i14')}Padelada Plus</span><h2 class="${disp(title).trim()}">${esc(title)}</h2><p>${esc(t(hero[1],{d}))}</p>${src==='voice'?`<div class="req">${ic('info')}<span>${esc(t('p6_voice_r'))}</span></div>`:''}</div>`;
 let body='';let bot='';let hdrR='';
 if(src==='club'){
  body=`<div class="card" style="margin-top:16px"><div class="csh">${ic('users')}<span>${esc(t('become'))}</span></div>${clubSteps()}</div>`;
  bot=`<div class="bot"><button class="pill grey" data-act="back">${esc(t('close'))}</button></div>`;
 }else{
  const P=plan==='plus'?{v:30,d:40,p:20,md:3,mc:6000}:{v:60,d:100,p:50,md:5,mc:30000};
  const row=(l,u,f,pv,sub)=>`<div class="rw"><div class="c1"><b>${esc(t(l))}</b>${u===l?'':`<small>${esc(t(u))}</small>`}</div><div class="c2">${f}</div><div class="c3">${pv}${sub?`<small>${sub}</small>`:''}</div></div>`;
  body=`<div class="seg" role="tablist"><button class="${plan==='plus'?'on':''}" data-act="plan:plus">Plus</button><button class="${plan==='max'?'on':''}" data-act="plan:max">Max</button></div>
  <div class="card"><div class="tb-h"><span class="c1"></span><span class="c2">Free</span><span class="c3">${plan==='plus'?'Plus':'Max'}</span></div>
  ${row('r_dict','u_day',10,P.d)}${row('r_paddy','u_msg',5,P.p)}
  ${row('r_myv','u_day','—',P.md,esc(nf(P.mc)+' '+t('u_chr_s')))}
  </div>
  <div class="foot"><span class="ph">${ic('info','i14')}${esc(t('price_ph'))}</span><span class="phl">${esc(t('legal_ph'))}</span></div>`;
  hdrR=`<button class="trpill" aria-label="${esc(t('see_limits'))}" data-act="go7:free:${src==='limit'?'out':'far'}">${ic('audio-waveform')}<span>${esc(t('see_limits'))}</span></button>`;
  bot=`<div class="bot"><button class="pill pri cta">${esc(t(plan==='plus'?'cta_plus':'cta_max'))}</button></div>`;
 }
 return `${status()}<div class="hdr"><button class="circ" data-act="back" aria-label="${esc(t('close'))}">${ic('x','i24')}</button><div class="ttl"></div>${hdrR}</div><div class="scr">${heroH}${body}</div>${bot}`}

/* №7 */
function trk(u,tot){const left=tot-u;const st=stat(u,tot);const pct=Math.max(0,Math.min(100,left/tot*100));
 return `<div class="trk ${st==='ok'?'':st}" role="progressbar" aria-valuemin="0" aria-valuemax="${tot}" aria-valuenow="${left}"><i style="width:${pct}%"></i></div>`}
function bar(u,tot,date,unit){/* полоса = остаток; unit задан только для карточек с двумя полосами */
 const st=stat(u,tot);const left=tot-u;
 const cnt=esc(t('left',{u:nf(left),t:nf(tot)}))+(unit?' '+esc(unit):'');
 if(unit)return `<div class="bar stk"><b>${cnt}</b>${trk(u,tot)}<div class="rs ${st==='out'?'out':''}">${ic('clock','i14')}<span>${esc(t('reset',{d:date}))}</span></div></div>`;
 return `<div class="bar"><div class="bl"><b>${cnt}</b><span class="rs ${st==='out'?'out':''}">${esc(t('reset',{d:date}))}</span></div>${trk(u,tot)}</div>`}
function stChip(st){const m={ok:['check','st_ok'],low:['triangle-alert','st_low'],out:['circle-x','st_out']}[st];return `<span class="st ${st}">${ic(m[0],'i14')}${esc(t(m[1]))}</span>`}
function lcard(icn,tint,title,sub,bars){/* bars: [u,tot,date,unit?] */
 const sts=bars.map(b=>stat(b[0],b[1]));const worst=sts.includes('out')?'out':sts.includes('low')?'low':'ok';
 return `<div class="lc"><div class="t"><span class="ic ${tint}">${ic(icn,'i22')}</span><div class="tt"><b>${esc(title)}</b><small>${esc(sub)}</small></div>${stChip(worst)}</div>${bars.map(b=>bar(b[0],b[1],b[2],b[3])).join('')}</div>`}
function screen7(){
 const {plan,level}=S.s7;const L=LIM[plan][level];const dd=dTomorrow(),dm=dMonth();
 const nb=plan==='newbie';const planName=plan==='newbie'?'Free':plan==='free'?'Free':plan==='plus'?'Plus':'Max';
 let h=`<div class="lim">`;
 h+=lcard('audio-waveform','t2',t('r_dict'),t('u_day'),[[L.d[0],L.d[1],dd]]);
 h+=lcard('bot','t3',t('r_paddy'),t('u_msg'),[[L.p[0],L.p[1],dd]]);
 if(nb){/* новичку «Моим голосом» не показываем */}else if(plan==='free'){
  h+=`<div class="lc"><div class="t"><span class="ic t1">${ic('audio-lines','i22')}</span><div class="tt"><b>${esc(t('r_myv'))}</b><small>${esc(nb?t('myv_na_nb'):t('myv_na_free'))}</small></div><span class="st out" style="color:var(--inkMuted)">${ic('lock','i14')}</span></div></div>`;
 }else{
  h+=lcard('audio-lines','t1',t('r_myv'),t('u_day')+' · '+t('u_chr'),[[L.md[0],L.md[1],dd,t('u_day')],[L.mc[0],L.mc[1],dm,t('u_chr')]]);
 }
 h+=`<div class="rs fn">${ic('info','i14')}<span>${esc(t('paddy_note'))}</span></div></div>`;
 let bot='';
 if(nb)h+=`<div class="dash" style="margin-top:12px"><b>${ic('users')}<span>${esc(t('become'))}</span></b><p>${esc(t('nb_banner_b'))}</p><button class="pill out" style="margin-top:10px" data-act="how">${esc(t('how_member'))}</button></div>`;
 else if(plan==='free')bot=`<div class="bot"><button class="pill pri cta" data-act="go6:${level==='out'?'limit':'limit'}">${esc(t('more_plus'))}</button></div>`;
 else if(plan==='plus')bot=`<div class="bot"><button class="pill inv cta" data-act="go6max">${esc(t('to_max'))}</button></div>`;
 return `${status()}<div class="hdr"><button class="circ" data-act="back" aria-label="${esc(t('back'))}">${ic('chevron-left','i24')}</button><div class="ttl"><h1 class="${disp(t('p7_t')).trim()}">${esc(t('p7_t'))}</h1><p>${esc(t('p7_s'))}</p></div><span class="tag plan">${esc(t('your_plan'))}: ${planName}</span></div><div class="scr">${h}</div>${bot}${bot?'':'<div style="height:'+(nb?0:0)+'px"></div>'}${tabbar('profile')}`}

function panelHtml(){
 const chip=(on,act,l)=>`<button class="chip${on?' on':''}" data-act="${act}">${l}</button>`;
 let st='';
 if(WST[S.screen])st=WST[S.screen].map(([k,l])=>chip(S.wst===k,'wst:'+k,l)).join('');
 if(S.screen==='3')st=Object.keys(ST3).map(k=>chip(S.s3===k,'st3:'+k,LBL3[k])).join('');
 if(S.screen==='6')st=Object.keys(ST6).map(k=>chip(S.s6===k,'st6:'+k,ST6[k])).join('')+'</div></div><div class="grp"><div class="lab">План</div><div class="chips">'+['plus','max'].map(k=>chip(S.s6plan===k,'plan:'+k,k==='plus'?'Plus':'Max')).join('');
 if(S.screen==='7')st=Object.keys(ST7.plan).map(k=>chip(S.s7.plan===k,'pl7:'+k,ST7.plan[k])).join('')+'</div></div><div class="grp"><div class="lab">Уровень</div><div class="chips">'+Object.keys(ST7.level).map(k=>chip(S.s7.level===k,'lv7:'+k,ST7.level[k])).join('');
 return `<h3>Padelada 2.0 · Главная и ошибки загрузки</h3><p class="sub">Макет home-error-v1: главная (норма, ошибка загрузки, нет сети), экран Paddy без сети и спецификация единой кнопки «Повторить». Тапы по «Повторить» работают: загрузка → главная.</p>
 <div class="grp" style="margin-top:0"><div class="lab">Экран</div><div class="chips">${SCRL.map(([id,l])=>chip(S.screen===id,'scr:'+id,l)).join('')}</div></div>
 <div class="grp"><div class="lab">Состояние</div><div class="chips">${st}</div></div>
 ${S.screen==='30'?`<div class="grp"><div class="lab">Таб-бар</div><div class="chips">${chip(S.tabs!=='glass','tbs:round','Круг mango')}${chip(S.tabs==='glass','tbs:glass','Стекло')}</div></div>`:''}
 <div class="grp"><div class="lab">Тема</div><div class="chips">${chip(S.theme==='light','th:light','Светлая')}${chip(S.theme==='dark','th:dark','Тёмная')}</div></div>
 <div class="grp"><div class="lab">Язык</div><div class="chips">${LANGS.map(l=>chip(S.lang===l,'lg:'+l,l)).join('')}</div></div>
 `}

const SCR={'3':()=>screen3(),'6':()=>screen6(),'7':()=>screen7()};
const WST={};/* состояния экранов волны B: WST[id]=[[state,подпись],…] */
const SCRL=[['3','№3 Поле ввода'],['6','№6 Plus (вариант)'],['7','№7 Лимиты (вариант)']];
function render(){
 document.documentElement.lang=S.lang;
 document.body.classList.toggle('dark',S.theme==='dark');
 const scr=(SCR[S.screen]||screen3)();
 const app=document.getElementById('app');
 const keepScroll=app.querySelector('.scr')?.scrollTop||0;
 app.innerHTML=scr+(S.how?howSheet():'')+(S.toast?`<div class="toast" role="status">${esc(S.toast)}</div>`:'')+'<div class="home"></div>';
 const sc=app.querySelector('.scr');if(sc)sc.scrollTop=keepScroll;
 const mg=app.querySelector('.msgs');if(mg){const top=()=>mg.firstElementChild&&mg.firstElementChild.getBoundingClientRect().top<mg.getBoundingClientRect().top-1;while(mg.children.length>1&&top())mg.removeChild(mg.firstElementChild);if(mg.firstElementChild&&mg.firstElementChild.querySelector('.tag')&&mg.children.length>1&&mg.firstElementChild.nextElementSibling&&false){}}
 app.querySelectorAll('.fld').forEach(f=>{f.style.height='auto';f.style.height=Math.min(f.scrollHeight,110)+'px'});
 document.getElementById('panel').innerHTML=panelHtml();
 window.__ready=true;
}
function toast2(k){S.toast=t(k);render();clearTimeout(S._tt);S._tt=setTimeout(()=>{S.toast=null;render()},1800)}
function toast(){S.toast=t('toast_soon');render();clearTimeout(S._tt);S._tt=setTimeout(()=>{S.toast=null;render()},1800)}
function push(){S.stack.push({wst:S.wst,screen:S.screen,s3:S.s3,s6:S.s6,s6plan:S.s6plan,s7:{...S.s7},text:S.text})}
function setS3(k){S.s3=k;S.sheetOverride=null;const c=ST3[k];S.text=c.mode==='typing'?T.typed[LI[S.lang]]:''}
function act(a){
 const [k,...p]=a.split(':');if(k!=='how')S.how=false;
 switch(k){
 case 'panel':document.body.classList.toggle('panel-open');return;
 case 'scr':S.screen=p[0];if(WST[p[0]])S.wst=WST[p[0]][0][0];break;
 case 'st3':S.screen='3';setS3(p[0]);break;
 case 'st6':S.screen='6';S.s6=p[0];break;
 case 'plan':S.s6plan=p[0];break;
 case 'pl7':S.s7.plan=p[0];break;
 case 'lv7':S.s7.level=p[0];break;
 case 'th':S.theme=p[0];break;
 case 'lg':S.lang=p[0];if(ST3[S.s3].mode==='typing')S.text=T.typed[LI[S.lang]];break;
 case 'tr':S.tr=S.tr==='on'?'off':'on';if(ST3[S.s3].tr==='off'){S.s3='empty'}break;
 case 'attach':setS3('attach');break;
 case 'close-sheet':setS3(ST3[S.s3].member===false?'newbie':(ST3[S.s3].plus?'typing-plus':(S.text?'typing':'empty')));if(!S.text&&ST3[S.s3].mode==='typing')S.text=T.typed[LI[S.lang]];break;
 case 'sheet':S.sheetOverride=p[0];break;
 case 'lockedrow':setS3('newbie-sheet');break;
 case 'mic':setS3('recording');break;
 case 'rec-stop':setS3('voice-review');break;
 case 'rec-cancel':setS3(ST3[S.s3].member===false?'newbie':'empty');break;
 case 'rv-send':S.extra.push({voice:true});setS3('empty');break;
 case 'dict':setS3('dictation');break;
 case 'orig':S.orig[p[0]]=!S.orig[p[0]];break;
 case 'send-lp':{const c=ST3[S.s3];if(c.member===false)return;if(c.plus){setS3('myv-sheet')}else{push();S.screen='6';S.s6='voice';S.s6plan='plus'}break}
 case 'myv-go':S.extra.push({voice:true});setS3('empty');break;
 case 'dict-done':{const c=ST3[S.s3];setS3(c.member===false?'newbie':(c.plus?'typing-plus':'typing'));break}
 case 'dict-cancel':setS3('empty');break;
 case 'err-retry':setS3('dictation');break;
 case 'err-write':setS3('empty');break;
 case 'send':{S.extra.push({text:S.text||T.typed[LI[S.lang]]});setS3(ST3[S.s3].member===false?'newbie':'empty');S.text='';S.s3=ST3[S.s3].member===false?'newbie':'empty';S.text='';break}
 case 'myv':{const c=ST3[S.s3];if(c.member===false){S.sheetOverride='club'}else if(c.plus){toast();return}else{push();S.screen='6';S.s6='voice';S.s6plan='plus'}break}
 case 'go6':push();S.screen='6';S.s6=p[0];S.s6plan='plus';break;
 case 'go6max':push();S.screen='6';S.s6='limit';S.s6plan='max';break;
 case 'go7':push();S.screen='7';S.s7={plan:p[0],level:p[1]};break;
 case 'back':{const s=S.stack.pop();if(s){Object.assign(S,s)}else{S.screen=WST[S.screen]?'1':'3';if(WST[S.screen])S.wst=WST[S.screen][0][0]}break}
 default:if(typeof waveAct==='function'&&waveAct(k,p))break;
 case 'how':S.how=true;break;
 case 'mic-settings':toast2('toast_set');return;
 case 'close-tip':setS3('empty');break;
 case 'close-how':S.how=false;if(S.screen==='20'&&S.wst==='how')S.wst='overview';break;
 }
 render();
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(b){act(b.dataset.act)}});
document.addEventListener('input',e=>{
 if(!e.target.classList.contains('fld'))return;
 S.text=e.target.value;
 const was=ST3[S.s3];const nowTyped=!!S.text;
 const wasTyped=was.mode==='typing';
 if(nowTyped!==wasTyped&&!was.sheet){S.s3=nowTyped?(was.member===false?'newbie':(was.plus?'typing-plus':'typing')):(was.member===false?'newbie':'empty');if(!nowTyped)S.text='';render();const f=document.querySelector('.fld');if(f){f.focus();f.setSelectionRange(f.value.length,f.value.length)}}
 e.target.style.height='auto';e.target.style.height=e.target.scrollHeight+'px';
});
// долгое нажатие (UI-7/UI-9): элемент с data-lp — «Отправить» (голос) и пузыри сообщений (меню + реакции); контекстное меню мыши делает то же
let holdT=null,holdOn=false;
document.addEventListener('pointerdown',e=>{const m=e.target.closest('[data-lp]');if(!m)return;holdOn=false;clearTimeout(holdT);holdT=setTimeout(()=>{holdOn=true;act(m.dataset.lp)},450)});
document.addEventListener('pointerup',()=>{clearTimeout(holdT)});
document.addEventListener('pointercancel',()=>{clearTimeout(holdT)});
document.addEventListener('contextmenu',e=>{const m=e.target.closest('[data-lp]');if(m){e.preventDefault();act(m.dataset.lp)}});
document.addEventListener('click',e=>{if(holdOn){holdOn=false;if(e.target.closest('[data-lp]')){e.stopImmediatePropagation();e.preventDefault()}}},true);

function fit(){
 const mobile=!BARE&&matchMedia('(max-width:480px)').matches;
 document.body.classList.toggle('mobile',mobile);document.body.classList.toggle('bare',BARE);
}
addEventListener('resize',fit);
/*@@PADDY@@*/
/*@@WAVEB@@*/
/*@@HOME@@*/
// публичный API для скрипта съёмки
window.setView=(o)=>{
 if(o.lang)S.lang=o.lang;if(o.theme)S.theme=o.theme;if(o.screen)S.screen=o.screen;S.stack=[];S.extra=[];S.tr='on';S.sheetOverride=null;S.how=false;S.rxMine=undefined;S.rxSticker=(o.state==='sticker-rx')?'joy':undefined;if(o.state==='sticker-rx')S.rxMine=null;S.orig={};S.lit=undefined;
 if(o.screen==='3'&&o.state)setS3(o.state);
 if(o.screen==='6'){S.s6=o.state||'voice';S.s6plan=o.plan||'plus'}
 if(WST[o.screen])S.wst=o.state||WST[o.screen][0][0];
 if(typeof onSetView==='function')onSetView(o);
 if(o.screen==='7'){const [pl,lv]=(o.state||'free-far').split('-');S.s7={plan:pl,level:lv}}
 render();
};
// стартовые параметры: ?s=3&st=typing&lang=ru&theme=dark&bare=1
(function init(){
 fit();
 const lg=q.get('lang');const nav=(navigator.language||'es').slice(0,2);
 S.lang=LANGS.includes(lg)?lg:(LANGS.includes(nav)?nav:'ru');
 S.theme=q.get('theme')==='dark'?'dark':'light';
 const sc=q.get('s')||'60';
 window.setView({screen:sc||'3',state:q.get('st')||(WST[sc]?WST[sc][0][0]:sc==='7'?'free-far':sc==='6'?'voice':'empty'),variant:q.get('v')||undefined,plan:q.get('plan')||undefined,lang:S.lang,theme:S.theme});
 if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{window.__fonts=true});
})();
