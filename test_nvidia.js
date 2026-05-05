const OpenAI = require("openai");

// Testing the new NVIDIA AI Integration
const openai = new OpenAI({
  apiKey: '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',
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

async function main() {
  console.log("🚀 Testing NVIDIA Chat (Llama 3.1 8B)...");
  try {
    const completion = await openai.chat.completions.create({
      model: "meta/llama-3.1-8b-instruct",
      messages: [{"role":"user","content":"Tell me a short fact about agriculture in India."}],
      temperature: 0.7,
      max_tokens: 150,
      stream: true
    });
     
    process.stdout.write("Answer: ");
    for await (const chunk of completion) {
      process.stdout.write(chunk.choices[0]?.delta?.content || '');
    }
    console.log("\n\n✅ Chat Test Passed!");
  } catch (err) {
    console.error("❌ Chat Test Failed:", err.message);
  }

  console.log("\n🚀 Testing NVIDIA Vision (Llama 3.2 Vision)...");
  try {
    // Note: In real app we send base64, here we just test text capabilities of the vision model
    const completion = await openai.chat.completions.create({
      model: "meta/llama-3.2-11b-vision-instruct",
      messages: [{"role":"user","content":"What are the symptoms of Paddy Blast disease?"}],
      max_tokens: 150,
    });
    console.log("Answer:", completion.choices[0].message.content.substring(0, 100) + "...");
    console.log("✅ Vision Model Test Passed!");
  } catch (err) {
    console.error("❌ Vision Test Failed:", err.message);
  }
}

main();
