import React from "react";
import { Box } from "@mui/material";
import { UserAuth } from "../../context/AuthContext";
import { styled, useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
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

const InputField = () => {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          m: 1,
          ml: "320px",
          width: "177ch",
          height: "98vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField sx={{ mb: 20 }} color="primary" focused />
    </Box>
  );
};

export default InputField;
