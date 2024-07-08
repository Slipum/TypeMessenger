const { Message, File } = require('../models');
const kafkaProducer = require('../kafka/producer.js');

const sendMessage = async (req, res) => {
	const { userId, content } = req.body;

	try {
		const message = await Message.create({ userId, content });

		// Отправка события в Kafka
		await kafkaProducer.send({
			topic: 'chat-messages',
			messages: [{ key: userId.toString(), value: content }],
		});

		res.status(201).json(message);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getMessages = async (req, res) => {
	try {
		const messages = await Message.findAll();
		res.json(messages);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = { sendMessage, getMessages };
