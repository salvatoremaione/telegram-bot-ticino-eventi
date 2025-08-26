/************************************************************
 * Telegram API Hooks
 ************************************************************/
function getMe() {
  Logger.log(UrlFetchApp.fetch(`${CONFIG.TELEGRAM_URL}/getMe`).getContentText());
}

function getUpdates() {
  Logger.log(UrlFetchApp.fetch(`${CONFIG.TELEGRAM_URL}/getUpdates`).getContentText());
}

function setWebhook() {
  Logger.log(UrlFetchApp.fetch(`${CONFIG.TELEGRAM_URL}/setWebhook?url=${encodeURIComponent(CONFIG.WEBAPP_URL)}`).getContentText());
}

function doGet(e) {
  return HtmlService.createHtmlOutput("Send POST requests to this endpoint.");
}

function doPost(e) {
  try {
    const contents = JSON.parse(e.postData.contents);
    let name, chatId, input;

    if (contents.callback_query) {
      name = contents.callback_query.from.first_name || "there";
      chatId = contents.callback_query.from.id;
      input = contents.callback_query.data;
    } else if (contents.message) {
      name = contents.message.from.first_name || "there";
      chatId = contents.message.from.id;
      input = contents.message.text || "";
    } else {
      return;
    }

    getEventsIndex(); // warm cache
    handleTextOrData(name, chatId, input);

  } catch (err) {
    Logger.log(err);
    try {
      const fallbackChatId = JSON.parse(e.postData.contents)?.message?.from?.id 
        || JSON.parse(e.postData.contents)?.callback_query?.from?.id;
      if (fallbackChatId) sendText(fallbackChatId, "Oops, something went wrong. Try /start again.");
    } catch (_e) {}
  }
}
