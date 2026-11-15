# Brainbloom (working name)

Learn AI by playing: beginner → pro, then a specialisation path (currently "AI in Software Testing").

## Run
Open `index.html` in a browser, or serve the folder (`python -m http.server` inside this folder).

## Structure
- `content.js`: levels, lessons, questions, paths (all text in en/fr/es)
- `i18n.js`: UI strings and the language list
- `app.js`: screens, quiz engine, progress, milestones, accounts
- `styles.css`: responsive layout (bottom nav on phones, sidebar on desktop), dark mode

## Extending
- Hindi lives in `hi.js` (UI strings plus lesson text matched by lesson id and question order); copy it as a template for another language.
- Mandarin lives in `zh.js` (UI strings) and `zh-content.js` (every lesson text, keyed by its English wording; `zh.js` attaches it at load). The three newer paths (`business.js`, `creators.js`, `devpath.js`) carry en/fr/es/hi inline and get Mandarin from that dictionary. After adding English lesson text, regenerate the dictionary entries for the new strings.
- New language: add to `LANGS`, add a block in `I18N`, add a value to each `T(en, fr, es, …)` in content (missing text falls back to English).
- New path: add an object to `PATHS` in `content.js` (and a badge in `app.js` if wanted).
- Installable and offline: Brainbloom is a PWA (`manifest.json`, `sw.js`, `icons/`). Bump `VERSION` in `sw.js` on every release. See `PUBLISHING.md` for installing on iPhone, Android and Windows and for the app-store route.
- Accounts: by default they are local-only (stored in this browser, password hashed with PBKDF2). For real accounts with email sign-in, "Forgot password?" emails and progress sync across devices, follow `SETUP_AUTH.md` (free Firebase plan; paste your config into `firebase-config.js` and publish `firestore.rules`). The cloud layer is `cloud.js`.
