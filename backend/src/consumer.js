import kafkaClient from "./service/kafkaclient.js";

let messageQue = [];
const consumerRun = async (groupId, topics, wss) => {
  const consumer = kafkaClient.consumer({ groupId: groupId });
  await consumer.connect();
  await consumer.subscribe({ topics: topics });

  wss.on("connection", async function connection(ws) {
    console.log("Client connected");
    const handleMessage = async ({ topic, partition, message }) => {
      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(JSON.stringify(message.value.toString()));
        }
      });

      console.log(
        `Topic - ${topic}, Partition - ${partition}, Message - ${message.value.toString()}`
      );
    };

    // Run Kafka consumer
    try {
      await consumer.run({
        eachMessage: handleMessage,
      });
    } catch (error) {
      console.error(error);
    }

    ws.on("error", console.error);
  });
};

export default consumerRun;
