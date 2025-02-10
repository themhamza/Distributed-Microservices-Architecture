const kafka = require('kafka-node');
const Producer = kafka.Producer;
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

const producer = new Producer(client);
const consumer = new Consumer(client, [{ topic: 'auth-topic', partition: 0 }], { autoCommit: true });

producer.on('ready', () => {
  console.log('Producer is ready');
});

producer.on('error', (err) => {
  console.error('Producer error:', err);
});

consumer.on('message', (message) => {
  console.log('Received message:', message.value);
});

consumer.on('error', (err) => {
  console.error('Consumer error:', err);
});

module.exports = { producer, consumer };


producer.on('ready', () => {
  console.log('Producer is ready');
});

producer.on('error', (err) => {
  console.error('Producer error:', err);
});

module.exports = { producer };