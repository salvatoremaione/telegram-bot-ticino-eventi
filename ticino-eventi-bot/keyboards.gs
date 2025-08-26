/************************************************************
 * Inline Keyboard Builders
 ************************************************************/
function languageKeyboard(){ return makeInlineKeyboard([[{text:"English",callback_data:"/EN"}],[{text:"Italiano",callback_data:"/IT"}]]);}
function startKeyboard(){ return makeInlineKeyboard([[{text:"Language / Lingua",callback_data:"/lang"}]]); }

function chooseDateKeyboard(lang) {
  const T=TEXTS[lang], t=todayDate(), rows=[
    [{text:T.today, callback_data:`/${lang}_${t.getFullYear()}_${pad2(t.getMonth()+1)}_${pad2(t.getDate())}`}],
    [{text:T.tomorrow, callback_data:`/${lang}_${tomorrowDate().getFullYear()}_${pad2(tomorrowDate().getMonth()+1)}_${pad2(tomorrowDate().getDate())}`}]
  ];
  const sat=nextSaturday(t), sun=nextSunday(t);
  if (t.getDay() <= 5) rows.push([{text:T.saturday, callback_data:`/${lang}_${sat.getFullYear()}_${pad2(sat.getMonth()+1)}_${pad2(sat.getDate())}`}]);
  if (t.getDay() <= 6) rows.push([{text:T.sunday, callback_data:`/${lang}_${sun.getFullYear()}_${pad2(sun.getMonth()+1)}_${pad2(sun.getDate())}`}]);
  rows.push([{text:T.anotherDate, callback_data:`/${lang}_OTH`}]);
  rows.push([{text:T.back, callback_data:"/lang"}]);
  return makeInlineKeyboard(rows);
}

function yearKeyboard(lang, index) {
  const years = Object.keys(index).map(y => Number(y)).sort((a,b)=>a-b);
  const rows = years.map(y => [{text:String(y), callback_data:`/${lang}_${y}`}]);
  rows.push([{text:TEXTS[lang].back, callback_data:`/${lang}`}]);
  return makeInlineKeyboard(rows);
}

function monthKeyboard(lang, year, index) {
  const months = Object.keys(index[year] || {}).map(m => Number(m)).sort((a,b)=>a-b);
  const rows = months.map(m => [{text:MONTHS[lang][m-1], callback_data:`/${lang}_${year}_${pad2(m)}`}]);
  rows.push([{text:TEXTS[lang].back, callback_data:`/${lang}_OTH`}]);
  return makeInlineKeyboard(rows);
}

function dayKeyboard(lang, year, month, index) {
  const days = Object.keys(((index[year]||{})[month]||{})).map(d=>Number(d)).sort((a,b)=>a-b);
  const rows = days.map(d => [{text:pad2(d), callback_data:`/${lang}_${year}_${pad2(month)}_${pad2(d)}`}]);
  rows.push([{text:TEXTS[lang].back, callback_data:`/${lang}_${year}`}]);
  return makeInlineKeyboard(rows);
}

function eventsKeyboardOrNav(lang, year, month, day, events) {
  if (!events || events.length === 0) {
    const rows = [
      [{ text: TEXTS[lang].changeDay, callback_data: `/${lang}_${year}_${pad2(month)}` }],
      [{ text: TEXTS[lang].changeMonth, callback_data: `/${lang}_${year}` }],
      [{ text: TEXTS[lang].changeYear, callback_data: `/${lang}_OTH` }]
    ];
    return { keyboard: makeInlineKeyboard(rows), noEvents: true };
  }
  const rows = events.map(e => [{ text: e.title, url: lang === "EN" ? e.link_en : e.link_it }]);
  return { keyboard: makeInlineKeyboard(rows), noEvents: false };
}
