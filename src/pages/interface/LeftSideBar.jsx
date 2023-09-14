import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { UserAuth } from "../../context/AuthContext";
import AddFriendDialog from "../../components/FriendsList"
import { onUserChatsUpdate } from "../../_api/ChatApi";
import { Avatar } from "@mui/material";

const LeftSideBar = ({ onSelectChat }) => {
	const { user } = UserAuth();
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		const unsubscribe = onUserChatsUpdate(user, (chats) => {
			console.log("chats", chats)
			setContacts(chats);
		});

		return () => {
			console.log("Unsubscribing from chats")
			unsubscribe();
		};
	}, [user]);

	const handleChatSelection = (chatId) => {
		onSelectChat(chatId);
	};

	return (
		<Drawer
			className="flex flex-col justify-between"
			sx={{
				"& .MuiDrawer-paper": {
					width: "15vw",
					marginTop: "7vh",
					height: "calc(100% - 7vh)",
					backgroundColor: "#141214",
				},
			}}
			variant="persistent"
			anchor="left"
			open={open}>

			<AddFriendDialog />
			<List>
				{contacts.map((chat, index) => (
					<ListItem key={index} disablePadding>
						<ListItemButton onClick={() => handleChatSelection(chat.id)}>
							<Avatar alt="Remy Sharp" src={chat.photoUrl} />
							<ListItemText sx={{ color: "white", paddingLeft: "20px" }} primary={chat.name} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Drawer>
	);
};

export default LeftSideBar;
