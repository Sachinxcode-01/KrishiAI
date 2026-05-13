import { useState, useEffect } from 'react';
import { Volume2, VolumeX, ShieldCheck, AlertCircle, Info, ChevronDown, Share2, Copy, RefreshCw, AlertTriangle, Zap, Leaf, Download, MessageSquare, Globe } from 'lucide-react';
import { useVoice } from '../hooks/useVoice';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ResultCard({ result, onReset, lang }) {
  const { speak, stop, isSpeaking } = useVoice();
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState('summary');
  const [copied, setCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useEffect(() => {
    const { gsap } = window;
    if (!gsap) return;

    gsap.fromTo('.result-card-anim', 
      { scale: 0.95, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }
    );
  }, []);

  const handleCopy = () => {
    const text = `Krishi AI Diagnosis:\nCrop: ${result.cropName}\nDisease: ${result.diseaseName}\nSeverity: ${result.severity}\nTreatment: ${result.treatment}\nPrevention: ${result.prevention}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const text = encodeURIComponent(`Krishi AI Diagnosis: ${result.diseaseName} detected on ${result.cropName}. Severity: ${result.severity}. View details at Krishi AI App.`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      const card = document.querySelector('.result-card-anim');
      
      const originalStyle = card.style.cssText;
      card.style.maxWidth = '800px';
      
      const canvas = await html2canvas(card, {
        backgroundColor: '#020B06',
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      doc.save(`Krishi_AI_Report_${result.diseaseName.replace(/\s+/g, '_')}.pdf`);
      
      card.style.cssText = originalStyle;
    } catch (error) {
      console.error('PDF Generation Error:', error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleConsultAI = () => {
    navigate('/chat');
  };

  const sections = [
    { 
      id: 'summary', 
      title: lang === 'en' ? 'What We Found' : 'ನಾವು ಕಂಡುಕೊಂಡದ್ದು', 
      icon: Info, 
      content: result.description, 
      kannada: result.descriptionKannada 
    },
    { 
      id: 'cause', 
      title: lang === 'en' ? 'Clinical Cause' : 'ರೋಗದ ಕಾರಣ', 
      icon: AlertTriangle, 
      content: result.causes, 
      kannada: result.causesKannada 
    },
    { 
      id: 'treatment', 
      title: lang === 'en' ? 'Treatment Protocol' : 'ಚಿಕಿತ್ಸಾ ಕ್ರಮಗಳು', 
      icon: Zap, 
      content: result.treatment, 
      kannada: result.treatmentKannada 
    },
    { 
      id: 'medicine', 
      title: lang === 'en' ? 'Biomedical Advice' : 'ಔಷಧೋಪಚಾರದ ಸಲಹೆ', 
      icon: AlertCircle, 
      content: result.medicineAdvice, 
      kannada: result.medicineAdviceKannada 
    },
    { 
      id: 'prevention', 
      title: lang === 'en' ? 'Prevention Strategy' : 'ತಡೆಗಟ್ಟುವ ಕ್ರಮಗಳು', 
      icon: ShieldCheck, 
      content: result.prevention, 
      kannada: result.preventionKannada 
    },
  ];

  const getSeverityStyles = (sev) => {
    switch (sev?.toLowerCase()) {
      case 'high': return 'text-red-400 bg-red-400/10 border-red-400/20 shadow-[0_0_20px_rgba(248,113,113,0.1)]';
      case 'medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/20 shadow-[0_0_20px_rgba(251,191,36,0.1)]';
      case 'low': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20 shadow-[0_0_20px_rgba(250,204,21,0.1)]';
      case 'not diseased': return 'text-[var(--primary)] bg-[var(--primary)]/10 border-[var(--primary)]/20 shadow-[0_0_20px_rgba(0,255,135,0.1)]';
      default: return 'text-white/40 bg-white/5 border-white/10';
    }
  };

  return (
    <div className="result-card-anim glass-panel p-6 md:p-10 lg:p-16 w-full max-w-5xl mx-auto relative overflow-hidden">
      {/* Aesthetic Backdrop */}
      <div className="absolute top-0 right-0 size-96 bg-[var(--primary)]/5 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full pointer-events-none" />
      
      {/* Header Section */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-10 mb-10 md:mb-16">
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 md:gap-8 w-full md:w-auto">
          <div className={`size-20 md:size-24 rounded-2xl md:rounded-3xl flex items-center justify-center border-2 shrink-0 ${result.diseaseName === 'Healthy' ? 'border-[var(--primary)] bg-[var(--primary)]/10 shadow-[0_0_30px_rgba(0,255,135,0.2)]' : 'border-red-500/30 bg-red-500/10 shadow-[0_0_30px_rgba(239,68,68,0.2)]'}`}>
            {result.diseaseName === 'Healthy' ? <Leaf className="size-10 md:size-12 text-[var(--primary)]" /> : <AlertTriangle className="size-10 md:size-12 text-red-500" />}
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <span className="font-mono text-[0.6rem] md:text-[0.65rem] font-bold tracking-[0.4em] text-[var(--muted)] uppercase">
                {lang === 'en' ? 'Diagnosis_Report' : 'ರೋಗನಿರ್ಣಯ_ವರದಿ'}
              </span>
              <div className="size-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
            </div>
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white uppercase italic tracking-tighter leading-[0.85]">
              {lang === 'en' ? result.diseaseName : result.diseaseNameKannada}
            </h3>
            {lang === 'en' && result.diseaseNameKannada && (
              <p className="font-kannada text-xl md:text-2xl text-[var(--primary)] font-bold">
                {result.diseaseNameKannada}
              </p>
            )}
          </div>
        </div>

        <button 
          onClick={() => isSpeaking ? stop() : speak(`${lang === 'en' ? result.diseaseName : result.diseaseNameKannada}. ${lang === 'en' ? result.description : result.descriptionKannada}`)}
          className={`w-full md:w-auto px-6 md:px-8 py-4 rounded-2xl flex items-center justify-center gap-4 border transition-all duration-500 group ${
            isSpeaking 
              ? 'bg-[var(--primary)] text-black border-[var(--primary)] shadow-[0_0_30px_var(--primary-glow)]' 
              : 'bg-white/5 text-[var(--primary)] border-[var(--primary)]/20 hover:bg-[var(--primary)]/10'
          }`}
        >
          <span className="font-mono text-[0.65rem] md:text-[0.7rem] font-black uppercase tracking-[0.2em]">
            {isSpeaking ? (lang === 'en' ? 'Interrupt_Playback' : 'ಪ್ಲೇಬ್ಯಾಕ್_ನಿಲ್ಲಿಸಿ') : (lang === 'en' ? 'Execute_Audio_Link' : 'ಆಡಿಯೋ_ಲಿಂಕ್_ಪ್ರಾರಂಭಿಸಿ')}
          </span>
          {isSpeaking ? <VolumeX className="size-5 animate-pulse" /> : <Volume2 className="size-5 group-hover:scale-110 transition-transform" />}
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 relative z-10">
        {/* Left Col: Metadata */}
        <div className="lg:col-span-4 space-y-8">
          <div className="space-y-6 p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-3xl">
            <div className="space-y-4">
              <label className="font-mono text-[0.6rem] font-bold tracking-[0.3em] text-white/30 uppercase">
                {lang === 'en' ? 'Specimen_Classification' : 'ಮಾದರಿ_ವರ್ಗೀಕರಣ'}
              </label>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-2xl">🌿</span>
                <span className="font-display font-black text-xl text-white uppercase tracking-tight">
                  {lang === 'en' ? result.cropName : (result.cropNameKannada || result.cropName)}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <label className="font-mono text-[0.6rem] font-bold tracking-[0.3em] text-white/30 uppercase">
                {lang === 'en' ? 'Anomalous_Severity' : 'ರೋಗದ_ತೀವ್ರತೆ'}
              </label>
              <div className={`flex items-center gap-3 p-4 rounded-2xl border ${getSeverityStyles(result.severity)}`}>
                <AlertCircle className="size-5" />
                <span className="font-display font-black text-xl uppercase tracking-tight">{result.severity}</span>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex justify-between items-end">
                <label className="font-mono text-[0.6rem] font-bold tracking-[0.3em] text-white/30 uppercase">
                  {lang === 'en' ? 'AI_Certainty' : 'AI_ಖಚಿತತೆ'}
                </label>
                <span className="font-display font-black text-2xl text-[var(--primary)]">{result.confidence}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] shadow-[0_0_15px_var(--primary)]"
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <button 
              onClick={handleDownloadPDF}
              disabled={isGeneratingPdf}
              className="w-full btn-premium !py-5 md:!py-6 flex items-center justify-center gap-4 group bg-white/5 border-white/10 hover:bg-white/10"
            >
              {isGeneratingPdf ? (
                <RefreshCw className="size-5 animate-spin" />
              ) : (
                <Download className="size-5 group-hover:-translate-y-1 transition-transform" />
              )}
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">
                {isGeneratingPdf ? (lang === 'en' ? 'Generating_Report...' : 'ವರದಿ_ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...') : (lang === 'en' ? 'Download_PDF_Report' : 'PDF_ವರದಿ_ಡೌನ್ಲೋಡ್')}
              </span>
            </button>
            
            <button 
              onClick={() => navigate('/map', { state: { focusLocation: result.location } })}
              className="w-full btn-premium !py-5 md:!py-6 flex items-center justify-center gap-4 group bg-primary/10 border-primary/20 hover:bg-primary/20 text-primary"
            >
              <Globe className="size-5 group-hover:rotate-180 transition-transform duration-1000" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">
                {lang === 'en' ? 'Locate_on_Command_Map' : 'ಮ್ಯಾಪ್ನಲ್ಲಿ_ನೋಡಿ'}
              </span>
            </button>

            <button 
              onClick={handleConsultAI}
              className="w-full btn-premium !py-5 md:!py-6 flex items-center justify-center gap-4 group bg-white/5 border-white/10 hover:bg-white/10"
            >
              <MessageSquare className="size-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">
                {lang === 'en' ? 'Consult_AI_Expert' : 'AI_ಸಲಹೆಗಾರರನ್ನು_ಕೇಳಿ'}
              </span>
            </button>

            <button 
              onClick={onReset}
              className="w-full btn-premium !py-5 md:!py-6 flex items-center justify-center gap-4 group"
            >
              <RefreshCw className="size-5 group-hover:rotate-180 transition-transform duration-700" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">
                {lang === 'en' ? 'New_Specimen_Scan' : 'ಹೊಸ_ಮಾದರಿ_ಸ್ಕ್ಯಾನ್'}
              </span>
            </button>
          </div>
        </div>

        {/* Right Col: Details Accordion */}
        <div className="lg:col-span-8 space-y-4">
          {sections.map((section) => (
            <div key={section.id} className={`group border rounded-2xl md:rounded-3xl transition-all duration-500 overflow-hidden ${openSection === section.id ? 'bg-white/[0.04] border-white/10' : 'bg-transparent border-white/5 hover:border-white/10'}`}>
              <button 
                onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className={`size-10 md:size-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-500 ${openSection === section.id ? 'bg-[var(--primary)] text-black' : 'bg-white/5 text-white/40'}`}>
                    {(() => {
                      const Icon = section.icon;
                      return <Icon className="size-5 md:size-6" />;
                    })()}
                  </div>
                  <span className={`font-display font-black text-lg md:text-xl uppercase tracking-tighter transition-colors ${openSection === section.id ? 'text-white' : 'text-white/40'}`}>
                    {section.title}
                  </span>
                </div>
                <ChevronDown className={`size-5 md:size-6 text-white/20 transition-transform duration-500 ${openSection === section.id ? 'rotate-180 text-[var(--primary)]' : ''}`} />
              </button>
              
              {openSection === section.id && (
                <div className="px-6 md:px-8 pb-8 md:pb-10 space-y-6 md:space-y-8 animate-fade-in">
                  <div className="h-px w-full bg-gradient-to-r from-white/10 via-transparent to-transparent" />
                  
                  {/* Primary Language View */}
                  <p className={`text-lg md:text-xl text-white/90 text-neat full-text ${lang === 'kn' ? 'font-kannada font-medium' : 'font-sans'}`}>
                    {lang === 'en' ? section.content : section.kannada}
                  </p>

                  {/* Secondary/Regional View (Optional toggle or always show smaller) */}
                  <div className="p-6 md:p-8 rounded-2xl md:rounded-[2rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group/secondary">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.3em]">
                        {lang === 'en' ? 'REGIONAL_ADVISORY' : 'ENGLISH_PROTOCOL'}
                      </span>
                    </div>
                    <p className={`text-base md:text-lg text-white/50 text-neat full-text ${lang === 'en' ? 'font-kannada' : 'font-sans italic'}`}>
                      {lang === 'en' ? section.kannada : section.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Social Actions */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <button 
              onClick={handleShare}
              className="flex items-center justify-center gap-3 py-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all font-mono text-[0.7rem] font-bold tracking-widest uppercase text-white/60"
            >
              <Share2 className="size-4" /> {lang === 'en' ? 'Share_Data' : 'ಹಂಚಿಕೊಳ್ಳಿ'}
            </button>
            <button 
              onClick={handleCopy}
              className="flex items-center justify-center gap-3 py-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all font-mono text-[0.7rem] font-bold tracking-widest uppercase text-white/60"
            >
              {copied ? <ShieldCheck className="size-4 text-[var(--primary)]" /> : <Copy className="size-4" />}
              {copied ? (lang === 'en' ? 'Data_Synced' : 'ಸಿಂಕ್ ಆಗಿದೆ') : (lang === 'en' ? 'Copy_Log' : 'ಕಾಪಿ ಮಾಡಿ')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
