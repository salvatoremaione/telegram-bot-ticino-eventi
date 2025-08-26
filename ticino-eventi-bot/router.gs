/************************************************************
 * Command & Callback Data Router
 ************************************************************/
function handleTextOrData(name, chatId, textOrData) {
  const input = String(textOrData).trim();

  if (input.startsWith("/start")) return cmdStart(name, chatId);
  if (input.startsWith("/credits")) return cmdCredits(name, chatId);
  if (input.startsWith("/today")) return cmdToday(chatId);
  if (input.startsWith("/tomorrow")) return cmdTomorrow(chatId);
  if (input.startsWith("/lang")) return cmdLang(chatId);

  let m;
  if ((m = input.match(/^\/(EN|IT)$/))) return cmdChooseDate(chatId, m[1]);
  if ((m = input.match(/^\/(EN|IT)_(OTH|NOE)$/))) return cmdYear(chatId, m[1]);
  if ((m = input.match(/^\/(EN|IT)_(\d{4})$/))) return cmdMonth(chatId, m[1], Number(m[2]));
  if ((m = input.match(/^\/(EN|IT)_(\d{4})_(\d{2})$/))) return cmdDay(chatId, m[1], Number(m[2]), Number(m[3]));
  if ((m = input.match(/^\/(EN|IT)_(\d{4})_(\d{2})_(\d{2})$/))) return cmdEvents(chatId, m[1], Number(m[2]), Number(m[3]), Number(m[4]));

  sendText(chatId, TEXTS.EN.invalid);
}
