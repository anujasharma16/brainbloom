/* © 2026 Anuja Sharma. All rights reserved. See LICENSE. */
/* Cloud accounts: email + password sign-in, forgot-password emails and progress sync through Firebase
   (free Spark plan). The SDK is loaded from Google's CDN only when firebase-config.js has a config, so without one
   the app stays local-only. Everything the app needs goes through this small adapter interface:
     onUser(cb)                 cb(user|null), user = { uid, email, displayName, emailVerified }; returns an unsubscribe fn
     signUp(email, pw, name)    creates the account and sends a verification email
     signIn(email, pw)          reset(email)          signOut()          resendVerification()
     load(uid) / save(uid, data) / remove(uid)       progress document, and full account deletion
   Another adapter can be plugged in with Cloud.use(adapter) (this is how the flows are tested without a project). */
const Cloud = (() => {
  const SDK = 'https://www.gstatic.com/firebasejs/10.12.2/';
  let adapter = null;
  const listeners = [];

  async function firebaseAdapter(cfg) {
    const [appMod, A, F] = await Promise.all([import(SDK + 'firebase-app.js'), import(SDK + 'firebase-auth.js'), import(SDK + 'firebase-firestore.js')]);
    const app = appMod.initializeApp(cfg), auth = A.getAuth(app), db = F.getFirestore(app);
    const slim = (u) => (u ? { uid: u.uid, email: u.email, displayName: u.displayName || '', emailVerified: !!u.emailVerified } : null);
    return {
      name: 'firebase',
      onUser: (cb) => A.onAuthStateChanged(auth, (u) => cb(slim(u))),
      async signUp(email, pw, name) {
        const c = await A.createUserWithEmailAndPassword(auth, email, pw);
        if (name) { try { await A.updateProfile(c.user, { displayName: name }); } catch { /* the name is optional */ } }
        try { await A.sendEmailVerification(c.user); } catch { /* the account exists; they can resend from Profile */ }
        return slim(auth.currentUser);
      },
      signIn: (email, pw) => A.signInWithEmailAndPassword(auth, email, pw).then((c) => slim(c.user)),
      reset: (email) => A.sendPasswordResetEmail(auth, email),
      signOut: () => A.signOut(auth),
      resendVerification: () => A.sendEmailVerification(auth.currentUser),
      async load(uid) { const s = await F.getDoc(F.doc(db, 'users', uid)); return s.exists() ? s.data() : null; },
      save: (uid, data) => F.setDoc(F.doc(db, 'users', uid), data, { merge: true }),
      async remove(uid) { await F.deleteDoc(F.doc(db, 'users', uid)); await A.deleteUser(auth.currentUser); }, // data first, then the account
    };
  }

  /* Firebase error codes -> the i18n key to show (kept vague on login so nobody can probe which emails exist) */
  const KEYS = {
    'auth/invalid-email': 'errEmail', 'auth/missing-email': 'errEmail', 'auth/email-already-in-use': 'errEmailUsed', 'auth/weak-password': 'errPass',
    'auth/invalid-credential': 'errBadLoginEmail', 'auth/wrong-password': 'errBadLoginEmail', 'auth/user-not-found': 'errBadLoginEmail', 'auth/invalid-login-credentials': 'errBadLoginEmail',
    'auth/too-many-requests': 'errTooMany', 'auth/network-request-failed': 'errNetwork', 'auth/requires-recent-login': 'errRecent',
  };

  const need = () => { if (!adapter) throw new Error('Cloud accounts are not configured'); return adapter; };
  return {
    get on() { return !!adapter; },
    use(a) { adapter = a; listeners.forEach((f) => f()); },
    /* run `f` now if an adapter is ready, and again whenever one is plugged in */
    onAdapter(f) { listeners.push(f); if (adapter) f(); },
    async init() {
      const cfg = window.FIREBASE_CONFIG;
      if (adapter || !cfg || !cfg.apiKey) return false;
      try { this.use(await firebaseAdapter(cfg)); return true; } catch (e) { console.warn('Firebase could not start, staying local-only:', e); return false; }
    },
    errorKey: (e) => KEYS[e && e.code] || 'errGeneric',
    onUser: (cb) => need().onUser(cb),
    signUp: (...a) => need().signUp(...a), signIn: (...a) => need().signIn(...a), reset: (e) => need().reset(e), signOut: () => need().signOut(),
    resendVerification: () => need().resendVerification(), load: (uid) => need().load(uid), save: (uid, d) => need().save(uid, d), remove: (uid) => need().remove(uid),
  };
})();
