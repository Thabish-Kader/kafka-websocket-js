import kafkaClient from "./service/kafkaclient.js";

const consumerRun = async (groupId, topics, wss1, wss2) => {
  const consumer = kafkaClient.consumer({ groupId: groupId });
  await consumer.connect();
  await consumer.subscribe({ topics: topics });

  const handleMessage = async ({ topic, partition, message }) => {
    switch (partition) {
      case 0:
        wss1.clients.forEach((client) => {
          if (client.readyState === 1) {
            client.send(message.value.toString());
          }
        });
        break;
      case 1:
        wss2.clients.forEach((client) => {
          if (client.readyState === 1) {
            client.send(message.value.toString());
          }
        });
        break;
    }

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
