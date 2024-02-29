import { Kafka } from "kafkajs";

const HOST = process.env.HOST_IP || ip.address();
const kafkaClient = new Kafka({
  clientId: "realtime-dashboard",
  brokers: [`${HOST}:9092`],
});

export default kafkaClient;
