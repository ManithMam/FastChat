import React, { useState } from "react";
import RightSideBar from "./RightSideBar";
import LeftSideBar from "./LeftSideBar";
import InputField from "./InputField";
import ChatField from "./ChatField";
import Background from "./Background";

const Interface = () => {
	const [selectedChat, setSelectedChat] = useState(null);

	return (
		<div>
			<Background />
			<div className="flex flex-col">
				<RightSideBar />
				<LeftSideBar onSelectChat={setSelectedChat} />
			</div>
			<ChatField selectedChatId={selectedChat} />
			<InputField selectedChatId={selectedChat} />
		</div>
	);
};

export default Interface;
