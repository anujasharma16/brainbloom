/* Firebase web-app configuration.
   Leave this as `null` and the app keeps working with local-only accounts (no sync, no password reset).
   To switch on real accounts (email sign-in, forgot-password emails, progress on every device), create a free
   Firebase project and paste its web config below. See SETUP_AUTH.md for the 10-minute walkthrough.

   These values are public identifiers, not secrets. What protects user data is Firebase Authentication plus the
   Firestore security rules in firestore.rules, so make sure you publish those rules. */
window.FIREBASE_CONFIG = null;

/* Example (use your own values from Firebase console > Project settings > Your apps > Web app):
window.FIREBASE_CONFIG = {
  apiKey: 'AIza...',
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'your-project',
  appId: '1:1234567890:web:abcdef123456',
};
*/
