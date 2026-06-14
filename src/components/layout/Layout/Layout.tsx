import SideNavbar from "../../Navbar/SideNavbar/SideNavbar";
import Header from "../Header/Header";

import {
  ChatHeader,
  ChatInputBox,
  ChatMessageBody,
  ChatMessageBox,
  ChatTrigger,
  ChatWrapper,
} from "../../../components/Chat/Chat";
import { useEffect, useRef } from "react";
import Icon from "../../../assets/message-icon.svg";
import MessageIcon from "../../../assets/send-icon.svg";

import "./style.css";
import { Suspense, useState } from "react";
import { Outlet } from "react-router";
import { useChat } from "@/hooks/useChat";

const Layout = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { messages, loading, handleSend } = useChat();
  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);
  return (
    <main>
      <Header />
      <section className="body-container">
        <SideNavbar  />
        <div className="rigth-container">
          <Suspense fallback={<Loading/>}>
          <Outlet />
          </Suspense>
        </div>

        <div className="chat-section">
          {isChatOpen && (
            <ChatWrapper>
              <ChatHeader label="Help Desk" iconUrl={Icon} />
              <ChatMessageBody>
                    {messages.map((message, index) => (
                      <ChatMessageBox
                        key={index}
                        isSend={message.isSend}
                      >
                        {message.text}
                      </ChatMessageBox>
                    ))}

                    {loading && (
                      <ChatMessageBox isSend={false}>
                        Typing...
                      </ChatMessageBox>
                    )}

                    <div ref={messagesEndRef} />
                  </ChatMessageBody>
              <ChatInputBox
                    placeholder="Type your question"
                    iconUrl={MessageIcon}
                    onSend={handleSend}
                  />
            </ChatWrapper>
          )}
          <ChatTrigger isOpen={isChatOpen} onChange={setIsChatOpen} />
        </div>
      </section>
    </main>
  );
};
function Loading() {
  return <h2>🌀 Loading...</h2>;
}

export default Layout;