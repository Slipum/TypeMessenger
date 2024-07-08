const express = require('express');
const authRoutes = require('./authRoutes');
const messageRoutes = require('./messageRoutes');
const fileRoutes = require('./fileRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/api/messages', messageRoutes);
router.use('/api/files', fileRoutes);

module.exports = router;
