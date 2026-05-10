import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Use the standard backend API route which works correctly on Vercel deployment
export const analyzeImage = (image, description) => api.post('/analyze', { image, description });

  
export const getHistory = () => api.get('/history');
export const saveToHistory = (data) => api.post('/history/save', data);
export const deleteHistoryItem = (id) => api.delete(`/history/${id}`);
export const clearAllHistory = () => api.post('/history/clear');
export const getWeatherForecast = () => api.get('/weather/forecast');

// Chatbot API - Updated to support streaming
export const chatWithAssistant = async (question, context, lang, onChunk) => {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, context, lang })
  });

  if (!response.ok) throw new Error('Network response was not ok');

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split('\n');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') break;
        try {
          const parsed = JSON.parse(data);
          if (parsed.chunk) onChunk(parsed.chunk);
        } catch (e) {
          console.error('Error parsing stream chunk:', e);
        }
      }
    }
  }
};

export default api;
