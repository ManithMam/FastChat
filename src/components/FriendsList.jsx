import { useState } from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material"

const AddFriendDialog = () => {
    const [open, setOpen] = useState(false);

    const handleAddFriend = () => { setOpen(false) };

    return (<>
        <Button variant="outlined" sx={{ margin: "5px" }} onClick={() => { setOpen(true) }}>Add friend</Button>
        <Dialog open={open} onClose={setOpen(false)}>
            <DialogTitle>Add New Friend</DialogTitle>
            <DialogContent>
                <DialogContentText></DialogContentText>
            </DialogContent>
            <DialogActions>
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
