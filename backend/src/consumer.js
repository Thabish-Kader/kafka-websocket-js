import kafkaClient from "./service/kafkaclient.js";

const consumerRun = async (groupId, topics, wss) => {
  const consumer = kafkaClient.consumer({ groupId: groupId });
  await consumer.connect();
  await consumer.subscribe({ topics: topics });

  const handleMessage = async ({ topic, partition, message }) => {
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(message.value.toString());
      }
    });

    console.log(
      `Topic - ${topic}, Partition - ${partition}, Message - ${message.value.toString()}`
    );
  };

  try {
    await consumer.run({
      eachMessage: handleMessage,
    });
  } catch (error) {
    console.error(error);
  }
};

export default consumerRun;
