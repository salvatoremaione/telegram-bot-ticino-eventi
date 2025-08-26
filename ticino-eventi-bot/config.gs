/************************************************************
 * Configuration & Secrets Loader
 ************************************************************/
const CONFIG = {
  TELEGRAM_TOKEN: PropertiesService.getScriptProperties().getProperty('TELEGRAM_TOKEN'),
  WEBAPP_URL: PropertiesService.getScriptProperties().getProperty('WEBAPP_URL'),
  CALENDAR_ID: PropertiesService.getScriptProperties().getProperty('CALENDAR_ID'),
  TELEGRAM_URL: null,
  CACHE_TTL_SECONDS: 300,
  END_DATE: new Date(2030, 11, 31, 23, 59, 59)
};

(function initConfig() {
  if (!CONFIG.TELEGRAM_TOKEN) throw new Error('Missing TELEGRAM_TOKEN in Script Properties');
  CONFIG.TELEGRAM_URL = `https://api.telegram.org/bot${CONFIG.TELEGRAM_TOKEN}`;
})();
