/************************************************************
 * Utilities: Dates, Links, Messaging
 ************************************************************/
const DEFAULT_LINK_EN = "https://www.ticino.ch/en/";
const DEFAULT_LINK_IT = "https://www.ticino.ch/it/";

const pad2 = n => (n < 10 ? `0${n}` : String(n));
function todayDate() { const d=new Date(); d.setHours(0,0,0,0); return d; }
function tomorrowDate() { const d=todayDate(); d.setDate(d.getDate()+1); return d; }
function nextSaturday(from=todayDate()){ const d=new Date(from); const diff=(6-d.getDay()+7)%7; d.setDate(d.getDate()+diff); return d;}
function nextSunday(from=todayDate()){ const d=new Date(from); const diff=(7-d.getDay())%7; d.setDate(d.getDate()+diff); return d;}
function ymd(date){ return { y:date.getFullYear(), m:date.getMonth()+1, d:date.getDate() }; }

function extractLinksFromDescription(desc) {
  if (!desc) return { en: DEFAULT_LINK_EN, it: DEFAULT_LINK_IT };
  let match = desc.match(/https?:\/\/[^\s<]+/);
  if (!match) return { en: DEFAULT_LINK_EN, it: DEFAULT_LINK_IT };
  let url = match[0];
  return {
    en: url,
    it: url.includes("/en/") ? url.replace("/en/","/it/") : url
  };
}

function makeInlineKeyboard(rows) {
  return { inline_keyboard: rows.map(r => r.map(btn => {
    const o={text:String(btn.text)};
    if(btn.callback_data) o.callback_data=String(btn.callback_data);
    if(btn.url) o.url=String(btn.url);
    return o;
  }))};
}

function sendText(chatId, text, keyboard) {
  const payload={ method:"sendMessage", chat_id:String(chatId), text, parse_mode:"HTML" };
  if (keyboard) payload.reply_markup = JSON.stringify(keyboard);
  UrlFetchApp.fetch(`${CONFIG.TELEGRAM_URL}/`, { method:"post", payload });
}
