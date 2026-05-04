const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');

dotenv.config();

// Using Google Gemini API Key provided by user
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

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
    console.log(`[${new Date().toISOString()}] Calling Google Gemini 1.5 Flash...`);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
    const mediaType = base64Image.match(/^data:(image\/\w+);base64,/)?.[1] || "image/jpeg";

    const prompt = `${SYSTEM_PROMPT}\n\nFarmer's Description: ${description || "Analyze this image for crop diseases."}`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: mediaType
        }
      }
    ]);

    const response = await result.response;
    const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    
    console.log(`[${new Date().toISOString()}] Gemini Response received.`);
    return JSON.parse(text);
  } catch (error) {
    console.error('Gemini AI Error:', error.message);
    throw new Error('Failed to analyze image with Gemini AI');
  }
};

const chatWithAssistant = async (question, context, lang) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
      You are Dr. KrishiAI agricultural assistant.
      Diagnosis Context: ${JSON.stringify(context)}
      Farmer's Question: ${question}
      Language: ${lang === 'kn' ? 'Kannada' : 'English'}
      
      Respond simply and helpfully. Max 2 short sentences.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Gemini Chat Error:', error.message);
    throw new Error('Assistant failed to respond');
  }
};

const diagnoseText = async (symptoms) => {
  try {
    console.log(`[${new Date().toISOString()}] Calling Google Gemini (Text Only)...`);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `${SYSTEM_PROMPT}\n\nFarmer's Symptom Description: ${symptoms}\nIdentify the disease and provide a solution in the specified JSON format.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(text);
  } catch (error) {
    console.error('Gemini Text AI Error:', error.message);
    throw new Error('Failed to identify disease from text');
  }
};

module.exports = { analyzeImage, chatWithAssistant, diagnoseText };
