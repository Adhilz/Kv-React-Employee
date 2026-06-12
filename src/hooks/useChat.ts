import { useState } from "react";
import { streamChatResponse } from "@/utils/chat";
type Message = {
  text: string;
  isSend: boolean;
}
export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSend(message: string) {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        text: message,
        isSend: true,
      },
    ]);

    setLoading(true);

    try {
     const reply = await streamChatResponse(
  message,
  (text) => {
    console.log(text);
  }
);

      setMessages((prev) => [
        ...prev,
        {
          text: reply,
          isSend: false,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          text: "Yo gng,I ain't reading allaatt.",
          isSend: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return {
    messages,
    loading,
    handleSend,
  };
}