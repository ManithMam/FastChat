import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { UserAuth } from "../../context/AuthContext";
<<<<<<< HEAD
import { BottomNavigation, BottomNavigationAction, Button } from "@mui/material";
import FriendsList from "../../components/FriendsList"
=======
import { Button } from "@mui/material";
import { createChat, onUserChatsUpdate } from "../../_api/ChatApi";
>>>>>>> develop

const LeftSideBar = ({ onSelectChat }) => {

  const { user, isLoading } = UserAuth();
  const [contacts, setContacts] = useState([]);
  const [contents, setContents] = useState(0);

  useEffect(() => {
    console.log("User LeftSideBar: ", user)
    const unsubscribe = onUserChatsUpdate(user, (chats) => {
      console.log("Setting chats to: ", chats);
      setContacts(chats);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const createChatWithDemoUser = async () => {
    console.log(user)
    const demoUserId = "weUmDH0F8wSmHcu4uqndK7UbJL82";
    const result = await createChat(user, demoUserId);
    console.log(result);
  };

  const handleChatSelection = (chatId) => {
    onSelectChat(chatId);
  };

  const ChatList = () => {
    return <><List>
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
  </Button></>
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
      {(contents === 0 ? <ChatList/> : <FriendsList/>)}
      
      <BottomNavigation sx={{position: "absolute", bottom: "0", width: "100%", backgroundColor: "#141214"}} showLabels onChange={(newValue => {setContents(newValue)})}>
          <BottomNavigationAction value={0} label="Chats"></BottomNavigationAction>
          <BottomNavigationAction value={1} label="Friends List"></BottomNavigationAction>
      </BottomNavigation>
    </Drawer>
  );
};

export default LeftSideBar;
