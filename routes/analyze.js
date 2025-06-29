// server/routes/analyze.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const { analyzeCV } = require('../controllers/analyzeController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.post('/', upload.single('cv'), analyzeCV);

module.exports = router;
