import { Client } from "@stomp/stompjs";
import { useCallback, useEffect, useRef, useState } from "react";

export interface ChatMessage {
  id?: number;
  roomUuid: string;
  senderId: number;
  senderName: string;
  receiverId: number;
  content: string;
  type: string;
}

interface UseWebSocketProps {
  roomUuid: string;
  userId: string;
  onMessage?: (message: ChatMessage) => void;
  socketUrl?: string;
  isActive?: boolean;
}

// const SOCKET_URL = "wss://be11-58-225-126-218.ngrok-free.app/connection"; // http는 ws://로
const token = localStorage.getItem("access_token");
const SOCKET_URL = `ws://43.200.67.27:8080/connection?token=${token}`;

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

  const sendMessage = useCallback((message: ChatMessage) => {
    if (clientRef.current?.connected) {
      clientRef.current.publish({
        destination: "/app/chat.message",
        body: JSON.stringify(message),
      });
    }
  }, []);

  const sendTypingStatus = useCallback(
    (receiverId: number, isTyping: boolean) => {
      if (clientRef.current?.connected) {
        clientRef.current.publish({
          destination: "/app/chat.typing",
          body: JSON.stringify({
            roomUuid,
            typing: isTyping,
            receiverId,
          }),
        });
      }
    },
    [roomUuid]
  );

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

  return { sendMessage, sendTypingStatus, connected };
};
