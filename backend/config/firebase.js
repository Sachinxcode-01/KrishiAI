const admin = require("firebase-admin");
const path = require("path");

// Link to the service account file
const serviceAccount = require("./serviceAccountKey.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: `${serviceAccount.project_id}.appspot.com`
  });
  console.log('✅ Firebase Admin initialized successfully.');
} catch (error) {
  console.error('❌ Failed to initialize Firebase Admin:', error.message);
}

module.exports = admin;
