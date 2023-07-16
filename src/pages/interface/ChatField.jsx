import React, { useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import { useRef, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import Paper from "@mui/material/Paper";
import Item from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";


const useColor = (currentUserId, from) => {
  if (currentUserId === from) {
    return "#8C307D";
  } else {
    return "#ad719d";
  }
};

const useMargin = (currentUserId, from) => {
  if (currentUserId === from) {
    return null;
  } else {
    return "auto";
  }
};

const placeHolder = (messages) => {
  if (90 - messages.length > 75) {
    return 84 + "vh";
  } else {
    return null;
  }
};

const ChatField = ({selectedChatId}) => {

  const { user, onChatMessagesUpdate } = UserAuth();
  const [messages, setMessages] = useState([])

  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  useEffect(() => {
    if(!selectedChatId) return;

    const unsubscribe = onChatMessagesUpdate(selectedChatId, (_messages) => {
      setMessages(_messages ? _messages : [])
    });

    return () => {
      unsubscribe()
    }
  }, [selectedChatId])

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <Paper
      elevation={3}
      style={{
        height: placeHolder(messages),
        width: "169.5vh",
        marginLeft: "322px",
        marginTop: "70px",
        overflow: "auto",
        maxHeight: "84vh",
      }}
    >
      <List
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {messages.length == 0 && 
          <h1 className="text-xl text-white">Seems like this chat is empty. Send now your first message</h1>
        }
        {messages.length > 0 && messages.map((message) => (
          // color = useColor(message.from);

          <ListItem
            sx={{
              marginBottom: "5px",
              marginTop: "5px",
              width: "auto",
              padding: "10px",
              // backgroundColor: "white",
            }}
          >
            <Grid
              container
              sx={{
                width: "auto",
                border: "5px solid",
                borderColor: useColor(user?.id, message.from),
                borderRadius: "5px",
                backgroundColor: useColor(user?.id, message.from),
                marginLeft: useMargin(user?.id, message.from),
              }}
            >
              <Grid item sx={{ color: "white", width: "5vw" }}>
                <Item border={0}>{message.from}</Item>
              </Grid>
              <Grid item sx={{ color: "white", width: "auto" }}>
                <Item border={0}>{message.message}</Item>
              </Grid>
              <Grid
                item
                sx={{
                  color: "white",
                  width: "auto",
                  marginTop: "auto",
                  marginLeft: "15px",
                }}
              >
                <Item
                  sx={{
                    // backgroundColor: "white",
                    fontSize: 10,
                    color: "lightgray",
                  }}
                  border={0}
                >
                  {message.timestamp}
                </Item>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
      <div ref={messageEndRef}></div>
    </Paper>
  );
};

export default ChatField;
