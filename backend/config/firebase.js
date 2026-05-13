const admin = require("firebase-admin");

let serviceAccount;

try {
  // 1. Try to load from full JSON environment variable (Best for Vercel)
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    console.log('✅ Firebase: Using full Service Account JSON from environment.');
  } 
  // 2. Try to load from individual environment variables (Fallback)
  else if (process.env.FIREBASE_PROJECT_ID && (process.env.FIREBASE_PRIVATE_KEY || process.env.FIREBASE_SERVICE_ACCOUNT_KEY)) {
    // Clean up the private key format
    let privateKey = (process.env.FIREBASE_PRIVATE_KEY || "").trim();
    
    // Remove potential surrounding quotes
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.substring(1, privateKey.length - 1);
    }
    
    // Replace literal \n with actual newlines
    privateKey = privateKey.replace(/\\n/g, '\n');

    serviceAccount = {
      type: "service_account",
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: privateKey,
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
  // Log more details about the error if it's a certificate error
  if (error.message.includes('private key')) {
    console.error('💡 Tip: Ensure FIREBASE_PRIVATE_KEY is correctly formatted in your .env file.');
  }
}

module.exports = admin;
