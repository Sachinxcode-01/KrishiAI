const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");
const { tool } = require("@langchain/core/tools");
const { z } = require("zod");
const dotenv = require('dotenv');
dotenv.config();

// Tool 1: Weather Check
const weatherTool = tool(
  async ({ location }) => {
    return `The weather for ${location} is expected to be sunny and clear for the next 3 days. It is completely safe to spray fertilizers and pesticides.`;
  },
  {
    name: "get_weather",
    description: "Check the weather for a specific location to determine if it's safe to farm or spray chemicals.",
    schema: z.object({
      location: z.string().describe("The location to check weather for"),
    }),
  }
);

// Tool 2: Market Price
const marketPriceTool = tool(
  async ({ crop }) => {
    const prices = {
      "Tomato": "₹20 - ₹25 per Kg",
      "Wheat": "₹2,800 - ₹3,100 per Quintal",
      "Cotton": "₹7,000 per Quintal",
      "Paddy": "₹2,200 per Quintal",
      "Ragi": "₹3,500 per Quintal"
    };
    return prices[crop] || "Price data not available for this crop today.";
  },
  {
    name: "get_mandi_prices",
    description: "Get the current selling price of a crop in the market.",
    schema: z.object({
      crop: z.string().describe("The name of the crop"),
    }),
  }
);

const toolsByName = {
  get_weather: weatherTool,
  get_mandi_prices: marketPriceTool,
};

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0.3,
  apiKey: process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY
}).bindTools([weatherTool, marketPriceTool]);

const chatWithLangchain = async (question, context, lang, onChunk) => {
    try {
        console.log(`[${new Date().toISOString()}] Calling Gemini LangChain Agent...`);
        const messages = [
            new SystemMessage("You are Dr. KrishiAI, an expert agricultural scientist. You have access to tools for checking weather and crop prices. If the farmer asks about prices or weather, USE THE TOOLS. Keep your final answers short (2-3 sentences max) and highly practical. IMPORTANT: If the farmer specifies a language, reply in that EXACT language (e.g. Kannada or English)."),
            new HumanMessage(`Diagnosis Context: ${JSON.stringify(context || {})}\nFarmer's Question: ${question}\nLanguage requested: ${lang === 'kn' ? 'Kannada' : 'English'}`)
        ];

        let aiMessage = await llm.invoke(messages);
        messages.push(aiMessage);

        // LangChain Tool Calling Loop
        while (aiMessage.tool_calls && aiMessage.tool_calls.length > 0) {
            console.log(`[LangChain Tool Execution] Agent decided to use: ${aiMessage.tool_calls.map(t => t.name).join(', ')}`);
            for (const toolCall of aiMessage.tool_calls) {
                const selectedTool = toolsByName[toolCall.name];
                const toolMsg = await selectedTool.invoke(toolCall);
                messages.push(toolMsg);
            }
            aiMessage = await llm.invoke(messages);
            messages.push(aiMessage);
        }
        
        // Output streaming simulation for frontend compatibility
        // Since tool calling can be complex with raw streams, we simulate the typing 
        // effect just like before to ensure stability.
        const finalOutput = aiMessage.content;
        if (onChunk && finalOutput) {
            const words = finalOutput.split(' ');
            for (const word of words) {
                onChunk(word + ' ');
                await new Promise(r => setTimeout(r, 20)); // Delay for smooth typing effect
            }
        }
        return finalOutput;

    } catch (error) {
        console.error('LangChain Agent Error:', error.message || error);
        throw error;
    }
};

module.exports = { chatWithLangchain };
