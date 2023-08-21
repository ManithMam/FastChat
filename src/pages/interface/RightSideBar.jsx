import React from "react";
import { Box } from "@mui/material";
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
import ListItemText from "@mui/material/ListItemText";
import { logOut } from "../../_api/AuthApi";
import { Link } from "react-router-dom";

const drawerWidth = "15";

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}vw)`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginRight: drawerWidth + "vw",
	}),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-start",
}));

const RightSideBar = () => {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar sx={{ height: "7vh" }}>
					<Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
						Fastchat
					</Typography>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="end"
						onClick={handleDrawerOpen}
						sx={{ ...(open && { display: "none" }) }}
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
					width: drawerWidth + "vw",
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth + "vw",
						backgroundColor: "#141214",
						color: "white",
					},
				}}
				variant="persistent"
				anchor="right"
				open={open}
			>
				<DrawerHeader>
					<IconButton sx={{ color: "white" }} onClick={handleDrawerClose}>
						{theme.direction === "rtl" ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</DrawerHeader>
				<Divider sx={{ backgroundColor: "gray" }} />
				<List>
					<ListItem disablePadding>
						{/* Link to /profile */}
						<ListItemButton component={Link} to={`/profile`}>
							<ListItemText sx={{ color: "white" }} primary="Profile" />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemText sx={{ color: "white" }} primary="Settings" />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemText sx={{ color: "white" }} primary="Help" />
						</ListItemButton>
					</ListItem>
				</List>
				<Divider sx={{ backgroundColor: "gray" }} />
				<List>
					<ListItem key={"LogOut"} disablePadding>
						<ListItemButton onClick={() => logOut()}>
							<ListItemText sx={{ color: "white" }} primary={"LogOut"} />
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
		</Box>
	);
};

export default RightSideBar;
