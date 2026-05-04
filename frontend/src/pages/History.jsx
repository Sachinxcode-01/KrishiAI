import React, { useState, useEffect } from 'react';
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
    <div className="pt-24 px-6 max-w-[420px] mx-auto min-h-screen">
      {!selectedItem ? (
        <div className="animate-fade-in">
          {loading ? (
            <div className="flex justify-center p-20">
              <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
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
        </div>
      ) : (
        <div className="animate-fade-in">
          <button
            onClick={() => setSelectedItem(null)}
            className="mb-6 flex items-center gap-2 text-text/60 font-bold text-sm"
          >
            ⬅️ {lang === 'en' ? 'Back to History' : 'ಇತಿಹಾಸಕ್ಕೆ ಹಿಂತಿರುಗಿ'}
          </button>
          <ResultCard 
            lang={lang} 
            data={selectedItem} 
            onReset={() => setSelectedItem(null)} 
          />
        </div>
      )}
    </div>
  );
};

export default History;
