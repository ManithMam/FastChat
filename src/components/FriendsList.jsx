import { useState } from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from "@mui/material"

const AddFriendDialog = () => {
    
    const [open, setOpen] = useState(false);

    const handleAddFriend = () => { setOpen(false) };
    const handleCloseDialog = () => { setOpen(false) }; // Ich muss das Schließen des Dialogs in dieser Funktion durchführen, weil React ansonsten einen too many re-renders Fehler wirft wenn ich setOpen direkt in der property aufrufe

    return (<>
        <Button variant="outlined" sx={{ margin: "5px" }} onClick={() => {setOpen(true)}}>Add friend</Button>
        <Dialog open={open}>
            <DialogTitle>Add New Friend</DialogTitle>
            <DialogContent>
                <DialogContentText>Search for the user's name that you want to add as a friend.</DialogContentText>
                <TextField sx={{margin: '10px 0'}} label="Search" variant="outlined"/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button autoFocus onClick={handleAddFriend}>Add friend</Button>
            </DialogActions>
        </Dialog>
    </>)
}

const FriendsList = () => {
    const [friends, setFriends] = useState([]);

    return <>
        <AddFriendDialog />
        <Divider />
        <List>
            {friends.map((text, index) => (
                <ListItem key={index} disablePadding>
                    <ListItemButton onClick={() => { }}>
                        <ListItemText sx={{ color: "white" }} primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    </>
};

export default FriendsList;
