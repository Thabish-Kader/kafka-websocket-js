import { WebSocketServer } from "ws";

const wss1 = new WebSocketServer({ port: 8080 });
const wss2 = new WebSocketServer({ port: 8081 });

const startWebSocketServers = async () => {
  wss1.on("connection", (ws) => {
    console.log("WebSocket server 1 connected");
  });

  wss1.on("error", (error) => {
    console.error("WebSocket server 1 error:", error);
  });

  wss2.on("connection", (ws) => {
    console.log("WebSocket server 2 connected");
  });

  wss2.on("error", (error) => {
    console.error("WebSocket server 2 error:", error);
  });
};

export { wss1, wss2, startWebSocketServers };
