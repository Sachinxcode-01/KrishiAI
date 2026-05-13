import { useState, useRef } from 'react';
import { Upload, Camera, FileText, X, ImageIcon, Trash2, Zap } from 'lucide-react';

export default function UploadPanel({ onAnalyze, analyzing, lang }) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const fileInputRef = useRef(null);

  const [deepMode, setDeepMode] = useState(false);

  const handleFile = (selectedFile) => {
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const clearSelection = () => {
    setFile(null);
    setPreview(null);
    setDescription('');
  };

  return (
    <div className="glass-card p-6 md:p-8 lg:p-12 w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="size-3 rounded-full bg-[var(--primary)] animate-pulse" />
          <span className="font-display font-bold text-[0.7rem] tracking-[0.3em] text-[var(--primary)] uppercase">
            {lang === 'en' ? 'Specimen Selection' : 'ಮಾದರಿ ಆಯ್ಕೆ'}
          </span>
        </div>
        <div className="flex gap-2">
          <div className="size-2 rounded-full bg-[var(--primary)]" />
          <div className="size-2 rounded-full bg-white/10" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Upload Area */}
        <div className="space-y-6">
          <div 
            className={`relative group h-[300px] md:h-[380px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all duration-500 overflow-hidden ${
              dragActive ? 'border-[var(--primary)] bg-[var(--primary)]/5 scale-[0.99]' : 'border-white/10 bg-white/[0.02] hover:border-white/20'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {preview ? (
              <div className="relative w-full h-full p-4 animate-fade-in group/preview overflow-hidden">
                {/* Cinematic Viewfinder Overlay */}
                <div className="absolute inset-4 z-20 pointer-events-none">
                  {/* Corners */}
                  <div className="absolute top-0 left-0 size-8 border-t-2 border-l-2 border-[var(--primary)] shadow-[0_0_15px_var(--primary-glow)]" />
                  <div className="absolute top-0 right-0 size-8 border-t-2 border-r-2 border-[var(--primary)] shadow-[0_0_15px_var(--primary-glow)]" />
                  <div className="absolute bottom-0 left-0 size-8 border-b-2 border-l-2 border-[var(--primary)] shadow-[0_0_15px_var(--primary-glow)]" />
                  <div className="absolute bottom-0 right-0 size-8 border-b-2 border-r-2 border-[var(--primary)] shadow-[0_0_15px_var(--primary-glow)]" />
                  
                  {/* Center Crosshair */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-40">
                    <div className="w-8 h-[1px] bg-[var(--primary)]" />
                    <div className="w-[1px] h-8 bg-[var(--primary)] absolute" />
                  </div>

                  {/* Dynamic Telemetry */}
                  <div className="absolute top-4 left-4 space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="size-1.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-tactical !text-white opacity-90">LIVE_FEED: [OK]</span>
                    </div>
                    <span className="text-tactical !text-[0.5rem] block">ISO: 400 | EXP: 1/120</span>
                  </div>

                  <div className="absolute bottom-4 right-4 text-right">
                    <span className="text-tactical block">SCAN_RES: 4K_NEURAL</span>
                    <span className="text-tactical !text-[0.5rem] block opacity-40">TIMESTAMP: {new Date().toLocaleTimeString()}</span>
                  </div>

                  {/* Scan Line */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent animate-scan z-30" />
                </div>

                <div className="absolute inset-0 scanner-overlay opacity-30 z-10 pointer-events-none" />
                <img src={preview} className="w-full h-full object-cover rounded-2xl shadow-2xl scale-105 group-hover/preview:scale-110 transition-transform duration-1000 grayscale-[0.2]" alt="Preview" />
                
                <button 
                  onClick={clearSelection}
                  className="absolute top-8 right-8 size-12 rounded-full bg-black/60 backdrop-blur-xl flex items-center justify-center text-white hover:bg-red-500 transition-all z-40 opacity-0 group-hover/preview:opacity-100 border border-white/10"
                >
                  <Trash2 className="size-5" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6 p-8 text-center">
                <div className="size-20 bg-[var(--primary)]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_40px_rgba(0,255,135,0.05)]">
                  <Upload className="size-8 text-[var(--primary)]" />
                </div>
                <div>
                  <h4 className="font-display font-black text-2xl text-white uppercase tracking-tight mb-2">
                    {lang === 'en' ? 'Upload Photo' : 'ಫೋಟೋ ಅಪ್ಲೋಡ್ ಮಾಡಿ'}
                  </h4>
                  <p className="font-kannada font-bold text-[var(--muted)] text-lg">
                    {lang === 'en' ? 'Select a specimen to analyze' : 'ವಿಶ್ಲೇಷಿಸಲು ಮಾದರಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ'}
                  </p>
                </div>
                <p className="text-xs font-medium text-[var(--text-dim)] uppercase tracking-widest mt-2">JPEG, PNG up to 10MB</p>
              </div>
            )}
            
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={(e) => handleFile(e.target.files[0])}
              className="hidden" 
              accept="image/*"
            />
            
            {!preview && (
              <button 
                onClick={() => fileInputRef.current.click()}
                className="absolute inset-0 w-full h-full cursor-pointer z-0"
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => {
                fileInputRef.current.setAttribute('capture', 'environment');
                fileInputRef.current.click();
              }}
              className="group relative h-24 bg-white/5 border border-white/10 hover:bg-[var(--primary)] hover:border-[var(--primary)] rounded-3xl transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-2 left-2 size-2 border-t border-l border-white/20 group-hover:border-black/40" />
              <div className="flex flex-col items-center justify-center gap-1 relative z-10">
                <Camera className="size-5 text-[var(--primary)] group-hover:text-black transition-colors duration-500" />
                <span className="font-display font-black text-[0.6rem] uppercase tracking-[0.3em] text-white group-hover:text-black transition-colors duration-500">
                  {lang === 'en' ? 'Camera' : 'ಕ್ಯಾಮೆರಾ'}
                </span>
              </div>
            </button>
            <button 
              onClick={() => {
                fileInputRef.current.removeAttribute('capture');
                fileInputRef.current.click();
              }}
              className="group relative h-24 bg-white/5 border border-white/10 hover:border-white/30 rounded-3xl transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-2 right-2 size-2 border-t border-r border-white/20" />
              <div className="flex flex-col items-center justify-center gap-1 relative z-10">
                <ImageIcon className="size-5 text-white/40 group-hover:text-[var(--primary)] transition-colors duration-500" />
                <span className="font-display font-black text-[0.6rem] uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-colors duration-500">
                  {lang === 'en' ? 'Gallery' : 'ಗ್ಯಾಲರಿ'}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Right: Details Area */}
        <div className="flex flex-col h-full">
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <label className="flex items-center gap-3 font-display font-bold text-[0.7rem] tracking-[0.25em] text-[var(--text-dim)] uppercase">
                <FileText className="size-4" /> {lang === 'en' ? 'Description (Optional)' : 'ವಿವರಣೆ (ಐಚ್ಛಿಕ)'}
              </label>
              <textarea 
                placeholder={lang === 'en' ? "Briefly describe the symptoms..." : "ರೋಗದ ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ..."}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-[180px] bg-white/5 border border-white/10 rounded-2xl p-6 text-white/90 text-lg placeholder:text-white/40 outline-none focus:border-[var(--primary)] focus:bg-white/10 focus:shadow-[0_0_20px_rgba(0,255,135,0.1)] transition-all resize-none"
              />
            </div>

            {/* Deep Mode Toggle */}
            <div 
              onClick={() => setDeepMode(!deepMode)}
              className={`p-4 md:p-6 rounded-2xl border transition-all duration-500 cursor-pointer group/deep
                ${deepMode 
                  ? 'bg-[var(--primary)]/10 border-[var(--primary)]/40 shadow-[0_0_30px_rgba(0,255,135,0.1)]' 
                  : 'bg-white/5 border-white/10 hover:border-white/20'}
              `}
            >
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className={`size-7 md:size-8 rounded-lg flex items-center justify-center transition-colors duration-500
                    ${deepMode ? 'bg-[var(--primary)] text-black' : 'bg-white/5 text-white/40'}
                  `}>
                    <Zap className={`size-3 md:size-4 ${deepMode ? 'fill-current' : ''}`} />
                  </div>
                  <div className="flex flex-col">
                    <span className={`font-display font-bold text-[0.55rem] md:text-[0.65rem] tracking-[0.2em] uppercase transition-colors
                      ${deepMode ? 'text-[var(--primary)]' : 'text-white'}
                    `}>{lang === 'en' ? 'Deep Diagnostic Mode' : 'ಆಳವಾದ ರೋಗನಿರ್ಣಯ ಮೋಡ್'}</span>
                    <span className="font-mono text-[0.45rem] md:text-[0.5rem] opacity-40 uppercase tracking-widest">NVIDIA_NEMOTRON_12B</span>
                  </div>
                </div>
                <div className={`w-8 h-4 md:w-10 md:h-5 rounded-full p-1 transition-colors duration-500 ${deepMode ? 'bg-[var(--primary)]' : 'bg-white/10'}`}>
                  <div className={`size-2 md:size-3 rounded-full bg-white transition-transform duration-500 ${deepMode ? 'translate-x-4 md:translate-x-5' : 'translate-x-0'}`} />
                </div>
              </div>
              <p className="text-[9px] md:text-[10px] text-[var(--muted)] font-medium leading-relaxed uppercase tracking-[0.05em]">
                {deepMode 
                  ? (lang === 'en' ? 'Advanced multi-stage reasoning enabled. Slower but high-precision analysis.' : 'ಸುಧಾರಿತ ವಿಶ್ಲೇಷಣೆ ಸಕ್ರಿಯವಾಗಿದೆ. ನಿಧಾನ ಆದರೆ ನಿಖರ.') 
                  : (lang === 'en' ? 'Fast standard analysis enabled. Best for clear single-image diagnosis.' : 'ವೇಗದ ವಿಶ್ಲೇಷಣೆ ಸಕ್ರಿಯವಾಗಿದೆ. ಸ್ಪಷ್ಟ ಚಿತ್ರಗಳಿಗೆ ಉತ್ತಮ.')}
              </p>
            </div>
          </div>

          <button 
            disabled={!file || analyzing}
            onClick={() => onAnalyze(file, description, deepMode ? 'deep' : 'standard')}
            className={`group w-full py-5 md:py-7 mt-6 md:mt-8 rounded-3xl font-display font-black text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] transition-all duration-700 relative overflow-hidden border-2
              ${!file || analyzing 
                ? 'bg-white/5 text-white/50 border-white/10 cursor-not-allowed' 
                : 'bg-[var(--primary)] text-black border-[var(--primary)] shadow-[0_0_50px_rgba(0,255,135,0.3)] hover:shadow-[0_0_80px_rgba(0,255,135,0.5)]'}
            `}
          >
            {!analyzing && file && (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent h-1/2 w-full z-0 animate-scan" />
            )}

            <div className="relative z-10 flex flex-col items-center gap-1">
              <div className="flex items-center justify-center gap-4">
                {analyzing ? (
                  <>
                    <span className="size-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    <span>{lang === 'en' ? 'Processing...' : 'ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ...'}</span>
                  </>
                ) : (
                  <>
                    <Zap className="size-5 fill-current transition-transform group-hover:scale-125 duration-500" />
                    <span>{lang === 'en' ? 'Execute Analysis' : 'ವಿಶ್ಲೇಷಣೆ ನಡೆಸಿ'}</span>
                  </>
                )}
              </div>
              <span className="font-mono text-[0.5rem] opacity-40 tracking-[0.5em] font-bold">
                {analyzing ? 'NEURAL_LINK_ESTABLISHED' : 'READY_FOR_INFERENCE'}
              </span>
            </div>

            {/* Decorative Corners */}
            <div className="absolute top-2 left-2 size-2 border-t-2 border-l-2 border-black/20" />
            <div className="absolute top-2 right-2 size-2 border-t-2 border-r-2 border-black/20" />
            <div className="absolute bottom-2 left-2 size-2 border-b-2 border-l-2 border-black/20" />
            <div className="absolute bottom-2 right-2 size-2 border-b-2 border-r-2 border-black/20" />
          </button>
        </div>
      </div>
    </div>
  );
}
