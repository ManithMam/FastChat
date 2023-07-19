import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { UserAuth } from "../../context/AuthContext";
import { Button } from "@mui/material";

const LeftSideBar = ({ onSelectChat }) => {
  const { user, onUserChatsUpdate, createChat } = UserAuth();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (!user) return;

    const unsunscribe = onUserChatsUpdate(user?.id, (chats) => {
      setContacts(chats ? chats : []);
    });

    return () => {
      unsunscribe();
    };
  }, [user]);

  const createChatWithDemoUser = async () => {
    const demoUserId = "kGmLPO72QUbdP7s3io8lsnzdmST2";
    const result = await createChat(user?.id, demoUserId);
    console.log(result);
  };

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
      open={open}
    >
      <List>
        {contacts.map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => handleChatSelection(text)}>
              <ListItemText sx={{ color: "white" }} primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Button variant="outlined" onClick={() => createChatWithDemoUser()}>
        Create chat
      </Button>
    </Drawer>
  );
};

export default LeftSideBar;
