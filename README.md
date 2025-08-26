# Ticino Eventi Telegram Bot (Google Apps Script)

A multilingual Telegram bot (English & Italian) for browsing upcoming events from a Google Calendar, optimised for speed, clarity, and scalability.

---

## ✨ Features

- **Google Calendar integration** — Events pulled directly from your chosen calendar
- **Multi‑language support** — EN + IT with clean i18n system
- **Inline keyboards** — Fast, intuitive Telegram navigation
- **Caching** — 5‑minute cache of event index to reduce API calls
- **Modular codebase** — Split into logical `.gs` files for maintainability
- **Secrets‑safe** — All tokens and IDs loaded from Script Properties (never in code)

---

## 📂 Project Structure

| File           | Purpose |
|----------------|---------|
| `config.gs`    | Loads configuration and Script Properties (tokens, URLs, IDs) |
| `i18n.gs`      | Month names and text strings in EN & IT |
| `utils.gs`     | Date helpers, link parsing, keyboard/message senders |
| `events.gs`    | Calendar API fetching and caching logic |
| `keyboards.gs` | Inline keyboard builder functions |
| `commands.gs`  | Bot commands: `/start`, `/lang`, event browsing, etc. |
| `router.gs`    | Routes Telegram updates to correct command |
| `telegram.gs`  | Webhook handling, `doPost`, and Telegram API helpers |

---

## 🛠 Setup

### 1. Create your Telegram Bot
- Message [@BotFather](https://t.me/BotFather)
- `/newbot` → follow prompts → note down your **Bot Token**

### 2. Prepare Google Calendar
- Use an existing calendar or create a new one for events
- In Calendar settings, copy the **Calendar ID**

### 3. Create Apps Script project
- Go to [script.google.com](https://script.google.com)
- Create a new project
- Add `.gs` files matching this repo’s structure and paste in the corresponding code

### 4. Add Script Properties (Secrets)
In **Project Settings → Script Properties**, add:

| Property Name     | Value |
|-------------------|-------|
| `TELEGRAM_TOKEN`  | Bot token from BotFather |
| `WEBAPP_URL`      | Will be set after you deploy as a Web App (step 5) |
| `CALENDAR_ID`     | Your Google Calendar ID |

> ❗ **Never** commit these values to GitHub

### 5. Deploy as a Web App
- **Deploy > New deployment**
- Select **Web app**
- Execute as: **Me**
- Who has access: **Anyone**
- Deploy and copy the Web App URL
- Update your Script Property `WEBAPP_URL` with this URL

### 6. Set Telegram Webhook
- In Apps Script, run the `setWebhook()` function to link your bot to the Web App

---

## ▶ Usage

- `/start` — Welcome + language choice
- `/lang` — Change language
- Browse events via inline keyboards:
  - Quick picks: Today / Tomorrow / Saturday / Sunday
  - Or navigate by year → month → day
- Event buttons open the event’s link (EN or IT based on selected language)

---

## 💻 Local Development with clasp *(optional)*

You can use [clasp](https://github.com/google/clasp) to push/pull code between Google Apps Script and your local machine, then sync with GitHub.

---

## 🛡️ Security Notes

- This repo is **safe for public sharing** — no tokens or IDs in code.
- All sensitive values live in Script Properties (server‑side, in your account only).
- Don’t paste webhook URLs, tokens, or private calendar details into issues or commits.

---

## 📜 License

MIT — feel free to fork, improve, and adapt.

---

<a href="https://doi.org/10.5281/zenodo.15281954"><img src="https://zenodo.org/badge/757993149.svg" alt="DOI"></a>
