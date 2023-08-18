import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { UserAuth } from "../../context/AuthContext";
import { Button } from "@mui/material";
import { createChat, onUserChatsUpdate } from "../../_api/ChatApi";
import { Link } from "react-router-dom";
import { logOut } from "../../_api/AuthApi";

export interface LeftSideBarProps {
  onSelectChat: (chatId: string) => void;
}

const LeftSideBar = ({ onSelectChat }: LeftSideBarProps) => {
  console.log("LeftSideBar")
  const { user } = UserAuth();
  const [contacts, setContacts] = useState<string[]>([]);

  useEffect(() => {
    const unsunscribe = onUserChatsUpdate(user, (chats: string[]) => {
      console.log(chats)
      setContacts(chats);
    });

    return () => {
      if (unsunscribe) unsunscribe();
    };
  }, [user]);

  const createChatWithDemoUser = async () => {
    const demoUserId = "kGmLPO72QUbdP7s3io8lsnzdmST2";
    const result = await createChat(user, demoUserId);
    console.log(result);
  };

  return (
    <div>
      <h1>Test</h1>
      <List>
        {contacts.map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => onSelectChat(text)}>
              <ListItemText sx={{ color: "white" }} primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Button variant="outlined" onClick={() => createChatWithDemoUser()}>
        Create chat
      </Button>
      <Button variant="outlined" component={Link} to="/profile">
        profile
      </Button>
      <Button variant="outlined" onClick={() => logOut()}>
        Signout
      </Button>
    </div>
  );
};

export default LeftSideBar;
