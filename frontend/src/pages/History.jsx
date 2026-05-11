import { useState, useEffect } from 'react';
import { useHistory } from '../hooks/useHistory';
import HistoryCard from '../components/HistoryCard';
import ResultCard from '../components/ResultCard';
import { Search, Filter, Database, AlertCircle, Shield, Network } from 'lucide-react';

export default function HistoryPage() {
  const { history, loading, error, deleteHistoryItem } = useHistory();
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = history.filter(item => 
    item.diseaseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.cropName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-16 md:pb-20 px-[5%] md:px-[6%] relative">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="size-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono font-bold text-[0.65rem] tracking-[0.3em] text-[var(--primary)] uppercase block">
                Secured_Archive_v4.2
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white italic tracking-tighter uppercase leading-[0.85]">Diagnostic <br /><span className="text-primary">Intelligence</span></h1>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-[var(--text-dim)] group-focus-within:text-[var(--primary)] transition-colors" />
              <input 
                type="text" 
                placeholder="SEARCH_RECORDS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[var(--surface-deep)] border border-white/10 rounded-xl py-4 pl-12 pr-8 text-white text-[10px] font-black uppercase tracking-widest outline-none focus:border-[var(--primary)]/30 transition-all w-full sm:w-[350px] italic placeholder:text-white/10"
              />
            </div>
          </div>
        </div>

        {/* Tactical Summary HUD */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16">
          {[
            { label: 'Total_Scans', value: history.length, icon: Database },
            { label: 'Critical_Anomalies', value: history.filter(i => i.diseaseName !== 'Healthy').length, icon: AlertCircle, color: 'text-red-500' },
            { label: 'Success_Rate', value: '99.4%', icon: Shield },
            { label: 'Active_Nodes', value: '12', icon: Network }
          ].map((stat, i) => (
            <div key={i} className="card-premium p-3.5 sm:p-4 md:p-6 bg-surface/20 border-white/5 space-y-1.5 md:space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[7px] md:text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">{stat.label}</span>
                {stat.icon && <stat.icon className={`size-3 ${stat.color || 'text-primary/40'}`} />}
              </div>
              <p className={`text-lg md:text-2xl font-display font-black italic tracking-tighter ${stat.color || 'text-white'}`}>{stat.value}</p>
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
          <div className="glass-card p-20 flex flex-col items-center text-center">
            <AlertCircle className="size-16 text-red-500 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">Failed to load history</h3>
            <p className="text-[var(--muted)]">{error}</p>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="glass-card p-20 flex flex-col items-center text-center">
            <Database className="size-16 text-[var(--text-dim)] mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">No records found</h3>
            <p className="text-[var(--muted)] max-w-sm">
              Your diagnosis history is empty. Start analyzing your crops to see records here.
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
        <div className="fixed inset-0 z-[2000] bg-[#020B06]/98 flex items-start md:items-center justify-center p-4 md:p-6 overflow-y-auto">
          <div className="absolute top-6 right-6 md:top-8 md:right-8 z-[2010]">
            <button 
              onClick={() => setSelectedItem(null)}
              className="px-6 py-2 bg-white/10 text-white rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10"
            >
              Close Record
            </button>
          </div>
          <div className="w-full h-fit py-12 md:py-20">
            <ResultCard 
              lang={lang} 
              data={{ ...selectedItem, imageUrl: selectedItem.imageUrl || '/specimen.png' }} 
              onReset={() => setSelectedItem(null)} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
