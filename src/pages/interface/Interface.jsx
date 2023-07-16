import React, { useState } from "react";
import RightSideBar from "./RightSideBar";
import LeftSideBar from "./LeftSideBar";
import InputField from "./InputField";
import ChatField from "./ChatField";
import Background from "./Background";

const Interface = () => {

  const [selectedChat, setSelectedChat] = useState(null)

  return (
    <div>
      <Background />
      <RightSideBar />
      <LeftSideBar onSelectChat={setSelectedChat}/>
      <ChatField selectedChatId={selectedChat}/>
      <InputField />
    </div>
  );
};

export default Interface;
