import React from "react";
import RightSideBar from "./RightSideBar";
import LeftSideBar from "./LeftSideBar";
import InputField from "./InputField";
import ChatField from "./ChatField";
import Background from "./Background";

const myContacts = ["Jane Doe", "John Doe", "John Smith", "Jane Smith"];

const Interface = () => {
  return (
    <div>
      <Background />
      <RightSideBar />
      <LeftSideBar contacts={myContacts} />
      <ChatField />
      <InputField />
    </div>
  );
};

export default Interface;
