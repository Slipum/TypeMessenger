const express = require('express');
const { uploadFile } = require('../services/fileService');
const { verifyToken } = require('../services/authService');

const router = express.Router();

router.post('/upload', verifyToken, uploadFile);

module.exports = router;
