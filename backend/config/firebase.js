const admin = require("firebase-admin");
const path = require("path");

let serviceAccount;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    console.log('✅ Using Firebase Service Account from environment variable.');
  } else {
    serviceAccount = require("./serviceAccountKey.json");
    console.log('✅ Using Firebase Service Account from local JSON file.');
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: `${serviceAccount.project_id}.appspot.com`
  });
  console.log('✅ Firebase Admin initialized successfully.');
} catch (error) {
  console.error('❌ Failed to initialize Firebase Admin:', error.message);
}

module.exports = admin;
