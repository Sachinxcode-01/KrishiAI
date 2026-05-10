import React, { useState, useRef, useEffect } from 'react';
import { useCamera } from '../hooks/useCamera';
import { compressImage, fileToBase64, formatFileSize } from '../utils/imageUtils';
import { translations } from '../utils/translations';
import { Camera, Upload, RotateCcw, Scan, Image as ImageIcon } from 'lucide-react';

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
    <div className="w-full space-y-6">
      <div className="relative aspect-square w-full bg-black/40 rounded-3xl overflow-hidden border border-white/10 shadow-2xl specimen-grid">
        {!preview && !stream && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-6">
            <div className="size-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center relative">
              <Scan className="size-10 text-primary animate-pulse" />
              <div className="absolute inset-0 border-2 border-primary/40 rounded-full animate-ping [animation-duration:3s]" />
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Awaiting Specimen</p>
              <p className="text-xs text-white/40 max-w-[240px] leading-relaxed">
                {lang === 'en' 
                  ? 'Capture or upload high-resolution image of biological anomaly.' 
                  : 'ರೋಗಪೀಡಿತ ಎಲೆಯ ಸ್ಪಷ್ಟ ಫೋಟೋ ಅಥವಾ ಫೈಲ್ ಅಪ್ಲೋಡ್ ಮಾಡಿ.'}
              </p>
            </div>
          </div>
        )}

        {stream && !preview && (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Camera Overlay */}
            <div className="absolute inset-0 border-[40px] border-black/40 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-primary/50 border-dashed rounded-3xl animate-pulse pointer-events-none" />
          </div>
        )}

        {preview && (
          <div className="relative w-full h-full">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}
      </div>

      {fileInfo && preview && (
        <div className="flex justify-between items-center px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
          <div className="flex items-center gap-3">
            <ImageIcon className="size-3 text-primary" />
            <span className="text-[10px] text-white/60 font-black uppercase tracking-widest truncate max-w-[200px]">{fileInfo.name}</span>
          </div>
          <span className="text-[10px] text-primary font-black">{fileInfo.size}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {!preview ? (
          <>
            {!stream ? (
              <button 
                onClick={startCamera} 
                className="group relative h-28 bg-white/5 border border-white/10 hover:bg-[var(--primary)] hover:border-[var(--primary)] rounded-3xl transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-2 left-2 size-2 border-t border-l border-white/20 group-hover:border-black/40" />
                <div className="absolute bottom-2 right-2 size-2 border-b border-r border-white/20 group-hover:border-black/40" />
                <div className="flex flex-col items-center justify-center gap-2 relative z-10">
                  <Camera className="size-6 text-[var(--primary)] group-hover:text-black transition-colors duration-500" />
                  <span className="font-display font-black text-[0.6rem] uppercase tracking-[0.3em] text-white group-hover:text-black transition-colors duration-500">
                    {t.cameraBtn}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ) : (
              <button 
                onClick={handleCapture} 
                className="col-span-2 group relative py-6 bg-[var(--primary)] text-black rounded-3xl transition-all duration-500 overflow-hidden shadow-[0_0_40px_rgba(0,255,136,0.2)]"
              >
                <div className="flex items-center justify-center gap-4 relative z-10">
                  <Scan className="size-6 animate-pulse" />
                  <span className="font-display font-black text-xs uppercase tracking-[0.4em]">
                    {lang === 'en' ? 'INITIATE_SCAN' : 'ಸ್ಕ್ಯಾನ್ ಪ್ರಾರಂಭಿಸಿ'}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 animate-pulse" />
              </button>
            )}

            <button
              onClick={() => fileInputRef.current?.click()}
              className="group relative h-28 bg-white/5 border border-white/10 hover:border-white/30 rounded-3xl transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-2 right-2 size-2 border-t border-r border-white/20" />
              <div className="absolute bottom-2 left-2 size-2 border-b border-l border-white/20" />
              <div className="flex flex-col items-center justify-center gap-2 relative z-10">
                <Upload className="size-6 text-white/40 group-hover:text-[var(--primary)] transition-colors duration-500" />
                <span className="font-display font-black text-[0.6rem] uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-colors duration-500">
                  {t.uploadBtn}
                </span>
              </div>
              <div className="absolute inset-0 bg-white/[0.02] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
            </button>
          </>
        ) : (
          <button
            onClick={clear}
            className="col-span-2 group relative py-6 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-500 rounded-3xl transition-all duration-500 flex items-center justify-center gap-4 overflow-hidden"
          >
            <RotateCcw className="size-5 group-hover:rotate-180 transition-transform duration-700" />
            <span className="font-display font-black text-xs uppercase tracking-[0.4em]">
              {t.retakeBtn}
            </span>
            <div className="absolute inset-0 bg-red-500/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
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
