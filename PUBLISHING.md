# Putting Brainbloom on iPhone, Android and Windows

Brainbloom is a web app that is already a **Progressive Web App (PWA)**: it installs like a normal app, has its own
icon, opens full-screen and works offline. That covers all three systems for free. App-store versions are an extra step
you can take later (they cost money and take more work).

## 0. Publish the website (free, about 5 minutes)
`brainbloom-site.zip` (next to this folder) holds exactly the files to upload. The easiest free host is **Cloudflare Pages**:
1. Sign in at dash.cloudflare.com (a free account is enough).
2. **Workers & Pages > Create > Pages > Upload assets**. Name the project (for example `brainbloom`).
3. Drag in `brainbloom-site.zip` (or the unzipped files) and **Deploy**. Your site is live at `https://brainbloom.pages.dev`
   (the name you chose, with `.pages.dev`).
4. If you turned on accounts (`SETUP_AUTH.md`): in Firebase, **Authentication > Settings > Authorized domains > Add domain** and add that address.
5. Open the site on your phone, check the install steps below, and open **Profile > Privacy policy**.
6. To update later: upload the new zip again (and bump `VERSION` in `sw.js` first).

Before announcing it: open `privacy.html`, replace **[your support email]**, delete the grey "Owner note", and confirm the audience age.

## 1. What works today (free)

| Device | How a person installs it |
|---|---|
| **Android** (Chrome) | Open the website, then Profile > **Install Brainbloom**, or Chrome menu > Install app / Add to Home screen. |
| **iPhone / iPad** (Safari) | Open the website in **Safari**, tap **Share**, then **Add to Home Screen**. (iOS has no install button, so Profile shows these steps.) |
| **Windows** (Edge or Chrome) | Open the website, click the **install icon** in the address bar (or Profile > Install Brainbloom). It then appears in the Start menu like any app. |
| **Mac / Linux / Chromebook** | Same as Windows, in Chrome or Edge. |

The installable app needs the site to be served over **https** (see the hosting options). Cloudflare Pages, Firebase Hosting
and Netlify all do this automatically.

**Offline:** `sw.js` keeps a copy of the app and the 3D engine, so lessons work with no connection (verified by switching
the server off). Signing in and syncing need internet.

**When you publish a new version:** change `VERSION` at the top of `sw.js` (for example `bb-v2`). Devices then pick up the
new files the next time they open the app online.

## 2. App-store versions (optional, later)

| Store | What it takes | Cost and rules to check |
|---|---|---|
| **Google Play (Android)** | Wrap the site as a Trusted Web Activity with [PWABuilder](https://www.pwabuilder.com) or Bubblewrap. Can be built on Windows. | One-time developer fee (about US$25, confirm on Google's page). **New personal accounts must run a closed test with at least 12 testers for 14 days before they can publish** (organisation accounts are exempt). |
| **Apple App Store (iPhone/iPad)** | Wrap the site with [Capacitor](https://capacitorjs.com), build in **Xcode on a Mac** (or a cloud Mac build service), upload with an Apple Developer account. | Apple Developer Program, about US$99 a year (confirm on Apple's page). **Apple can reject apps that feel like a website in a wrapper (guideline 4.2).** Add native touches (for example streak reminders through notifications, haptics) and keep offline working. |
| **Microsoft Store (Windows)** | Package the PWA as MSIX with PWABuilder and submit. | Microsoft dropped the individual registration fee in 2025 (confirm on Microsoft's page); company accounts still pay a one-time fee. |

Honest advice: ship the PWA first and watch how people use it. Add the stores when you want discoverability.
If you only do one store first, Google Play (Android) is the cheapest and easiest; Apple is the most work.

## 3. Checklist before any store (and good practice for the website)
- [ ] **Privacy policy** page (what you store: email, learning progress) and a support email.
- [ ] **In-app account deletion**: already in Profile (required by Apple and Google).
- [ ] Bundle **Three.js and the Firebase SDK inside the app** instead of loading them from CDNs (stores like apps that work fully offline). Today they load from public CDNs and are cached after first use.
- [ ] Screenshots, a short description and an **age rating**. If you target children, extra rules apply (for example COPPA and the Kids categories), so decide your audience first.
- [ ] The **Trading** path is educational only and shows a "not financial advice" notice. Keep it that way; do not add real trading or buy/sell tips, which brings financial-app rules.
- [ ] Set `FIREBASE_CONFIG` (see `SETUP_AUTH.md`) and add your site address to Firebase **Authorized domains**.
- [ ] Add an absolute `og:image` URL (use `icons/og-image.png`) once you know your website address, so links look good when shared.

## 4. Files that make this work
- `manifest.json`: name, colours, icons (including a maskable icon for Android).
- `sw.js`: offline support and installability.
- `icons/`: app icons for every size, the iPhone home-screen icon, and a share image.
- `index.html`: iOS home-screen tags and service-worker registration.
