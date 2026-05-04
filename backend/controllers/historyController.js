const admin = require('../config/firebase');

const getHistory = async (req, res, next) => {
  if (!admin) {
    return res.status(503).json({ success: false, message: 'Firebase not configured' });
  }
  try {
    const db = admin.firestore();
    const snapshot = await db.collection('diagnoses')
      .orderBy('created_at', 'desc')
      .get();

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const saveDiagnosis = async (req, res, next) => {
  if (!admin) {
    return res.status(503).json({ success: false, message: 'Firebase not configured' });
  }
  try {
    const db = admin.firestore();
    const diagnosisData = {
      ...req.body,
      created_at: admin.firestore.FieldValue.serverTimestamp()
    };
    
    const docRef = await db.collection('diagnoses').add(diagnosisData);
    res.json({ success: true, id: docRef.id });
  } catch (error) {
    next(error);
  }
};

const deleteDiagnosis = async (req, res, next) => {
  if (!admin) {
    return res.status(503).json({ success: false, message: 'Firebase not configured' });
  }
  try {
    const { id } = req.params;
    const db = admin.firestore();
    await db.collection('diagnoses').doc(id).delete();
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

const clearHistory = async (req, res, next) => {
  if (!admin) {
    return res.status(503).json({ success: false, message: 'Firebase not configured' });
  }
  try {
    const db = admin.firestore();
    const batch = db.batch();
    const snapshot = await db.collection('diagnoses').get();
    
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHistory,
  saveDiagnosis,
  deleteDiagnosis,
  clearHistory
};
