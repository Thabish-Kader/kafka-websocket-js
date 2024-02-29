"use client";
import { useEffect } from "react";

export default function Home() {
  const ws = new WebSocket("ws://localhost:8080");

  useEffect(() => {
    ws.addEventListener("open", () => {
      console.log("client connected");
    });
    ws.addEventListener("message", (event) => {
      console.log("Message from server ", event.data);
    });
    ws.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
    });
    return () => {
      ws.removeEventListener("open", () => {
        console.log("client disconnected");
      });
    };
  }, []);

  return <div>HEllod</div>;
}
