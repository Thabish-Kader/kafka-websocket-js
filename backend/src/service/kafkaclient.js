import { Kafka } from "kafkajs";
import ip from "ip";

const HOST = process.env.HOST_IP || ip.address();
const kafkaClient = new Kafka({
  clientId: "realtime-dashboard",
  brokers: [`${HOST}:9092`],
});

export default kafkaClient;
