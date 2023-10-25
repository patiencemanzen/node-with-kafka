import express from "express";
import bodyParser from "body-parser";
import constrollers from "./controller.js";
import Kafka from "kafka-node";

const app = express();
const jsonParser = bodyParser.json();
const port  = process.env.APP_PORT | '8080';

const user = new Kafka.KafkaClient({ kafkaHost: process.env.KAFKA_HOST });
user.on('ready', () => console.log('Kafka Host Connected'));
user.on('error', (error) => console.error('Error connecting to Kafka:', error));

app.post("/api/send", jsonParser, constrollers.sendMessageToKafka);

app.listen(8080, () => console.log(`Server is running on port ${port}`));
