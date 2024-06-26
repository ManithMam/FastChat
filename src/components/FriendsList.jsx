import { useState, useEffect } from "react";
import { List, ListItem, ListItemButton, ListItemText, ListItemAvatar, Avatar } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from "@mui/material"
import { getDatabase, ref, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import { UserAuth } from "../context/AuthContext";
import { createChat } from "../_api/ChatApi";


const userList = [];

get(ref(getDatabase(), 'users/'))
    .then((snapshot) => { snapshot.forEach((child) => {userList.push(child.val())}) })

const AddFriendDialog = () => {

    const { user } = UserAuth();
    
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleAddFriend = (id) => { addFriend(id); setOpen(false) };
    const handleSearch = (event) => { setSearchQuery(event.target.value); }

    return (<>
        <Button variant="outlined" sx={{ margin: "10px" }} onClick={() => {setOpen(true)}}>Add Contact</Button>
        <Dialog open={open}>
            <DialogTitle>Add New Contact</DialogTitle>
            <DialogContent>
                <DialogContentText>Search for the user's name that you want to save as a contact.</DialogContentText>
                <TextField sx={{margin: '10px 0'}} label="Search" type="search" variant="outlined" onChange={handleSearch}/>
                <List>
                    {searchQuery.length == 0 ? [] : userList.map((item, index) => (item.displayName.toLowerCase().includes(searchQuery) || item.userName.toLowerCase().includes(searchQuery) ?
                        <ListItem key={index} disablePadding>
                            <ListItemButton onClick={() => { createChat(user, item.id); setOpen(false); }}>
                                <ListItemAvatar>
                                    <Avatar src={item.profile_picture}/>
                                </ListItemAvatar>
                                <ListItemText primary={item.displayName} secondary={item.userName} />
                            </ListItemButton>
                        </ListItem> : null
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {setOpen(false)}}>Cancel</Button>
            </DialogActions>
        </Dialog>
    </>)
}

export default AddFriendDialog;
