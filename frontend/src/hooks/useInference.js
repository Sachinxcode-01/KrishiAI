import { useState, useCallback } from 'react';
import { runInference } from '../utils/modelInference';
import { analyzeImage, saveToHistory } from '../utils/api';

export const useInference = () => {
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0); 
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const analyze = useCallback(async (base64Image, description, location) => {
    setLoading(true);
    setResult(null);
    setError(null);
    
    try {
      // Step 0: Convert base64 to Image (for TFLite)
      const img = new Image();
      img.src = base64Image;
      await new Promise((resolve) => { img.onload = resolve; });

      // Step 1: Edge AI Detection (Optional fast pass)
      setLoadingStep(0); // "Neural Scan Initiated"
      const detection = await runInference(img);
      console.log("Edge AI Result:", detection);

      // Step 2: Advanced AI Report Generation (NVIDIA via Backend)
      setLoadingStep(1); // "Consulting Crop Doctor"
      
      const response = await analyzeImage(base64Image, `${description}. Preliminary detection: ${detection.diseaseName}`);
      const reportData = response.data.data;

      setLoadingStep(2); // "Finalizing Report"
      const finalReport = {
        ...reportData,
        location: location || null,
        imageUrl: base64Image // Ensure we use the captured image
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
