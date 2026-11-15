# Switch on real accounts (free)

Brainbloom works out of the box with **local-only** accounts (saved in the browser, no password reset, no sync).
Follow these steps to get **email sign-in, "Forgot password?" emails and progress that follows the user to any
device**, using Firebase's free Spark plan. No code changes are needed, only a config paste.

## 1. Create the Firebase project (about 5 minutes)
1. Go to https://console.firebase.google.com and sign in with a Google account.
2. **Add project**, name it (for example `brainbloom`). You can turn Google Analytics off.
3. In the left menu: **Build > Authentication > Get started > Sign-in method > Email/Password > Enable > Save**.
4. **Build > Firestore Database > Create database**. Pick a location near your users and start in **production mode**.
5. In Firestore, open the **Rules** tab, replace everything with the contents of `firestore.rules` from this folder, and **Publish**.
   (This is what keeps each person's data private. Do not skip it.)

## 2. Connect the app
1. **Project settings (gear icon) > General > Your apps > Web (`</>`)**. Register an app, name it `brainbloom-web`.
2. Copy the `firebaseConfig` values (apiKey, authDomain, projectId, appId).
3. Paste them into `firebase-config.js` in place of `null`, as shown in the example in that file.
   These values are public identifiers, so it is fine to commit them. The rules protect the data.

## 3. Allow your website's address
**Authentication > Settings > Authorized domains > Add domain**: add the address where the app is hosted
(for example `brainbloom.pages.dev`). `localhost` is already allowed for testing.

## 4. Make the reset email look right (optional but recommended)
**Authentication > Templates > Password reset**: set the sender name and customise the text, and the language if you like.
Do the same for **Email address verification**.

## What users get
- **Sign up / log in with email.** Display name is optional. A verification email is sent (users can play before verifying).
- **Forgot password?** on the login screen emails a reset link. The message is the same whether or not the email has an
  account, so nobody can use it to find out who is registered.
- **Progress sync.** Saved to the signed-in user's own Firestore document and merged across devices (the most complete
  progress wins, nothing is lost). Guest progress is merged in when someone signs up.
- **Delete my account** in Profile removes the account and its saved progress.

## Free-plan notes
- The Spark plan is free with no card. Email/password sign-in has no per-user charge, and Firestore's free daily quota is
  far more than this app needs for a long time.
- Email-sending limits apply to reset/verification emails; for a large launch consider a custom email domain (Firebase Authentication settings).

## Before an app-store launch
- Add a **privacy policy** and say you store email and learning progress. Apple also requires the in-app **account
  deletion** option, which is already included.
- Turn on **Authentication > Settings > User actions** protections you want (for example email-enumeration protection is
  on by default for new projects).

## If something does not work
- "Firebase could not start" in the browser console: check the pasted config and that the page is served over https
  (or localhost).
- Reset or verification email not arriving: check spam, and that the sending domain/templates are set up.
- Sign-in works but progress does not sync: the Firestore rules are probably not published, or the database was not created.
