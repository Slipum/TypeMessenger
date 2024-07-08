const express = require('express');
const { sendMessage, getMessages } = require('../services/messageService');
const { verifyToken } = require('../services/authService');

const router = express.Router();

router.post('/messages', verifyToken, sendMessage);
router.get('/messages', verifyToken, getMessages);

module.exports = router;
