"use client";
import { AreaLineChartCanvas } from "@/components/AreaLineChartCanvas";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ws1 = new WebSocket("ws://localhost:8080");
    const ws2 = new WebSocket("ws://localhost:8081");
    ws1.addEventListener("open", () => {
      console.log("Client 1 connected");
    });

    ws1.addEventListener("message", (event) => {
      console.log("Message from server (Client 1): ", event.data);
    });

    ws1.addEventListener("error", (error) => {
      console.error("WebSocket error (Client 1):", error);
    });

    ws2.addEventListener("open", () => {
      console.log("Client 2 connected");
    });

    ws2.addEventListener("message", (event) => {
      console.log("Message from server (Client 2): ", event.data);
    });

    ws2.addEventListener("error", (error) => {
      console.error("WebSocket error (Client 2):", error);
    });

    // Cleanup function
    return () => {
      ws1.close();
      console.log("Client 1 disconnected");

      ws2.close();
      console.log("Client 2 disconnected");
    };
  }, []);

  return (
    <div className="h-screen w-screen p-4">
      <AreaLineChartCanvas />
    </div>
  );
}
