import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const LeftSideBar = ({ contacts }) => {
  return (
    <Drawer
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
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText sx={{ color: "white" }} primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default LeftSideBar;
