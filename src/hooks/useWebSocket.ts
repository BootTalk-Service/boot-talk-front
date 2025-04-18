import { token } from "@/api/axiosInstance";
import { Client } from "@stomp/stompjs";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseWebSocketProps {
  roomUuid: string;
  userId: string;
  onMessage?: (message: any) => void;
  socketUrl?: string;
  isActive?: boolean;
}

// const SOCKET_URL = "wss://be11-58-225-126-218.ngrok-free.app/connection"; // http는 ws://로

const SOCKET_URL = `wss://be11-58-225-126-218.ngrok-free.app/connection?token=${token}`;

// const SOCKET_URL = "wss://be11-58-225-126-218.ngrok-free.app/connection";

export const useWebSocket = ({
  roomUuid,
  userId,
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
        destination: "/app/chat.message",
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
          destination: `/app/chat.enter/${roomUuid}`,
          body: JSON.stringify({ enterUserId: parseInt(userId) }),
        });

        client.subscribe(`/queue/chat/${roomUuid}/${userId}`, (msg) => {
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
  }, [roomUuid, socketUrl, isActive, userId]);

  return { sendMessage, connected };
};
