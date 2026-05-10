import { useState, useEffect } from 'react';
import { Volume2, VolumeX, ShieldCheck, AlertCircle, Info, ChevronDown, Share2, Copy, RefreshCw, AlertTriangle, Zap, Leaf, Download, MessageSquare } from 'lucide-react';
import { useVoice } from '../hooks/useVoice';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ResultCard({ result, onReset }) {
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
      
      // Temporary style adjustments for PDF capture
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
    { id: 'summary', title: 'What We Found', icon: Info, content: result.description, kannada: result.descriptionKannada },
    { id: 'cause', title: 'Clinical Cause', icon: AlertTriangle, content: result.causes, kannada: result.causesKannada },
    { id: 'treatment', title: 'Treatment Protocol', icon: Zap, content: result.treatment, kannada: result.treatmentKannada },
    { id: 'medicine', title: 'Biomedical Advice', icon: AlertCircle, content: result.medicineAdvice, kannada: result.medicineAdviceKannada },
    { id: 'prevention', title: 'Prevention Strategy', icon: ShieldCheck, content: result.prevention, kannada: result.preventionKannada },
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
    <div className="result-card-anim glass-panel p-6 sm:p-10 lg:p-16 w-full max-w-5xl mx-auto relative overflow-hidden">
      {/* Aesthetic Backdrop */}
      <div className="absolute top-0 right-0 size-96 bg-[var(--primary)]/5 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full pointer-events-none" />
      
      {/* Header Section */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-6 md:gap-10 mb-10 md:mb-16">
        <div className="flex items-start gap-6 md:gap-8">
          <div className={`size-20 rounded-3xl flex items-center justify-center border-2 ${result.diseaseName === 'Healthy' ? 'border-[var(--primary)] bg-[var(--primary)]/10 shadow-[0_0_30px_rgba(0,255,135,0.2)]' : 'border-red-500/30 bg-red-500/10 shadow-[0_0_30px_rgba(239,68,68,0.2)]'}`}>
            {result.diseaseName === 'Healthy' ? <Leaf className="size-10 text-[var(--primary)]" /> : <AlertTriangle className="size-10 text-red-500" />}
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.65rem] font-bold tracking-[0.4em] text-[var(--muted)] uppercase">Diagnosis_Report</span>
              <div className="size-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
            </div>
            <h3 className="text-5xl md:text-6xl font-display font-black text-white uppercase italic tracking-tighter leading-none">
              {result.diseaseName}
            </h3>
            <p className="font-kannada text-2xl text-[var(--primary)] font-bold">
              {result.diseaseNameKannada}
            </p>
          </div>
        </div>

        <button 
          onClick={() => isSpeaking ? stop() : speak(`${result.diseaseName}. ${result.description}`)}
          className={`px-8 py-4 rounded-2xl flex items-center gap-4 border transition-all duration-500 group ${
            isSpeaking 
              ? 'bg-[var(--primary)] text-black border-[var(--primary)] shadow-[0_0_30px_var(--primary-glow)]' 
              : 'bg-white/5 text-[var(--primary)] border-[var(--primary)]/20 hover:bg-[var(--primary)]/10'
          }`}
        >
          <span className="font-mono text-[0.7rem] font-black uppercase tracking-[0.2em]">
            {isSpeaking ? 'Interrupt_Playback' : 'Execute_Audio_Link'}
          </span>
          {isSpeaking ? <VolumeX className="size-5 animate-pulse" /> : <Volume2 className="size-5 group-hover:scale-110 transition-transform" />}
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 relative z-10">
        {/* Left Col: Metadata */}
        <div className="lg:col-span-4 space-y-8">
          <div className="space-y-6 p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-3xl">
            <div className="space-y-4">
              <label className="font-mono text-[0.6rem] font-bold tracking-[0.3em] text-white/30 uppercase">Specimen_Classification</label>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-2xl">🌿</span>
                <span className="font-display font-black text-xl text-white uppercase tracking-tight">{result.cropName}</span>
              </div>
            </div>

            <div className="space-y-4">
              <label className="font-mono text-[0.6rem] font-bold tracking-[0.3em] text-white/30 uppercase">Anomalous_Severity</label>
              <div className={`flex items-center gap-3 p-4 rounded-2xl border ${getSeverityStyles(result.severity)}`}>
                <AlertCircle className="size-5" />
                <span className="font-display font-black text-xl uppercase tracking-tight">{result.severity}</span>
              </div>
            </div>

            {/* Confidence Visualization */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex justify-between items-end">
                <label className="font-mono text-[0.6rem] font-bold tracking-[0.3em] text-white/30 uppercase">AI_Certainty</label>
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

          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={handleDownloadPDF}
              disabled={isGeneratingPdf}
              className="w-full btn-premium !py-6 flex items-center justify-center gap-4 group bg-white/5 border-white/10 hover:bg-white/10"
            >
              {isGeneratingPdf ? (
                <RefreshCw className="size-5 animate-spin" />
              ) : (
                <Download className="size-5 group-hover:-translate-y-1 transition-transform" />
              )}
              <span>{isGeneratingPdf ? 'Generating_Report...' : 'Download_PDF_Report'}</span>
            </button>

            <button 
              onClick={() => {
                if (result.location) {
                  navigate('/outbreak-map', { state: { focusLocation: result.location } });
                } else {
                  navigate('/outbreak-map');
                }
              }}
              className="w-full btn-premium !py-6 flex items-center justify-center gap-4 group bg-primary/10 border-primary/20 hover:bg-primary/20 text-primary"
            >
              <Globe className="size-5 group-hover:rotate-180 transition-transform duration-1000" />
              <span>Locate_on_Command_Map</span>
            </button>

            <button 
              onClick={handleConsultAI}
              className="w-full btn-premium !py-6 flex items-center justify-center gap-4 group bg-white/5 border-white/10 hover:bg-white/10"
            >
              <MessageSquare className="size-5 group-hover:scale-110 transition-transform" />
              <span>Consult_AI_Expert</span>
            </button>

            <button 
              onClick={onReset}
              className="w-full btn-premium !py-6 flex items-center justify-center gap-4 group"
            >
              <RefreshCw className="size-5 group-hover:rotate-180 transition-transform duration-700" />
              <span>New_Specimen_Scan</span>
            </button>
          </div>
        </div>

        {/* Right Col: Details Accordion */}
        <div className="lg:col-span-8 space-y-4">
          {sections.map((section) => (
            <div key={section.id} className={`group border rounded-3xl transition-all duration-500 overflow-hidden ${openSection === section.id ? 'bg-white/[0.04] border-white/10' : 'bg-transparent border-white/5 hover:border-white/10'}`}>
              <button 
                onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                className="w-full flex items-center justify-between p-8 text-left"
              >
                <div className="flex items-center gap-6">
                  <div className={`size-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${openSection === section.id ? 'bg-[var(--primary)] text-black' : 'bg-white/5 text-white/40'}`}>
                    {(() => {
                      const Icon = section.icon;
                      return <Icon className="size-6" />;
                    })()}
                  </div>
                  <span className={`font-display font-black text-xl uppercase tracking-tighter transition-colors ${openSection === section.id ? 'text-white' : 'text-white/40'}`}>
                    {section.title}
                  </span>
                </div>
                <ChevronDown className={`size-6 text-white/20 transition-transform duration-500 ${openSection === section.id ? 'rotate-180 text-[var(--primary)]' : ''}`} />
              </button>
              
              {openSection === section.id && (
                <div className="px-8 pb-10 space-y-8 animate-fade-in">
                  <div className="h-px w-full bg-gradient-to-r from-white/10 via-transparent to-transparent" />
                  <p className="text-lg text-white/70 leading-relaxed font-sans">
                    {section.content}
                  </p>
                  <div className="p-8 rounded-[2rem] bg-[var(--primary)]/5 border border-[var(--primary)]/10 relative overflow-hidden group/kannada">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <span className="font-kannada text-4xl font-black">ಕನ್ನಡ</span>
                    </div>
                    <p className="font-kannada text-2xl text-white/90 font-medium leading-relaxed relative z-10">
                      {section.kannada}
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
              <Share2 className="size-4" /> Share_Data
            </button>
            <button 
              onClick={handleCopy}
              className="flex items-center justify-center gap-3 py-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all font-mono text-[0.7rem] font-bold tracking-widest uppercase text-white/60"
            >
              {copied ? <ShieldCheck className="size-4 text-[var(--primary)]" /> : <Copy className="size-4" />}
              {copied ? 'Data_Synced' : 'Copy_Log'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
