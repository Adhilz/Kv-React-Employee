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

import Icon from "../../../assets/message-icon.svg";
import MessageIcon from "../../../assets/send-icon.svg";

import "./style.css";
import { Suspense, useState } from "react";
import { Outlet } from "react-router";

const Layout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main>
      <Header />
      <section className="body-container">
        <SideNavbar />
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
                <ChatMessageBox isSend={true}>
                  Lorem ipsum dolor sit amet.
                </ChatMessageBox>
                
                <ChatMessageBox isSend={false}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
                  iusto aliquid quibusdam dolorem nemo veritatis debitis
                  molestias mollitia sint ex distinctio quae quidem incidunt
                  modi hic totam nostrum voluptates architecto.
                </ChatMessageBox>
                
              </ChatMessageBody>
              <ChatInputBox
                placeholder="Type your question"
                iconUrl={MessageIcon}
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