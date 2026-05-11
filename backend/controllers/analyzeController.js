const { analyzeImage, diagnoseText: diagnoseTextService } = require('../services/aiService');
const admin = require('../config/firebase');

const analyze = async (req, res, next) => {
  try {
    const { image, description, location, mode } = req.body;

    if (!image) {
      return res.status(400).json({ success: false, message: 'No image provided' });
    }

    const diagnosisData = await analyzeImage(image, description, mode || 'standard');

    // Auto-save to history
    let savedId = null;
    if (admin) {
      const db = admin.firestore();
      const docRef = await db.collection('diagnoses').add({
        ...diagnosisData,
        imageUrl: image,
        location: location || null,
        created_at: admin.firestore.FieldValue.serverTimestamp()
      });
      savedId = docRef.id;
    }

    res.json({
      success: true,
      data: {
        ...diagnosisData,
        imageUrl: image,
        _id: savedId
      }
    });
  } catch (error) {
    console.error('Analyze Controller Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const diagnoseText = async (req, res) => {
  try {
    const { symptoms } = req.body;
    if (!symptoms) {
      return res.status(400).json({ success: false, message: 'Symptoms description is required' });
    }

    const diagnosisData = await diagnoseTextService(symptoms);
    
    // Auto-save manual diagnosis to history
    let savedId = null;
    if (admin) {
      const db = admin.firestore();
      const docRef = await db.collection('diagnoses').add({
        ...diagnosisData,
        symptoms: symptoms,
        isManual: true,
        created_at: admin.firestore.FieldValue.serverTimestamp()
      });
      savedId = docRef.id;
    }
    
    res.json({
      success: true,
      data: {
        ...diagnosisData,
        _id: savedId
      }
    });
  } catch (error) {
    console.error('Text Diagnosis Controller Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { analyze, diagnoseText };
