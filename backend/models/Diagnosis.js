const mongoose = require('mongoose');

const DiagnosisSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true }, // Base64 thumbnail or small image
  cropName: { type: String, required: true },
  cropNameKannada: { type: String, required: true },
  diseaseName: { type: String, required: true },
  diseaseNameKannada: { type: String, required: true },
  severity: { 
    type: String, 
    enum: ['Low', 'Medium', 'High', 'Not Diseased', 'Uncertain'],
    required: true 
  },
  confidence: { type: Number, required: true },
  description: { type: String, required: true },
  descriptionKannada: { type: String, required: true },
  causes: { type: String, required: true },
  causesKannada: { type: String, required: true },
  treatment: [{ type: String }],
  treatmentKannada: [{ type: String }],
  prevention: [{ type: String }],
  preventionKannada: [{ type: String }],
  medicineAdvice: { type: String, required: true },
  medicineAdviceKannada: { type: String, required: true },
  urgency: { 
    type: String, 
    enum: ['Act immediately', 'Within 3 days', 'Can wait'],
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Diagnosis', DiagnosisSchema);
