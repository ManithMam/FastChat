import React from "react";
import { Box, Container, Grid } from "@mui/material";
import { useRef, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import { styled, useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Item from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const messages = {
  CHAT_ID: [
    {
      from: "USER_ID",
      to: "USER_ID",
      message: "Hello World!",
      timestamp: 1647483103,
    },
    {
      from: "USER_ID",
      to: "USER_ID",
      message: "Hello Fastchat!",
      timestamp: 1647583103,
    },
    {
      from: "USER_ID",
      to: "USER_ID",
      message: "Hello Fastchat!",
      timestamp: 1647583103,
    },
    {
      from: "USER_ID",
      to: "USER_ID",
      message: "Hello World!",
      timestamp: 1647483103,
    },
    {
      from: "USER_ID",
      to: "USER_ID",
      message: "Hello Fastchat!",
      timestamp: 1647583103,
    },
    {
      from: "USER_ID",
      to: "USER_ID",
      message: "Hello Fastchat!",
      timestamp: 1647583103,
    },
    {
      from: "USER_ID",
      to: "USER_ID",
      message: "Hello Fastchat!",
      timestamp: 1647583103,
    },
    {
      from: "USER_ID",
      to: "USER_ID",
      message: "Hello Fastchat!",
      timestamp: 1647583103,
    },
    {
      from: "USER_ID",
      to: "USER_ID",
      message: "Hello Fastchat!",
      timestamp: 1647583103,
    },
    {
      from: "USER_ID",
      to: "USER_ID",
      message: "Hello Fastchat!",
      timestamp: 1647583103,
    },
    {
      from: "me",
      to: "USER_ID",
      message: "Hello Fastchat!",
      timestamp: 1647583103,
    },
    {
      from: "USER_ID",
      to: "USER_ID",
      message: "Hello Fastchat!",
      timestamp: 1647583103,
    },
    {
      from: "USER_ID",
      to: "USER_ID",
      message: "Hello Fastchat!",
      timestamp: 1647583103,
    },
    {
      from: "USER_ID",
      to: "USER_ID",
      message: "Hello Fastchat!",
      timestamp: 1647583103,
    },
    {
      from: "me",
      to: "USER_ID",
      message: "Hello Fastchat!",
      timestamp: 1647583103,
    },
    {
      from: "USER_ID",
      to: "USER_ID",
      message: "Hello Fastchat!",
      timestamp: 1647583103,
    },
    {
      from: "USER_ID",
      to: "USER_ID",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      timestamp: 1647583103,
    },
    {
      from: "me",
      to: "USER_ID",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The quick brown fox jumps over the lazy dog",
      timestamp: 1647583103,
    },
    {
      from: "me",
      to: "USER_ID",
      message: "Lorem ipsum",
      timestamp: 1647583103,
    },
    {
      from: "USER_ID",
      to: "USER_ID",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      timestamp: 1647583103,
    },
    {
      from: "USER_ID",
      to: "USER_ID",
      message: "The",
      timestamp: 1647583103,
    },
    {
      from: "USER_ID",
      to: "USER_ID",
      message: "The quick brown fox jumps over the lazy dog",
      timestamp: 1647583103,
    },
    {
      from: "me",
      to: "USER_ID",
      message: "The quick brown fox jumps",
      timestamp: 1647583103,
    },
  ],
};

const useColor = (from) => {
  if (from === "me") {
    return "#8C307D";
  } else {
    return "#ad719d";
  }
};

const useMargin = (from) => {
  if (from === "me") {
    return null;
  } else {
    return "auto";
  }
};

const placeHolder = () => {
  if (90 - messages.CHAT_ID.length > 75) {
    return 84 + "vh";
  } else {
    return null;
  }
};

const ChatField = () => {
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <Paper
      elevation={3}
      style={{
        height: placeHolder(),
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
        {messages.CHAT_ID.map((message) => (
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
                borderColor: useColor(message.from),
                borderRadius: "5px",
                backgroundColor: useColor(message.from),
                marginLeft: useMargin(message.from),
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

    //<Container
    // 	sx={{
    // 		m: 1,
    // 		ml: "320px",
    // 		width: "177ch",
    // 		height: "94vh",
    // 		display: "flex",
    // 		flexDirection: "column",
    // 		justifyContent: "flex-end",
    // 	}}
    // >
    // 	<p className="my-300">Hello</p>
    // </Container>
  );
};

export default ChatField;
