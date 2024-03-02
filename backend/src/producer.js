import { Partitioners } from "kafkajs";
import kafkaClient from "./service/kafkaclient.js";
import readline from "readline";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({
  input: input,
  output: output,
});

const producerRun = async () => {
  const producer = kafkaClient.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  });

  await producer.connect();

  rl.setPrompt("Enter Prompt --> ");
  rl.prompt();

  rl.on("line", async (line) => {
    const [name, value, partition] = line.split(" ");

    await producer.send({
      topic: "thabishs-topic",

      messages: [
        {
          partition: parseInt(partition),
          value: JSON.stringify({ name, value }),
        },
      ],
    });
  }).on("close", async () => {
    await producer.disconnect();
  });
};

producerRun();
