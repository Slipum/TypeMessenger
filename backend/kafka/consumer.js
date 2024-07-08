const { Kafka } = require('kafkajs');

const kafka = new Kafka({
	clientId: 'type-messenger',
	brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'chat-group' });

const run = async () => {
	await consumer.connect();
	await consumer.subscribe({ topic: 'chat-messages', fromBeginning: true });

	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			console.log({
				key: message.key.toString(),
				value: message.value.toString(),
				headers: message.headers,
			});
		},
	});
};

run().catch(console.error);

module.exports = { consumer };
