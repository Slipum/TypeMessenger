const { Kafka } = require('kafkajs');

const kafka = new Kafka({
	clientId: 'type-messenger',
	brokers: ['localhost:9092'],
});

const producer = kafka.producer();

const send = async (message) => {
	await producer.connect();
	await producer.send(message);
	await producer.disconnect();
};

module.exports = { send };
