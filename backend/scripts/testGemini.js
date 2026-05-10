const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require('path');
// Ensure we load the environment and allow it to override any existing system vars
require('dotenv').config({ path: path.join(__dirname, '../.env'), override: true });

async function testGemini() {
    const key = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
    if (!key) {
        console.error('❌ No API key found in .env!');
        return;
    }
    
    // Check if it's the new key
    const isNewKey = key.startsWith('AIzaSyBZ9UOjMWi');
    console.log(`⏳ Testing Gemini API with key: ${key.substring(0, 15)}... (${isNewKey ? 'NEW KEY' : 'OLD KEY'})`);
    
    try {
        const genAI = new GoogleGenerativeAI(key);
        // Using the 2.0 Flash model which was verified to be available in this project
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        
        console.log('📡 Sending diagnostic signal to Gemini 2.0 Flash...');
        const prompt = "Hello! respond with 'GEMINI_ONLINE' if you can hear me.";
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        console.log('🤖 Response:', text);
        if (text.toLowerCase().includes('gemini_online')) {
            console.log('✅ GEMINI API IS RESPONDING CORRECTLY!');
        } else {
            console.log('⚠️ Gemini responded, but not with the expected phrase.');
        }
    } catch (error) {
        if (error.status === 429) {
            console.log('✅ GEMINI API KEY IS VALID BUT RATE LIMITED (429). This is a successful signal!');
        } else {
            console.log('❌ Gemini API Error Details:');
            console.error(error);
        }
    }
}

testGemini();
