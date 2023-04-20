import React from "react";
import app from "../../firebase";
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import RightSideBar from "./RightSideBar";
import LeftSideBar from "./LeftSideBar";
import InputField from "./InputField";

const myContacts = ["Jane Doe", "John Doe", "John Smith", "Jane Smith"];

const Interface = () => {
  return (
    <div>
      <RightSideBar />
      <LeftSideBar contacts={myContacts} />
      <InputField />
    </div>
  );
};

export default Interface;
