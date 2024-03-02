"use client";
import { AreaLineChartCanvas } from "@/components/AreaLineChartCanvas";
import { useWs } from "@/utils/hooks/useWs";
import { useEffect, useState } from "react";

export default function Home() {
  const [ws1Data, setWs1Data] = useState([]);
  const [ws2Data, setWs2Data] = useState([]);
  const [isWs1Ready, ws1Value] = useWs("ws://localhost:8080");
  const [isWs2Ready, ws2Value] = useWs("ws://localhost:8081");

  useEffect(() => {
    if (isWs1Ready) {
      console.log("client 1 connected");
      if (ws1Value) {
        const { name, value } = JSON.parse(ws1Value);
        setWs1Data((prev) => [...prev, { name, value: parseInt(value) }]);
      }
    }
  }, [isWs1Ready, ws1Value]);

  useEffect(() => {
    if (isWs2Ready) {
      console.log("client 2 connected");
      if (ws2Value) {
        const { name, value } = JSON.parse(ws2Value);
        setWs2Data((prev) => [...prev, { name, value: parseInt(value) }]);
      }
    }
  }, [isWs2Ready, ws2Value]);

  console.log({ ws1Data });
  console.log({ ws2Data });

  return (
    <div className="h-screen w-screen p-4 flex items-center justify-center gap-5">
      <AreaLineChartCanvas data={ws1Data} color={"red"} />
      <AreaLineChartCanvas data={ws2Data} color={"green"} />
    </div>
  );
}
