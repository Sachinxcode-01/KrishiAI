const OpenAI = require("openai");
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

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

const checkContentSafety = async (text, base64Image = null) => {
  try {
    console.log(`[${new Date().toISOString()}] Checking Content Safety (Nemotron-3)...`);
    
    const messages = [];
    if (base64Image) {
      messages.push({
        role: "user",
        content: [
          { type: "text", text: `Is this query and image safe? Query: ${text}` },
          { type: "image_url", image_url: { url: base64Image } }
        ]
      });
    } else {
      messages.push({ role: "user", content: text });
    }

    const response = await openai.chat.completions.create({
      model: "nvidia/nemotron-3-content-safety",
      messages: messages,
      max_tokens: 64,
      temperature: 0.1
    });

    const result = response.choices[0].message.content.toLowerCase();
    console.log(`[${new Date().toISOString()}] Safety Check Result: ${result}`);
    
    return result.includes("safe") && !result.includes("unsafe");
  } catch (error) {
    console.error('Safety Check Error:', error.message);
    return true; // Fail safe (allow) if the guardrail itself errors
  }
};

const analyzeImage = async (base64Image, description) => {
  try {
    // Content Safety Check
    const isSafe = await checkContentSafety(description || "Analyze this image", base64Image);
    if (!isSafe) {
      throw new Error("KrishiAI Safety Guard: The provided content contains unsafe or prohibited information.");
    }

    console.log(`[${new Date().toISOString()}] Calling NVIDIA AI (Vision)...`);
    
    // Ensure base64 image is in the correct format for NVIDIA (standard data URI)
    const response = await openai.chat.completions.create({
      model: process.env.NVIDIA_VISION_MODEL || "meta/llama-3.2-11b-vision-instruct",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: `${SYSTEM_PROMPT}\n\nFarmer's Description: ${description || "Analyze this image for crop diseases."}` },
            {
              type: "image_url",
              image_url: {
                url: base64Image, // NVIDIA supports data URIs
              },
            },
          ],
        },
      ],
      max_tokens: 1024,
      response_format: { type: "json_object" }
    });

    const text = response.choices[0].message.content.trim();
    console.log(`[${new Date().toISOString()}] NVIDIA Response received.`);
    return JSON.parse(text);
  } catch (error) {
    console.error('NVIDIA AI Error:', error.message);
    throw error;
  }
};

const chatWithAssistant = async (question, context, lang, onChunk) => {
  try {
    // Content Safety Check
    const isSafe = await checkContentSafety(question);
    if (!isSafe) {
      if (onChunk) onChunk("KrishiAI Safety Guard: This request cannot be fulfilled as it violates safety guidelines.");
      return "Unsafe content blocked.";
    }

    console.log(`[${new Date().toISOString()}] Calling NVIDIA AI (Chat Streaming: ${process.env.NVIDIA_CHAT_MODEL})...`);
    const stream = await openai.chat.completions.create({
      model: process.env.NVIDIA_CHAT_MODEL || "meta/llama-3.1-8b-instruct",
      messages: [
        {
          role: "system",
          content: "You are Dr. KrishiAI agricultural assistant. Respond simply and helpfully. Max 2-3 short sentences."
        },
        {
          role: "user",
          content: `Diagnosis Context: ${JSON.stringify(context)}\nFarmer's Question: ${question}\nLanguage: ${lang === 'kn' ? 'Kannada' : 'English'}`
        }
      ],
      max_tokens: 500,
      stream: true,
    });

    let fullText = '';
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      fullText += content;
      if (onChunk) onChunk(content);
    }

    return fullText;
  } catch (error) {
    console.error('NVIDIA Chat Error:', error.message);
    throw error;
  }
};

const diagnoseText = async (symptoms) => {
  try {
    // Content Safety Check
    const isSafe = await checkContentSafety(symptoms);
    if (!isSafe) {
      throw new Error("KrishiAI Safety Guard: The provided content contains unsafe or prohibited information.");
    }

    console.log(`[${new Date().toISOString()}] Calling NVIDIA AI (Text Only: ${process.env.NVIDIA_VISION_MODEL})...`);
    const response = await openai.chat.completions.create({
      model: process.env.NVIDIA_VISION_MODEL || "meta/llama-3.2-11b-vision-instruct",
      messages: [
        {
          role: "user",
          content: `${SYSTEM_PROMPT}\n\nFarmer's Symptom Description: ${symptoms}\nIdentify the disease and provide a solution in the specified JSON format.`
        }
      ],
      response_format: { type: "json_object" }
    });

    const text = response.choices[0].message.content.trim();
    return JSON.parse(text);
  } catch (error) {
    console.error('NVIDIA Text AI Error:', error.message);
    throw error;
  }
};

module.exports = { analyzeImage, chatWithAssistant, diagnoseText };
