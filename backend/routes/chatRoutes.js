const express = require('express');
const router = express.Router();
const { chatWithAssistant } = require('../services/aiService');

router.post('/', async (req, res) => {
  try {
    const { question, context, lang } = req.body;
    if (!question) return res.status(400).json({ success: false, message: 'Question is required' });

    // Set headers for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    await chatWithAssistant(question, context, lang, (chunk) => {
      res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
    });

    res.write(`data: [DONE]\n\n`);
    res.end();
  } catch (error) {
    console.error('Chat Route Error:', error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
      res.end();
    }
  }
});

module.exports = router;
