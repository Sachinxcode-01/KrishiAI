const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_KEY = process.env.NVIDIA_API_KEY;
const FOURCASTNET_URL = "https://climate.api.nvidia.com/v1/nvidia/fourcastnet";

/**
 * Weather Service to interact with NVIDIA FourCastNet
 * This model provides high-resolution global atmospheric dynamics predictions.
 */
const getGlobalForecast = async () => {
  try {
    console.log(`[${new Date().toISOString()}] Initiating FourCastNet Weather Inference...`);
    
    const headers = {
      "Authorization": `Bearer ${API_KEY}`,
      "NVCF-POLL-SECONDS": "5"
    };

    const payload = {
      "input_id": 0,
      "variables": "t2m,u10m,v10m", // Temperature and Wind
      "simulation_length": 6,
      "ensemble_size": 1,
      "noise_amplitude": 0,
    };

    // 1. Start the inference job
    const response = await axios.post(FOURCASTNET_URL, payload, { headers });
    
    if (response.status === 202) {
      const requestId = response.headers['nvcf-reqid'];
      console.log(`[${new Date().toISOString()}] Job accepted. ID: ${requestId}`);
      
      return {
        status: 'processing',
        requestId: requestId,
        message: 'Global weather simulation started.'
      };
    } else if (response.status === 200) {
      console.log(`[${new Date().toISOString()}] Job completed instantly.`);
      return {
        status: 'completed',
        data: response.data,
        message: 'Neural simulation complete.'
      };
    }

    return response.data;
  } catch (error) {
    console.error('FourCastNet API Error:', error.response?.data || error.message);
    throw new Error('Failed to initiate global weather forecast');
  }
};

module.exports = { getGlobalForecast };
