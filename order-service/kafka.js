const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

const consumer = new Consumer(client, [{ topic: 'auth-topic', partition: 0 }], { autoCommit: true });

consumer.on('message', (message) => {
  console.log('Received message:', message.value);
});

consumer.on('error', (err) => {
  console.error('Consumer error:', err);
});

module.exports = { consumer };


consumer.on('message', (message) => {
  console.log('Received message:', message.value);
});

consumer.on('error', (err) => {
  console.error('Consumer error:', err);
});
