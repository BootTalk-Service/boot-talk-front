import { CompatClient, Stomp } from "@stomp/stompjs";
import { useEffect, useState } from "react";

interface Message {
  nickname: string;
  content: string;
  timestamp: number[];
}

const SOCKET_URL = `ws://${process.env.NEXT_PUBLIC_WS_URL}/`; // 반드시 wss://로

export const useWebSocket = (chatRoomId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [stompClient, setStompClient] = useState<CompatClient | null>(null);
  // const [accessToken, setAccessToken] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchToken = async () => {
  //     const token = await tokenManager.fetchHttpOnlyToken();
  //     setAccessToken(token);
  //   };

  //   fetchToken();
  // }, []);

  useEffect(() => {
    // if (!accessToken) return;

    const ws = new WebSocket(SOCKET_URL);
    const client = Stomp.over(ws);

    client.connect(
      // { Authorization: `Bearer ${accessToken}` },
      () => {
        console.log("✅ WebSocket 연결됨");
        client.subscribe(`/topic/chatrooms/${chatRoomId}`, (message) => {
          const parsedMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, parsedMessage]);
        });

        fetchPreviousMessages(chatRoomId, setMessages);
      },
      (error: any) => {
        console.error("❌ WebSocket 연결 에러:", error);
      }
    );

    setStompClient(client);

    return () => {
      if (client && client.connected) {
        client.disconnect(() => {
          console.log("👋 WebSocket 연결 해제");
        });
      }
    };
  }, [chatRoomId]);

  const sendMessage = (content: string) => {
    if (stompClient?.connected) {
      stompClient.send(
        `/app/send/${chatRoomId}`,
        { "content-type": "application/json" },
        JSON.stringify({ content, timestamp: new Date().toISOString() })
      );
    }
  };

  return { messages, sendMessage };
};

const fetchPreviousMessages = async (
  chatRoomId: string,
  // accessToken: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/chats/${chatRoomId}/messages`
      // {
      //   headers: { Authorization: `Bearer ${accessToken}` },
      // }
    );
    const data = await response.json();
    setMessages(data.content || []);
  } catch (error) {
    console.error("💥 이전 메시지 불러오기 실패:", error);
  }
};
