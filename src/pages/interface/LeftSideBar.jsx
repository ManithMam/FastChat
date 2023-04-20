import React from "react";
import { Box } from "@mui/material";
import { UserAuth } from "../../context/AuthContext";
import { styled, useTheme } from "@mui/material/styles";
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
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const LeftSideBar = ({ contacts }) => {
	return (
		<Drawer
			sx={{
				width: 300,

				"& .MuiDrawer-paper": {
					width: 300,
					mt: "64px",
					height: "calc(100% - 64px)",
				},
			}}
			variant="persistent"
			anchor="left"
			open={open}
		>
			<List>
				{contacts.map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
		</Drawer>
	);
};

export default LeftSideBar;
