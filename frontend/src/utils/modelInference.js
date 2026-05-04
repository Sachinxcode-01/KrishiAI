import * as tflite from '@tensorflow/tfjs-tflite';
import * as tf from '@tensorflow/tfjs';

// Mapping of class indices to disease names (Based on the PlantVillage dataset used in train_model.py)
const CLASS_MAPPING = [
  "Apple Scab",
  "Apple Black Rot",
  "Cedar Apple Rust",
  "Apple Healthy",
  "Blueberry Healthy",
  "Cherry Powdery Mildew",
  "Cherry Healthy",
  "Corn Cercospora Leaf Spot",
  "Corn Common Rust",
  "Corn Northern Leaf Blight",
  "Corn Healthy",
  "Grape Black Rot",
  "Grape Esca (Black Measles)",
  "Grape Leaf Blight",
  "Grape Healthy",
  "Orange Haunglongbing (Citrus Greening)",
  "Peach Bacterial Spot",
  "Peach Healthy",
  "Pepper Bell Bacterial Spot",
  "Pepper Bell Healthy",
  "Potato Early Blight",
  "Potato Late Blight",
  "Potato Healthy",
  "Raspberry Healthy",
  "Soybean Healthy",
  "Squash Powdery Mildew",
  "Strawberry Leaf Scorch",
  "Strawberry Healthy",
  "Tomato Bacterial Spot",
  "Tomato Early Blight",
  "Tomato Late Blight",
  "Tomato Leaf Mold",
  "Tomato Septoria Leaf Spot",
  "Tomato Spider Mites",
  "Tomato Target Spot",
  "Tomato Yellow Leaf Curl Virus",
  "Tomato Mosaic Virus",
  "Tomato Healthy"
];

let model = null;

export const loadModel = async () => {
  if (model) return model;
  try {
    console.log("Loading TFLite model...");
    // The model should be in public/model/krishi_disease_model.tflite
    model = await tflite.loadTFLiteModel('/model/krishi_disease_model.tflite');
    console.log("Model loaded successfully");
    return model;
  } catch (error) {
    console.error("Failed to load TFLite model:", error);
    throw error;
  }
};

export const runInference = async (imageElement) => {
  const loadedModel = await loadModel();
  
  // Preprocess image
  const tensor = tf.tidy(() => {
    return tf.browser.fromPixels(imageElement)
      .resizeNearestNeighbor([224, 224])
      .expandDims(0)
      .div(255.0)
      .toFloat();
  });

  const prediction = loadedModel.predict(tensor);
  const probabilities = await prediction.data();
  
  // Get top result
  const maxProb = Math.max(...probabilities);
  const classId = probabilities.indexOf(maxProb);
  
  tensor.dispose();
  prediction.dispose();

  return {
    classId,
    diseaseName: CLASS_MAPPING[classId] || "Unknown Disease",
    confidence: maxProb
  };
};
