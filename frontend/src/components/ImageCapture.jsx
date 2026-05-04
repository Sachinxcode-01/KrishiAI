import React, { useState, useRef, useEffect } from 'react';
import { useCamera } from '../hooks/useCamera';
import { compressImage, fileToBase64, formatFileSize } from '../utils/imageUtils';
import { translations } from '../utils/translations';

const ImageCapture = ({ lang, onCapture, onClear }) => {
  const { videoRef, startCamera, stopCamera, capturePhoto, stream } = useCamera();
  const [preview, setPreview] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const fileInputRef = useRef(null);
  const t = translations[lang];

  const handleCapture = async () => {
    const photo = capturePhoto();
    if (photo) {
      setPreview(photo);
      onCapture(photo);
      stopCamera();
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const compressed = await compressImage(file);
      const base64 = await fileToBase64(compressed);
      setPreview(base64);
      setFileInfo({
        name: file.name,
        size: formatFileSize(compressed.size)
      });
      onCapture(base64);
    }
  };

  const clear = () => {
    setPreview(null);
    setFileInfo(null);
    onClear();
  };

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  return (
    <div className="w-full space-y-4">
      <div className="relative aspect-square w-full bg-surface rounded-3xl overflow-hidden border-2 border-white/5 shadow-2xl">
        {!preview && !stream && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-4xl animate-bounce">
              🍃
            </div>
            <p className="text-sm text-text/60 max-w-[200px]">
              {lang === 'en' ? 'Take a clear photo of the infected leaf' : 'ರೋಗಪೀಡಿತ ಎಲೆಯ ಸ್ಪಷ್ಟ ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ'}
            </p>
          </div>
        )}

        {stream && !preview && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        )}

        {preview && (
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        )}
      </div>

      {fileInfo && preview && (
        <div className="flex justify-between items-center px-2 text-[10px] text-text/40 font-medium">
          <span>{fileInfo.name}</span>
          <span>{fileInfo.size}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {!preview ? (
          <>
            {!stream ? (
              <button onClick={startCamera} className="btn-primary col-span-2">
                📷 {t.cameraBtn}
              </button>
            ) : (
              <button onClick={handleCapture} className="btn-primary col-span-2 bg-accent shadow-[0_0_20px_rgba(105,240,174,0.3)]">
                📸 {lang === 'en' ? 'Capture' : 'ಫೋಟೋ ತೆಗೆಯಿರಿ'}
              </button>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-surface hover:bg-white/10 border border-white/10 text-text py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all col-span-2"
            >
              📁 {t.uploadBtn}
            </button>
          </>
        ) : (
          <button
            onClick={clear}
            className="bg-error/10 hover:bg-error/20 border border-error/20 text-error py-3 rounded-xl font-bold transition-all col-span-2 flex items-center justify-center gap-2"
          >
            🔄 {t.retakeBtn}
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default ImageCapture;
