// server/controllers/analyzeController.js
const extractText = require('../utils/extractText');
const { analyzeWithAI } = require('../utils/ai');
const fs = require('fs');

const analyzeCV = async (req, res) => {
  try {
    const jobDescription = req.body.jobDescription;
    const filePath = req.file.path;

    const cvText = await extractText(filePath);
    const aiResult = await analyzeWithAI(cvText, jobDescription);

    // Optionally delete uploaded file
    fs.unlinkSync(filePath);

    res.json(aiResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to analyze CV' });
  }
};

module.exports = { analyzeCV };
