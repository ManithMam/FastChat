import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { UserAuth } from "../../context/AuthContext";
import { Button } from "@mui/material";

const LeftSideBar = () => {

  const { user, onUserChatsUpdate, createChat } = UserAuth();
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    if(!user) return;
    
    const unsunscribe = onUserChatsUpdate(user?.id, (chats) => {
      setContacts(chats ? chats : [])
    });

    return () => {
      unsunscribe()
    }
  }, [user]);


  const createChatWithDemoUser = async () => {
    const demoUserId = "kGmLPO72QUbdP7s3io8lsnzdmST2"
    const result = await createChat(user?.id, demoUserId);
    console.log(result);
  }


  return (
    <Drawer
    className="flex flex-col justify-between"
      sx={{
        width: 300,

        "& .MuiDrawer-paper": {
          width: 300,
          mt: "64px",
          height: "calc(100% - 64px)",
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
            <ListItemButton>
              <ListItemText sx={{ color: "white" }} primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Button variant="outlined" onClick={() => createChatWithDemoUser()}>Create chat</Button>
    </Drawer>
  );
};

export default LeftSideBar;
