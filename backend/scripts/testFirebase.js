const admin = require('../config/firebase');

async function testFirebase() {
  if (!admin) {
    console.error('❌ Firebase Admin not initialized. Check your config.');
    return;
  }

  try {
    const db = admin.firestore();
    const testDoc = db.collection('test').doc('connection');
    
    console.log('⏳ Attempting to write to Firestore...');
    await testDoc.set({
      message: 'Firebase connection successful!',
      timestamp: new Date()
    });

    const doc = await testDoc.get();
    console.log('✅ Firestore Read/Write success:', doc.data());
    
    // Clean up
    await testDoc.delete();
    console.log('🧹 Test document cleaned up.');
    console.log('\n✨ DATABASE CONNECTED SUCCESSFULLY! ✨');
  } catch (error) {
    console.error('❌ Firestore test failed:', error.message);
    if (error.message.includes('permission-denied')) {
      console.log('\n💡 TIP: Make sure you have enabled Firestore in the Firebase Console and set rules to "Test Mode".');
    }
  }
}

testFirebase();
