import express from "express";
import consumerRun from "./consumer.js";
import wss from "./service/websocket.js";
import adminInit from "./admin.js";
const app = express();

const PORT = 8000;

const init = async () => {
  await adminInit();
  await consumerRun("realtime-data", ["thabishs-topic"], wss);
};

app.listen(PORT, async () => {
  console.log(`Listiening to port ----> ${PORT}`);
  init();
});
