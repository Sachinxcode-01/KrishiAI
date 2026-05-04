import { useState, useCallback } from 'react';
import { runInference } from '../utils/modelInference';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { saveToHistory } from '../utils/api';

export const useInference = () => {
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0); 
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const gemini = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const analyze = useCallback(async (base64Image, description, location) => {
    setLoading(true);
    setResult(null);
    setError(null);
    
    try {
      // Step 0: Convert base64 to Image
      const img = new Image();
      img.src = base64Image;
      await new Promise((resolve) => { img.onload = resolve; });

      // Step 1: Edge AI Detection
      setLoadingStep(0); // "Neural Scan Initiated"
      const detection = await runInference(img);
      console.log("Edge AI Result:", detection);

      if (detection.confidence < 0.1) {
        throw new Error("Could not identify any plant disease. Please try a clearer photo.");
      }

      // Step 2: Gemini Report Generation
      setLoadingStep(1); // "Consulting Crop Doctor"
      
      const prompt = `You are a professional Agronomist. 
      I have detected "${detection.diseaseName}" with ${Math.round(detection.confidence * 100)}% confidence.
      The user described it as: "${description}".
      
      Generate a complete diagnostic report in JSON format with the following keys:
      {
        "diseaseName": "...",
        "diseaseNameKannada": "...",
        "cropName": "...",
        "cropNameKannada": "...",
        "severity": "High/Medium/Low",
        "confidence": ${Math.round(detection.confidence * 100)},
        "causes": "Detailed cause in English",
        "causesKannada": "Detailed cause in Kannada",
        "description": "Short overview in English",
        "descriptionKannada": "Short overview in Kannada",
        "treatment": ["Step 1", "Step 2", "Step 3"],
        "treatmentKannada": ["ಹಂತ 1", "ಹಂತ 2", "ಹಂತ 3"],
        "medicineAdvice": "Specific medicine or organic solution in English",
        "medicineAdviceKannada": "Specific medicine in Kannada"
      }
      
      Respond ONLY with the JSON object.`;

      const geminiResult = await gemini.generateContent(prompt);
      const responseText = geminiResult.response.text();
      
      // Clean up JSON response (sometimes Gemini adds ```json)
      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const reportData = JSON.parse(cleanJson);

      // Add image to report
      const canvas = document.createElement('canvas');
      canvas.width = imageElement.width;
      canvas.height = imageElement.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(imageElement, 0, 0);
      reportData.imageUrl = canvas.toDataURL('image/jpeg');

      setLoadingStep(2); // "Finalizing Report"
      const finalReport = {
        ...reportData,
        location: location || null,
      };
      setResult(finalReport);

      // Auto-save to history
      try {
        await saveToHistory(finalReport);
      } catch (saveErr) {
        console.warn('History save failed:', saveErr);
      }

    } catch (err) {
      console.error('Inference error:', err);
      setError(err.message || 'Failed to analyze plant. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { analyze, loading, loadingStep, result, error, setResult };
};
