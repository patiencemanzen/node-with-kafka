import Kafka from 'kafka-node';

const sendMessageToKafka = async (req, res) => {
  const { message } = req.body;

  const user = new Kafka.KafkaClient({ kafkaHost: process.env.KAFKA_HOST });
  const producer = new Kafka.Producer(user);
  
  producer.on('ready', () => {
    const payload = [
      { topic: 'My-topic', messages: message },
      { topic: 'My-topic', messages: "message 2" },
      { topic: 'My-topic', messages: "message 3" },
    ];
  
    producer.send(payload, (error, data) => {
      return (error) 
        ? console.error('Error in publishing message:', error)
        : console.log('Message successfully published:', data);
    });
  });
  
  producer.on('error', (error) => console.error('Error connecting to Kafka:', error));

  res.status(200).json({ message: "Message successfully send!" });
};

const constrollers = { sendMessageToKafka };

export default constrollers;
