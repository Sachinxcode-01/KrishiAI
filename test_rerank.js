const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');

dotenv.config({ path: './backend/.env' });

const API_KEY = process.env.NVIDIA_API_KEY;
const invokeUrl = "https://ai.api.nvidia.com/v1/retrieval/nvidia/llama-nemotron-rerank-vl-1b-v2/reranking";

const redPixel = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
const greenPixel = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNm+M/0HwANhAH4Y99xOAAAAABJRU5ErkJggg==";

async function testRerank() {
    console.log("🚀 Testing NVIDIA Multimodal Rerank (Fetch Implementation)...");
    
    const headers = {
        "Authorization": `Bearer ${API_KEY}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    const payload = {
        model: "nvidia/llama-nemotron-rerank-vl-1b-v2",
        query: {
            text: "Which one is a healthy green plant?"
        },
        passages: [
            {
                text: "This is a diseased red leaf.",
                image: `data:image/jpeg;base64,${redPixel}`
            },
            {
                text: "This is a healthy green sprout.",
                image: `data:image/jpeg;base64,${greenPixel}`
            }
        ]
    };

    try {
        const response = await fetch(invokeUrl, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: headers
        });

        const response_body = await response.json();
        console.log("✅ Response Received:");
        console.log(JSON.stringify(response_body, null, 2));
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

testRerank();
