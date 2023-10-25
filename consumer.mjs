import Kafka from 'kafka-node';

const consumer = new Kafka.Consumer(
  new Kafka.KafkaClient({ kafkaHost: process.env.KAFKA_HOST }),
  [{ topic: 'My-topic' }]
);

consumer.on('message', function (message) {
  console.log("📨 Message Recieved", message.value);
});