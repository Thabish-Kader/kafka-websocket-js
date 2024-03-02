import { useState, useRef, useEffect } from "react";

export const useWs = (url) => {
  const [isReady, setIsReady] = useState(false);
  const [val, setVal] = useState(null);
  const ws = useRef(null);

  const send = (data) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current?.send(data);
    } else {
      console.error("WebSocket connection not open.");
    }
  };

  useEffect(() => {
    const wsInstance = new WebSocket(url);

    wsInstance.addEventListener("open", () => {
      setIsReady(true);
    });

    wsInstance.addEventListener("message", (event) => {
      setVal(event.data);
    });

    wsInstance.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
    });

    ws.current = wsInstance;

    return () => {
      wsInstance.close();
      setIsReady(false);
    };
  }, [url]);

  return [isReady, val, send];
};
