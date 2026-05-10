const axios = require('axios');
require('path');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

async function testNvidia() {
    const key = process.env.NVIDIA_API_KEY;
    if (!key || key.includes('your_')) {
        console.error('❌ No valid NVIDIA API key found in .env!');
        return;
    }
    console.log(`⏳ Testing NVIDIA API with key: ${key.substring(0, 15)}...`);

    try {
        const response = await axios.post(
            'https://integrate.api.nvidia.com/v1/chat/completions',
            {
                model: process.env.NVIDIA_CHAT_MODEL || "meta/llama-3.1-8b-instruct",
                messages: [{ role: "user", content: "Hello! respond with 'NVIDIA_ONLINE' if you can hear me." }],
                max_tokens: 10
            },
            {
                headers: {
                    'Authorization': `Bearer ${key}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const text = response.data.choices[0].message.content;
        console.log('🤖 Response:', text);
        if (text.includes('NVIDIA_ONLINE')) {
            console.log('✅ NVIDIA API IS RESPONDING CORRECTLY!');
        } else {
            console.log('⚠️ NVIDIA responded, but not with the expected phrase.');
        }
    } catch (error) {
        console.error('❌ NVIDIA API Error:', error.response?.data?.detail || error.message);
    }
}

testNvidia();
