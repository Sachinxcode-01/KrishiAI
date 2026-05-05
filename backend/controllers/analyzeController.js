const { analyzeImage, diagnoseText: diagnoseTextService } = require('../services/aiService');
const Diagnosis = require('../models/Diagnosis');

const analyze = async (req, res, next) => {
  try {
    const { image, description } = req.body;

    if (!image) {
      return res.status(400).json({ success: false, message: 'No image provided' });
    }

    const diagnosisData = await analyzeImage(image, description);

    res.json({
      success: true,
      data: {
        ...diagnosisData,
        imageUrl: image 
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
    
    res.json({
      success: true,
      data: diagnosisData
    });
  } catch (error) {
    console.error('Text Diagnosis Controller Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { analyze, diagnoseText };
