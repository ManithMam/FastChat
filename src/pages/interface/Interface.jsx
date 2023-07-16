import React from "react";
import RightSideBar from "./RightSideBar";
import LeftSideBar from "./LeftSideBar";
import InputField from "./InputField";
import ChatField from "./ChatField";
import Background from "./Background";

const Interface = () => {
  return (
    <div>
      <Background />
      <RightSideBar />
      <LeftSideBar />
      <ChatField />
      <InputField />
    </div>
  );
};

export default Interface;
