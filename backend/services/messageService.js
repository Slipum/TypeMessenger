const { Message } = require('../models');
const { publishMessage } = require('./kafkaService');

const sendMessage = async (req, res) => {
	const { content } = req.body;
	const { userId } = req;

	try {
		const message = await Message.create({ content, UserId: userId });
		await publishMessage('new_message', { id: message.id, content, userId });
		res.status(201).json(message);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getMessages = async (req, res) => {
	try {
		const messages = await Message.findAll({ include: 'User' });
		res.json(messages);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = { sendMessage, getMessages };
