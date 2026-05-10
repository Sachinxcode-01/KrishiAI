import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Tactical Validation: Ensure critical telemetry nodes are configured
const missingKeys = Object.entries(firebaseConfig)
  .filter(([key, value]) => !value || value.includes('YOUR_'))
  .map(([key]) => key);

if (missingKeys.length > 0) {
  console.warn(`⚠️ Firebase Intelligence Warning: Missing or placeholder values detected for [${missingKeys.join(', ')}]. Satellite data and authentication protocols may be offline.`);
}

let app, auth, db, storage;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  console.log("✅ Firebase Service initialized.");
} catch (error) {
  console.error("❌ Firebase Initialization Error:", error);
}

export { auth, db, storage };
export default app;
