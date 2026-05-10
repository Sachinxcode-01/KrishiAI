import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const useHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/history`);
      if (response.data.success) {
        setHistory(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to fetch history');
      }
    } catch (err) {
      console.error('History Fetch Error:', err);
      setError(err.message || 'Could not load history');
    } finally {
      setLoading(false);
    }
  };

  const deleteHistoryItem = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/history/${id}`);
      if (response.data.success) {
        setHistory(prev => prev.filter(item => item._id !== id));
        return true;
      }
      return false;
    } catch (err) {
      console.error('Delete Error:', err);
      return false;
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return {
    history,
    loading,
    error,
    fetchHistory,
    deleteHistoryItem
  };
};
