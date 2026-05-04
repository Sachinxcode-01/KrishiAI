const express = require('express');
const router = express.Router();
const { analyze, diagnoseText } = require('../controllers/analyzeController');

// Rate limiting could be added here
router.post('/', analyze);
router.post('/text', diagnoseText);

module.exports = router;
