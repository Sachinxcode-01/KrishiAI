const admin = require("firebase-admin");

let serviceAccount;

try {
  // 1. Try to load from full JSON environment variable (Best for Vercel)
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    console.log('✅ Firebase: Using full Service Account JSON from environment.');
  } 
  // 2. Try to load from individual environment variables (Fallback)
  else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY) {
    serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };
    console.log('✅ Firebase: Using individual environment variables.');
  }
  // 3. Try to load from local file (Development)
  else {
    try {
      serviceAccount = require("./serviceAccountKey.json");
      console.log('✅ Firebase: Using local serviceAccountKey.json.');
    } catch (e) {
      console.warn("⚠️ Firebase: Service Account not found. Firestore features will be disabled.");
      serviceAccount = null;
    }
  }

  if (serviceAccount && !admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: `${serviceAccount.project_id || serviceAccount.projectId}.appspot.com`
    });
    console.log('✅ Firebase Admin initialized successfully.');
  }
} catch (error) {
  console.error('❌ Failed to initialize Firebase Admin:', error.message);
}

module.exports = admin;
