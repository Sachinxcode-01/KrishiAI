import { useState, useEffect } from 'react';
import { useHistory } from '../hooks/useHistory';
import HistoryCard from '../components/HistoryCard';
import ResultCard from '../components/ResultCard';
import { Search, Filter, Database, AlertCircle, Shield, Network } from 'lucide-react';

export default function HistoryPage({ lang }) {
  const { history, loading, error, deleteHistoryItem } = useHistory();
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = history.filter(item => 
    item.diseaseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.cropName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-28 md:pt-40 pb-32 px-[5%] md:px-[6%] relative">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-[var(--primary)] animate-pulse" />
              <span className="font-mono font-black text-[0.65rem] tracking-[0.4em] text-[var(--primary)] uppercase">
                Secured_Archive_v4.2
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-black text-white italic tracking-tighter uppercase leading-[0.85]">
              {lang === 'en' ? 'Diagnostic' : 'ರೋಗನಿರ್ಣಯ'}<br />
              <span className="text-[var(--primary)]">{lang === 'en' ? 'Intelligence' : 'ಬುದ್ಧಿವಂತಿಕೆ'}</span>
            </h1>
          </div>

          <div className="w-full md:w-auto">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-white/20 group-focus-within:text-[var(--primary)] transition-colors" />
              <input 
                type="text" 
                placeholder={lang === 'en' ? "SEARCH_RECORDS..." : "ಹುಡುಕಾಟ..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-2xl py-4 md:py-5 pl-14 md:pl-16 pr-8 text-white text-[10px] md:text-xs font-black uppercase tracking-widest outline-none focus:border-[var(--primary)]/40 transition-all w-full md:w-[400px] italic placeholder:text-white/10"
              />
            </div>
          </div>
        </div>

        {/* Tactical Summary HUD */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-24">
          {[
            { label: lang === 'en' ? 'Total_Scans' : 'ಒಟ್ಟು_ತಪಾಸಣೆ', value: history.length, icon: Database },
            { label: lang === 'en' ? 'Critical_Anomalies' : 'ಗಂಭೀರ_ದೋಷಗಳು', value: history.filter(i => i.diseaseName !== 'Healthy').length, icon: AlertCircle, color: 'text-red-500' },
            { label: lang === 'en' ? 'Success_Rate' : 'ಯಶಸ್ಸಿನ_ದರ', value: '99.4%', icon: Shield },
            { label: lang === 'en' ? 'Active_Nodes' : 'ಸಕ್ರಿಯ_ನೋಡ್‌ಗಳು', value: '12', icon: Network }
          ].map((stat, i) => (
            <div key={i} className="glass-card p-5 md:p-8 space-y-3 md:space-y-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {stat.icon && <stat.icon className="size-8 md:size-12" />}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[7px] md:text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">{stat.label}</span>
              </div>
              <p className={`text-xl md:text-4xl font-display font-black italic tracking-tighter ${stat.color || 'text-white'}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass-card h-[400px] animate-pulse bg-white/5" />
            ))}
          </div>
        ) : error ? (
          <div className="glass-card p-12 md:p-20 flex flex-col items-center text-center">
            <AlertCircle className="size-12 md:size-16 text-red-500 mb-6" />
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{lang === 'en' ? 'Failed to load history' : 'ಇತಿಹಾಸ ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ'}</h3>
            <p className="text-[var(--muted)] text-sm md:text-base">{error}</p>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="glass-card p-12 md:p-20 flex flex-col items-center text-center">
            <Database className="size-12 md:size-16 text-[var(--text-dim)] mb-6" />
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 uppercase tracking-tight">{lang === 'en' ? 'No records found' : 'ಯಾವುದೇ ದಾಖಲೆಗಳಿಲ್ಲ'}</h3>
            <p className="text-[var(--muted)] text-sm md:text-base max-w-sm">
              {lang === 'en' 
                ? 'Your diagnosis history is empty. Start analyzing your crops to see records here.' 
                : 'ನಿಮ್ಮ ರೋಗನಿರ್ಣಯದ ಇತಿಹಾಸ ಖಾಲಿಯಿದೆ. ಇಲ್ಲಿ ದಾಖಲೆಗಳನ್ನು ನೋಡಲು ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಲು ಪ್ರಾರಂಭಿಸಿ.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredHistory.map((item) => (
              <HistoryCard 
                key={item._id} 
                item={item} 
                onDelete={deleteHistoryItem}
                onView={setSelectedItem}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal for viewing full diagnosis */}
      {selectedItem && (
        <div className="fixed inset-0 z-[2000] bg-[#020B06]/98 flex items-start md:items-center justify-center p-2 md:p-6 overflow-y-auto">
          <div className="absolute top-4 right-4 md:top-8 md:right-8 z-[2010]">
            <button 
              onClick={() => setSelectedItem(null)}
              className="px-5 md:px-6 py-2 bg-white/10 text-white rounded-full font-bold uppercase tracking-widest text-[9px] md:text-xs hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10"
            >
              {lang === 'en' ? 'Close Record' : 'ದಾಖಲೆಯನ್ನು ಮುಚ್ಚಿ'}
            </button>
          </div>
          <div className="w-full h-fit py-10 md:py-20">
            <ResultCard 
              lang={lang} 
              result={{ ...selectedItem, imageUrl: selectedItem.imageUrl || '/specimen.png' }} 
              onReset={() => setSelectedItem(null)} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
