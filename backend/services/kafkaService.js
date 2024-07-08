const { Kafka } = require('kafkajs');

const kafka = new Kafka({
	clientId: 'type-messenger',
	brokers: ['kafka1:9092', 'kafka2:9092'],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'type-messenger-group' });

const publishMessage = async (topic, message) => {
	await producer.connect();
	await producer.send({
		topic,
		messages: [{ value: JSON.stringify(message) }],
	});
};

const consumeMessages = async (topic, callback) => {
	await consumer.connect();
	await consumer.subscribe({ topic });

	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			const data = JSON.parse(message.value.toString());
			callback(data);
		},
	});
};

module.exports = { publishMessage, consumeMessages };
