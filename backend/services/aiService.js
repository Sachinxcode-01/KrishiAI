const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');

dotenv.config();

const axios = require('axios');

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY);

// NVIDIA NIM Configuration
const NVIDIA_INVOKE_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
const NVIDIA_MODEL = "nvidia/nemotron-nano-12b-v2-vl";
const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;

const SYSTEM_PROMPT = `
You are Dr. KrishiAI, a senior agricultural scientist with 20+ years of experience 
in crop disease diagnosis across Karnataka, India. You specialize in identifying 
fungal, bacterial, viral, and pest-related diseases in Indian crops. 

Common Karnataka crops: Paddy (ಭತ್ತ), Ragi (ರಾಗಿ), Tomato (ಟೊಮ್ಯಾಟೊ), 
Sugarcane (ಕಬ್ಬು), Cotton (ಹತ್ತಿ), Groundnut (ಕಡಲೆ), Jowar (ಜೋಳ), Brinjal (ಬದನೆ).

RULES:
- Always diagnose in BOTH English and Kannada
- Use medicine names available in Indian markets (Mancozeb, Carbendazim, etc.)
- Treatment must be practical steps farmer can do TODAY
- OUTPUT ONLY VALID JSON. No extra text.

Schema:
{
  "cropName": string,
  "cropNameKannada": string,
  "diseaseName": string,
  "diseaseNameKannada": string,
  "severity": "Low" | "Medium" | "High" | "Not Diseased" | "Uncertain",
  "confidence": number,
  "description": string,
  "descriptionKannada": string,
  "causes": string,
  "causesKannada": string,
  "treatment": [string, string, string],
  "treatmentKannada": [string, string, string],
  "prevention": [string, string],
  "preventionKannada": [string, string],
  "medicineAdvice": string,
  "medicineAdviceKannada": string,
  "urgency": "Act immediately" | "Within 3 days" | "Can wait"
}
`;

/**
 * Primary Analysis using Gemini 2.0 Flash
 */
const analyzeWithGemini = async (base64Image, description) => {
  console.log(`[${new Date().toISOString()}] Calling Gemini AI (Vision)...`);
  const mimeType = base64Image.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || "image/jpeg";
  const data = base64Image.replace(/^data:image\/\w+;base64,/, "");

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `${SYSTEM_PROMPT}\n\nFarmer's Description: ${description || "Analyze this image for crop diseases."}\nReturn ONLY the raw JSON object.`;
  
  const imageParts = [{
    inlineData: { data, mimeType }
  }];

  const result = await model.generateContent([prompt, ...imageParts]);
  let text = result.response.text();
  return parseAIResponse(text);
};

/**
 * Deep Diagnostic Analysis using NVIDIA Nemotron Nano
 */
const analyzeWithNvidia = async (base64Image, description) => {
  console.log(`[${new Date().toISOString()}] Calling NVIDIA Nemotron (Deep Diagnostic)...`);
  
  const headers = {
    "Authorization": `Bearer ${NVIDIA_API_KEY}`,
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

  const payload = {
    "model": NVIDIA_MODEL,
    "messages": [
      {
        "role": "system",
        "content": "/think" // Enable reasoning mode
      },
      {
        "role": "user",
        "content": [
          { "type": "text", "text": `${SYSTEM_PROMPT}\n\nFarmer's Description: ${description || "Perform a deep analysis of this crop image."}\nReturn ONLY the raw JSON object.` },
          {
            "type": "image_url",
            "image_url": { "url": base64Image }
          }
        ]
      }
    ],
    "max_tokens": 4096,
    "temperature": 0.2 // Lower temperature for more consistent JSON
  };

  const response = await axios.post(NVIDIA_INVOKE_URL, payload, { headers });
  const text = response.data.choices[0].message.content;
  return parseAIResponse(text);
};

/**
 * Unified Analyze Image with Fallback Logic
 */
const analyzeImage = async (base64Image, description, mode = 'standard') => {
  try {
    if (mode === 'deep') {
      return await analyzeWithNvidia(base64Image, description);
    }
    
    // Try Gemini first, fallback to NVIDIA on failure
    try {
      return await analyzeWithGemini(base64Image, description);
    } catch (geminiError) {
      console.warn(`⚠️ Gemini failed: ${geminiError.message}. Switching to NVIDIA fallback.`);
      return await analyzeWithNvidia(base64Image, description);
    }
  } catch (error) {
    console.error('Unified AI Error:', error.message);
    throw error;
  }
};

/**
 * Helper to clean and parse AI JSON responses
 */
const parseAIResponse = (text) => {
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim();
  }
  return JSON.parse(cleaned);
};

const chatWithAssistant = async (question, context, lang, onChunk) => {
  try {
    console.log(`[${new Date().toISOString()}] Calling Gemini AI (Chat Streaming)...`);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const prompt = `System: You are Dr. KrishiAI agricultural assistant. Respond simply and helpfully. Max 2-3 short sentences.
    
Diagnosis Context: ${JSON.stringify(context || {})}
Farmer's Question: ${question}
Language requested: ${lang === 'kn' ? 'Kannada' : 'English'}`;

    const result = await model.generateContentStream(prompt);

    let fullText = '';
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullText += chunkText;
      if (onChunk) onChunk(chunkText);
    }

    return fullText;
  } catch (error) {
    console.error('Gemini Chat Error:', error.message);
    throw error;
  }
};

const diagnoseText = async (symptoms) => {
  try {
    console.log(`[${new Date().toISOString()}] Calling Gemini AI (Text Only)...`);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const prompt = `${SYSTEM_PROMPT}\n\nFarmer's Symptom Description: ${symptoms}\nIdentify the disease and provide a solution in the specified JSON format. Return ONLY the raw JSON object.`;
    
    const result = await model.generateContent(prompt);
    let text = result.response.text();
    return parseAIResponse(text);
  } catch (error) {
    console.error('Gemini Text AI Error:', error.message);
    throw error;
  }
};

module.exports = { analyzeImage, chatWithAssistant, diagnoseText };
