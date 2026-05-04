const express = require('express');
const router = express.Router();
const { 
  getHistory, 
  saveDiagnosis, 
  deleteDiagnosis, 
  clearHistory 
} = require('../controllers/historyController');

router.get('/', getHistory);
router.post('/save', saveDiagnosis);
router.delete('/:id', deleteDiagnosis);
router.delete('/', clearHistory); // For "Clear All History"

module.exports = router;
