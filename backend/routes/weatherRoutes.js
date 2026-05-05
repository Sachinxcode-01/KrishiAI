const express = require('express');
const router = express.Router();
const weatherService = require('../services/weatherService');

// GET /api/weather/forecast
router.get('/forecast', async (req, res) => {
  try {
    const data = await weatherService.getGlobalForecast();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
