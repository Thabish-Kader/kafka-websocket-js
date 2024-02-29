import kafkaClient from "./service/kafkaclient.js";

const adminInit = async () => {
  console.log("Admin INTIATED");
  const admin = kafkaClient.admin();
  await admin.connect();
  await admin.createTopics({
    topics: [
      {
        topic: "thabishs-topic",
        numPartitions: 2,
      },
    ],
  });
  console.log("---------Topic created----------");
  await admin.disconnect();
  console.log("--------Admin Disconnected--------");
};

export default adminInit;
