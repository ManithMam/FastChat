import React from "react";
import RightSideBar from "./RightSideBar";
import LeftSideBar from "./LeftSideBar";
import InputField from "./InputField";
import ChatField from "./ChatField";

const myContacts = ["Jane Doe", "John Doe", "John Smith", "Jane Smith"];

const Interface = () => {
	return (
		<div>
			<RightSideBar />
			<LeftSideBar contacts={myContacts} />
			<ChatField />
			<InputField />
		</div>
	);
};

export default Interface;
