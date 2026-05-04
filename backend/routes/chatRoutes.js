const express = require('express');
const router = express.Router();
const { chatWithAssistant } = require('../services/claudeService');

router.post('/chat', async (req, res) => {
  try {
    const { question, context, lang } = req.body;
    if (!question) return res.status(400).json({ success: false, message: 'Question is required' });
    
    const answer = await chatWithAssistant(question, context, lang);
    res.json({ success: true, answer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
