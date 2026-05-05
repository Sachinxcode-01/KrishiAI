const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_KEY = process.env.NVIDIA_API_KEY;
const RERANK_URL = "https://ai.api.nvidia.com/v1/retrieval/nvidia/llama-nemotron-rerank-vl-1b-v2/reranking";

/**
 * Rerank Service using NVIDIA Llama-Nemotron-Rerank-VL
 * Perfect for finding the most relevant disease from a knowledge base using both text and images.
 */
const rerankPassages = async (query, passages) => {
  try {
    console.log(`[${new Date().toISOString()}] Initiating NVIDIA Multimodal Reranking...`);
    
    const headers = {
      "Authorization": `Bearer ${API_KEY}`,
      "Accept": "application/json",
      "Content-Type": "application/json"
    };

    const payload = {
      model: "nvidia/llama-nemotron-rerank-vl-1b-v2",
      query: { text: query },
      passages: passages.map(p => ({
        text: p.text,
        image: p.image // Must be data:image/jpeg;base64,...
      }))
    };

    const response = await axios.post(RERANK_URL, payload, { headers });
    
    console.log(`[${new Date().toISOString()}] Reranking complete.`);
    return response.data;
  } catch (error) {
    console.error('NVIDIA Rerank Error:', error.response?.data || error.message);
    throw new Error('Failed to rerank passages with NVIDIA AI');
  }
};

module.exports = { rerankPassages };
