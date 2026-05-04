import { useState, useCallback } from 'react';
import { analyzeImage, saveToHistory } from '../utils/api';

export const useAnalyze = () => {
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0); // 0: scanning, 1: detecting, 2: preparing
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const analyze = useCallback(async (base64Image, description) => {
    setLoading(true);
    setResult(null);
    setError(null);
    
    // Simulate steps for UI animation
    setLoadingStep(0);
    const stepInterval = setInterval(() => {
      setLoadingStep(prev => (prev < 2 ? prev + 1 : prev));
    }, 2000);

    // Timeout logic (30 seconds)
    const timeout = setTimeout(() => {
      setError('Analysis timed out. Please check your internet connection or try a clearer image.');
      setLoading(false);
      clearInterval(stepInterval);
    }, 30000);

    try {
      const response = await analyzeImage(base64Image, description);
      
      clearTimeout(timeout);
      
      if (response.data.success) {
        setResult(response.data.data);
        // Auto-save to history
        try {
          await saveToHistory(response.data.data);
        } catch (saveErr) {
          console.warn('Failed to save to history, but analysis succeeded:', saveErr);
        }
      } else {
        throw new Error(response.data.message || 'Analysis failed');
      }
    } catch (err) {
      clearTimeout(timeout);
      console.error('Analysis error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to analyze leaf');
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  }, []);

  return { analyze, loading, loadingStep, result, error, setResult };
};
