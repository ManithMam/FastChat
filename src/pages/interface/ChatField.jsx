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
			from: "USER_ID",
			to: "USER_ID",
			message: "Hello Fastchat!",
			timestamp: 1647583103,
		},
	],
};

const placeHolder = () => {
	if (90 - messages.CHAT_ID.length > 75) {
		return 84 + "vh";
	} else {
		return null;
	}
};

const ChatField = () => {
	const paperRef = useRef(null);

	useEffect(() => {
		if (paperRef.current) {
			paperRef.current.scrollTop = paperRef.current.scrollHeight;
		}
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
					<ListItem
						sx={{
							marginBottom: "5px",
							marginTop: "5px",
						}}
					>
						<Grid container>
							<Grid item xs={"auto"}>
								<Item border={1}>{message.from}</Item>
							</Grid>
							<Grid item sx={{ width: "70vw" }}>
								<Item border={1}>{message.message}</Item>
							</Grid>
							<Grid item sx={{ width: "5vw" }}>
								<Item border={1}>{message.timestamp}</Item>
							</Grid>
						</Grid>
					</ListItem>
				))}
			</List>
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
