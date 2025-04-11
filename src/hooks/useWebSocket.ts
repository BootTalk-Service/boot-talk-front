import { Client } from "@stomp/stompjs";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseWebSocketProps {
  roomUuid: string;
  onMessage?: (message: any) => void;
  socketUrl?: string;
  isActive?: boolean;
}

const SOCKET_URL = process.env.NEXT_PUBLIC_WS_URL; // http는 ws://로

export const useWebSocket = ({
  roomUuid,
  onMessage,
  socketUrl = SOCKET_URL,
  isActive = true,
}: UseWebSocketProps) => {
  const [connected, setConnected] = useState(false);
  const clientRef = useRef<Client | null>(null);
  const onMessageRef = useRef(onMessage);

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  const sendMessage = useCallback((message: any) => {
    if (clientRef.current?.connected) {
      clientRef.current.publish({
        destination: "/app/chat/send",
        body: JSON.stringify(message),
      });
    }
  }, []);

  useEffect(() => {
    if (!roomUuid || !isActive) return;
    if (clientRef.current?.connected) return;

    const client = new Client({
      brokerURL: socketUrl,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ WebSocket 연결 성공!");
        setConnected(true);

        client.publish({
          destination: "/app/chat/enter",
          body: JSON.stringify({ roomUuid }),
        });

        client.subscribe(`/queue/chat.${roomUuid}`, (msg) => {
          onMessageRef.current?.(JSON.parse(msg.body));
        });
      },
      onDisconnect: () => {
        console.log("❌ WebSocket 연결 끊김");
        setConnected(false);
      },
      onStompError: (frame) => console.error("STOMP Error:", frame),
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      setConnected(false);
    };
  }, [roomUuid, socketUrl, isActive]);

  return { sendMessage, connected };
};
