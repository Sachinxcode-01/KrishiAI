const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');

dotenv.config();

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY);

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

const analyzeImage = async (base64Image, description) => {
  try {
    console.log(`[${new Date().toISOString()}] Calling Gemini AI (Vision)...`);
    
    // Parse the data URI to extract mimeType and base64 string
    const mimeType = base64Image.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || "image/jpeg";
    const data = base64Image.replace(/^data:image\/\w+;base64,/, "");

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `${SYSTEM_PROMPT}\n\nFarmer's Description: ${description || "Analyze this image for crop diseases."}\nReturn ONLY the raw JSON object.`;
    
    const imageParts = [{
      inlineData: {
        data,
        mimeType
      }
    }];

    const result = await model.generateContent([prompt, ...imageParts]);
    let text = result.response.text();
    
    // Clean up potential markdown formatting from Gemini
    text = text.trim();
    if (text.startsWith('```json')) {
        text = text.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (text.startsWith('```')) {
        text = text.replace(/^```/, '').replace(/```$/, '').trim();
    }

    console.log(`[${new Date().toISOString()}] Gemini Vision Response received.`);
    return JSON.parse(text);
  } catch (error) {
    console.error('Gemini AI Error:', error.message);
    throw error;
  }
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
    
    // Clean up potential markdown formatting from Gemini
    text = text.trim();
    if (text.startsWith('```json')) {
        text = text.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (text.startsWith('```')) {
        text = text.replace(/^```/, '').replace(/```$/, '').trim();
    }

    return JSON.parse(text);
  } catch (error) {
    console.error('Gemini Text AI Error:', error.message);
    throw error;
  }
};

module.exports = { analyzeImage, chatWithAssistant, diagnoseText };
