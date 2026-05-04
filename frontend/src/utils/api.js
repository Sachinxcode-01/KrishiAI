import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const analyzeImage = (image, description) => api.post('/analyze', { image, description });
export const getHistory = () => api.get('/history');
export const saveToHistory = (data) => api.post('/history/save', data);
export const deleteHistoryItem = (id) => api.delete(`/history/${id}`);
export const clearAllHistory = () => api.post('/history/clear');

// Chatbot API
export const chatWithAssistant = (question, context, lang) => api.post('/chat', { question, context, lang });

export default api;
