const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const CLASS_NAMES_PATH = path.join(__dirname, '../model/class_names.json');
const classNames = JSON.parse(fs.readFileSync(CLASS_NAMES_PATH, 'utf-8'));

/**
 * Run local PyTorch/ONNX model inference via Python subprocess.
 * Falls back to NVIDIA AI if model not available.
 */
const runLocalInference = (imagePath) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, '../model/predict.py');

    if (!fs.existsSync(scriptPath)) {
      return reject(new Error('Local model not found. Use NVIDIA AI inference.'));
    }

    const py = spawn('python', [scriptPath, imagePath]);
    let output = '';
    let errOutput = '';

    py.stdout.on('data', (data) => { output += data.toString(); });
    py.stderr.on('data', (data) => { errOutput += data.toString(); });

    py.on('close', (code) => {
      if (code !== 0) return reject(new Error(`Python error: ${errOutput}`));
      try {
        const result = JSON.parse(output.trim());
        resolve(result);
      } catch {
        reject(new Error('Invalid JSON from model output'));
      }
    });
  });
};

/**
 * Map a PlantVillage/model class label to a human-readable display name.
 * e.g. "Tomato___Early_blight" → { crop: "Tomato", disease: "Early Blight" }
 */
const parseClassName = (label) => {
  const parts = label.split('___');
  const crop = parts[0].replace(/_/g, ' ');
  const disease = parts[1]
    ? parts[1].replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Healthy';
  return { crop, disease, isHealthy: disease.toLowerCase() === 'healthy' };
};

/**
 * Get all 70 supported class labels.
 */
const getAllClasses = () => classNames.map((label, idx) => ({
  id: idx,
  label,
  ...parseClassName(label)
}));

/**
 * Get unique crops from class list.
 */
const getSupportedCrops = () => {
  const crops = new Set(classNames.map((l) => l.split('___')[0].replace(/_/g, ' ')));
  return Array.from(crops);
};

module.exports = { runLocalInference, parseClassName, getAllClasses, getSupportedCrops, classNames };
