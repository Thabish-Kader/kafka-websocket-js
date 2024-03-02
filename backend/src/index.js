import express from "express";
import consumerRun from "./consumer.js";
import { wss1, wss2, startWebSocketServers } from "./service/websocket.js";
import adminInit from "./admin.js";
const app = express();

const PORT = 8000;

const init = async () => {
  await adminInit();
  await startWebSocketServers();
  await consumerRun("realtime-data", ["thabishs-topic"], wss1);
  await consumerRun("realtime-data", ["thabishs-topic"], wss2);
};

app.listen(PORT, async () => {
  console.log(`Listiening to port ----> ${PORT}`);
  init();
});
