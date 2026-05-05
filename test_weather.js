const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config({ path: './backend/.env' });

const API_KEY = process.env.NVIDIA_API_KEY || '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';
const FOURCASTNET_URL = "https://climate.api.nvidia.com/v1/nvidia/fourcastnet";

async function testWeather() {
  console.log("🚀 Testing NVIDIA FourCastNet (Climate Intelligence)...");
  
  try {
    const headers = {
      "Authorization": `Bearer ${API_KEY}`,
      "NVCF-POLL-SECONDS": "5"
    };

    const payload = {
      "input_id": 0,
      "variables": "w10m",
      "simulation_length": 1,
      "ensemble_size": 1,
      "noise_amplitude": 0,
    };

    console.log("📡 Sending inference request to Climate API...");
    const response = await axios.post(FOURCASTNET_URL, payload, { headers });
    
    if (response.status === 202) {
      const requestId = response.headers['nvcf-reqid'];
      console.log(`✅ Success! Job Accepted.`);
      console.log(`🆔 Request ID: ${requestId}`);
      console.log(`📝 Status: The NVIDIA DGX Cloud is now running the global weather simulation.`);
      console.log(`🌟 FourCastNet integration is working correctly!`);
    } else if (response.status === 200) {
      console.log("✅ Success! Job Completed Instantly.");
      console.log("📦 Data received.");
    } else {
      console.log(`⚠️ Unexpected Response Code: ${response.status}`);
    }

  } catch (error) {
    console.error("❌ Weather Test Failed!");
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error("Data:", error.response.data);
    } else {
      console.error("Error Message:", error.message);
    }
  }
}

testWeather();
