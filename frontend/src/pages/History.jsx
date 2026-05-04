import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HistoryList from '../components/HistoryList';
import ResultCard from '../components/ResultCard';
import { getHistory, deleteHistoryItem, clearAllHistory } from '../utils/api';

const History = ({ lang }) => {
  const [history, setHistory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const response = await getHistory();
      if (response.data.success) {
        setHistory(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteHistoryItem(id);
      setHistory(history.filter(item => item._id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleClear = async () => {
    if (window.confirm(lang === 'en' ? 'Are you sure you want to clear all history?' : 'ನೀವು ನಿಜವಾಗಿಯೂ ಎಲ್ಲಾ ಇತಿಹಾಸವನ್ನು ಅಳಿಸಲು ಬಯಸುವಿರಾ?')) {
      try {
        await clearAllHistory();
        setHistory([]);
      } catch (error) {
        console.error('Clear failed:', error);
      }
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 px-4 pb-32 max-w-2xl mx-auto min-h-screen"
    >
      <AnimatePresence mode="wait">
        {!selectedItem ? (
          <motion.div 
            key="list"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between px-2 mb-8">
              <div>
                <h1 className="text-2xl font-black text-white">{lang === 'en' ? 'Diagnosis History' : 'ತಪಾಸಣೆ ಇತಿಹಾಸ'}</h1>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mt-1">
                  {history.length} {lang === 'en' ? 'Records Found' : 'ದಾಖಲೆಗಳು ಪತ್ತೆಯಾಗಿವೆ'}
                </p>
              </div>
              {history.length > 0 && (
                <button 
                  onClick={handleClear}
                  className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-all"
                >
                  {lang === 'en' ? 'Clear All' : 'ಎಲ್ಲವನ್ನೂ ಅಳಿಸಿ'}
                </button>
              )}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center p-20 space-y-4">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-widest text-muted">Retrieving Records...</p>
              </div>
            ) : (
              <HistoryList 
                lang={lang} 
                history={history} 
                onDelete={handleDelete}
                onClear={handleClear}
                onViewItem={setSelectedItem}
              />
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            className="space-y-6"
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="group flex items-center gap-3 text-muted hover:text-white transition-colors py-2 px-4 bg-white/[0.03] rounded-xl border border-white/5"
            >
              <span className="group-hover:-translate-x-1 transition-transform">⬅️</span>
              <span className="text-[10px] font-black uppercase tracking-widest">
                {lang === 'en' ? 'Back to History' : 'ಇತಿಹಾಸಕ್ಕೆ ಹಿಂತಿರುಗಿ'}
              </span>
            </button>
            
            <ResultCard 
              lang={lang} 
              data={selectedItem} 
              onReset={() => setSelectedItem(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default History;
