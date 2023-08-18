import React, { useState } from "react";
import Header from "./Header";
import LeftSideBar from "./LeftSideBar";
import InputField from "./InputField";
import ChatField from "./ChatField";
import Background from "./Background";

const Interface = () => {

  const [selectedChat, setSelectedChat] = useState<string | null>(null)

  return (
    <div>
      <Background/>
      {/* <Header/> */}
      <div className="flex flex-row">
        <LeftSideBar onSelectChat={(chatId) => setSelectedChat(chatId)}/>
        <ChatField selectedChatId={selectedChat}/>
        <InputField selectedChatId={selectedChat}/>
      </div>
    </div>
  );
};

export default Interface;
