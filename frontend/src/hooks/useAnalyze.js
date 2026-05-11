import { useState } from 'react';
import api from '../utils/api';
import { compressImage } from '../utils/imageCompression';
import { useDiagnosis } from '../context/DiagnosisContext';

export const useAnalyze = () => {
  const { setLatestDiagnosis } = useDiagnosis();
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [compressionInfo, setCompressionInfo] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  const analyzeCrop = async (imageFile, description = '') => {
    setAnalyzing(true);
    setError(null);
    setResult(null);
    
    // Create preview for UI
    const previewUrl = URL.createObjectURL(imageFile);
    setCurrentImage(previewUrl);

    try {
      // 1. Compress image client-side
      const compressed = await compressImage(imageFile);
      setCompressionInfo({
        original: compressed.originalSize,
        compressed: compressed.compressedSize
      });

      // 2. Convert to Base64 (backend expects base64)
      const reader = new FileReader();
      const base64Promise = new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(compressed.file);
      });
      const base64Image = await base64Promise;

      // 3. Get Location
      let location = null;
      try {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
        });
        location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
      } catch (e) {
        console.warn("Location access denied or timeout.");
      }

      // 4. API Call - Use shared API utility
      const response = await api.post('/analyze', {
        image: base64Image,
        description,
        location
      });

      if (response.data.success) {
        setResult(response.data.data);
        setLatestDiagnosis(response.data.data);
      } else {
        throw new Error(response.data.message || 'Analysis failed');
      }
    } catch (err) {
      console.error('Analysis Error:', err);
      setError(err.response?.data?.message || err.message || 'Something went wrong during analysis');
    } finally {
      setAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setError(null);
    setAnalyzing(false);
    setCompressionInfo(null);
  };

  return {
    analyzeCrop,
    analyzing,
    result,
    error,
    compressionInfo,
    currentImage,
    resetAnalysis
  };
};
