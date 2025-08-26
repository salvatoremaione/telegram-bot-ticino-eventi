/************************************************************
 * Event Fetching & Caching from Google Calendar
 ************************************************************/
function getEventsIndex() {
  const cache=CacheService.getScriptCache();
  const cached=cache.get("events_index");
  if(cached) try { return JSON.parse(cached); } catch(e){}
  const index=buildEventsIndex();
  cache.put("events_index", JSON.stringify(index), CONFIG.CACHE_TTL_SECONDS);
  return index;
}

function buildEventsIndex() {
  const index={}, start=todayDate(), cal=CalendarApp.getCalendarById(CONFIG.CALENDAR_ID);
  const events=cal.getEvents(start, CONFIG.END_DATE);
  for (const ev of events) {
    const {en:link_en, it:link_it} = extractLinksFromDescription(ev.getDescription()||"");
    const evStart=new Date(ev.getStartTime()), evEnd=new Date(ev.getEndTime());
    evStart.setHours(0,0,0,0); evEnd.setHours(0,0,0,0);
    const cur=new Date(evStart);
    while(cur<=evEnd) {
      if(cur>=start) {
        const {y,m,d} = ymd(cur);
        index[y] ??= {}; index[y][m] ??= {}; index[y][m][d] ??= [];
        if (!index[y][m][d].some(e=>e.title===ev.getTitle())) {
          index[y][m][d].push({ title: ev.getTitle(), link_en, link_it });
        }
      }
      cur.setDate(cur.getDate()+1);
    }
  }
  return index;
}
