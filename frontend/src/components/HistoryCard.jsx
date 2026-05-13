import { useEffect, useState } from 'react';
import { Trash2, ExternalLink, Calendar, AlertTriangle } from 'lucide-react';
import { useHistory } from '../hooks/useHistory';

export default function HistoryCard({ item, onDelete, onView }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const getSeverityColor = (sev) => {
    switch (sev?.toLowerCase()) {
      case 'high': return 'text-[#EF4444] border-[#EF4444]/20';
      case 'medium': return 'text-[#F59E0B] border-[#F59E0B]/20';
      case 'low': return 'text-[#F5C842] border-[#F5C842]/20';
      default: return 'text-[var(--primary)] border-[var(--primary)]/20';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="glass-card p-4 group relative hover:translate-y-[-6px] transition-all duration-300">
      {/* Delete Button - Visible on mobile/touch, hover on desktop */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setShowConfirm(true);
        }}
        className="absolute top-3 right-3 md:top-4 md:right-4 size-9 md:size-10 rounded-full bg-red-500/10 text-red-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all flex items-center justify-center hover:bg-red-500 hover:text-white z-10 border border-red-500/20"
      >
        <Trash2 className="size-3.5 md:size-4" />
      </button>

      {/* Confirmation Overlay */}
      {showConfirm && (
        <div className="absolute inset-0 z-20 bg-[#020B06]/95 flex flex-col items-center justify-center p-6 text-center rounded-3xl animate-fade-in">
          <p className="text-white font-bold mb-4">Delete this record?</p>
          <div className="flex gap-4">
            <button 
              onClick={() => onDelete(item._id)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-bold"
            >
              Delete
            </button>
            <button 
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Image Preview */}
      <div 
        className="w-full aspect-square rounded-2xl overflow-hidden mb-6 cursor-pointer"
        onClick={() => onView(item)}
      >
        <img 
          src={item.imageUrl || '/specimen.png'} 
          alt={item.diseaseName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Info */}
      <div className="space-y-4 cursor-pointer" onClick={() => onView(item)}>
        <div className="flex justify-between items-start gap-4">
          <h4 className={`font-display font-bold text-lg text-white uppercase tracking-tight full-text ${lang === 'kn' ? 'font-kannada' : ''}`}>
            {item.diseaseName}
          </h4>
          <div className={`px-2 py-0.5 border rounded text-[10px] font-bold uppercase tracking-widest shrink-0 ${getSeverityColor(item.severity)}`}>
            {item.severity}
          </div>
        </div>

        <div className="flex items-center justify-between text-[var(--text-dim)] text-xs font-medium uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-3" /> {formatDate(item.created_at || item.createdAt)}
          </div>
          <div className="flex items-center gap-1.5 full-text">
            🌿 {item.cropName}
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
          <span className="font-kannada text-[var(--muted)] text-sm full-text text-neat">{item.diseaseNameKannada}</span>
          <ExternalLink className="size-4 text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
        </div>
      </div>
    </div>
  );
}
