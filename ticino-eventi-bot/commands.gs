/************************************************************
 * Commands Implementation
 ************************************************************/
function cmdStart(userName, chatId) {
  const en = `Welcome ${userName} to the <b>${TEXTS.EN.botName}</b>.\n${TEXTS.EN.startInstruction}`;
  const it = `<i>${TEXTS.IT.welcome}</i> ${userName} <i>all'interno del <b>${TEXTS.IT.botName}</b>.\n${TEXTS.IT.startInstruction}</i>`;
  sendText(chatId, `${en}\n \n${it}`, startKeyboard());
}

function cmdCredits(userName, chatId) {
  const answerEn = `Dear ${userName}, you can contact the creator of this bot clicking here: @SalM_CH`;
  const answerIt = `<i>Caro/a</i> ${userName} <i>puoi contattare il creatore di questo bot cliccando qui:</i> @SalM_CH`;
  sendText(chatId, `${answerEn}\n \n${answerIt}`, makeInlineKeyboard([[{ text: "<< Back / Indietro", callback_data: "/start" }]]));
}

function cmdLang(chatId) {
  const answer = `${TEXTS.EN.chooseLang}\n<i>${TEXTS.IT.chooseLang}</i>`;
  sendText(chatId, answer, languageKeyboard());
}

function cmdChooseDate(chatId, lang) {
  sendText(chatId, TEXTS[lang].chooseDate, chooseDateKeyboard(lang));
}

function cmdYear(chatId, lang) {
  const index = getEventsIndex();
  sendText(chatId, TEXTS[lang].selectYear, yearKeyboard(lang, index));
}

function cmdMonth(chatId, lang, year) {
  const index = getEventsIndex();
  if (!index[year]) return cmdYear(chatId, lang);
  sendText(chatId, TEXTS[lang].selectMonth, monthKeyboard(lang, year, index));
}

function cmdDay(chatId, lang, year, month) {
  const index = getEventsIndex();
  if (!index[year] || !index[year][month]) return cmdMonth(chatId, lang, year);
  sendText(chatId, TEXTS[lang].selectDay, dayKeyboard(lang, year, month, index));
}

function cmdEvents(chatId, lang, year, month, day) {
  const index = getEventsIndex();
  const events = (((index[year] || {})[month] || {})[day]) || [];
  const { keyboard, noEvents } = eventsKeyboardOrNav(lang, year, month, day, events);
  const text = noEvents ? TEXTS[lang].noEvents : TEXTS[lang].selectEvent;
  sendText(chatId, text, keyboard);
}

// Quick EN-only versions
function cmdToday(chatId) {
  const t = todayDate();
  cmdEvents(chatId, "EN", t.getFullYear(), t.getMonth() + 1, t.getDate());
}
function cmdTomorrow(chatId) {
  const tm = tomorrowDate();
  cmdEvents(chatId, "EN", tm.getFullYear(), tm.getMonth() + 1, tm.getDate());
}
