import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { UserAuth } from "../../context/AuthContext";
import { BottomNavigation, BottomNavigationAction, Button } from "@mui/material";

const LeftSideBar = ({ onSelectChat }) => {
  const { user, onUserChatsUpdate, createChat } = UserAuth();
  const [contacts, setContacts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [contents, setContents] = useState(0);

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

  const handleFriendSelection = () => {

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

  const FriendsList = () => {
      return <>
        <Button variant="outlined" sx={{ margin: "5px" }} onClick={() => {}}>Add friend</Button>
        <Divider/>
    <List>
      {friends.map((text, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton onClick={() => handleFriendSelection(text)}>
            <ListItemText sx={{ color: "white" }} primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    </>
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
