import { useState, useEffect } from "react";
import { List, ListItem, ListItemButton, ListItemText, ListItemAvatar, Avatar } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from "@mui/material"
import { getDatabase, ref, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import { addFriend } from "../_api/HandleFriendRequests.ts";


const userList = [];

get(ref(getDatabase(), 'users/'))
    .then((snapshot) => { snapshot.forEach((child) => {userList.push(child.val())}) })

const AddFriendDialog = () => {
    
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleAddFriend = (id) => { addFriend(id); setOpen(false) };
    const handleSearch = (event) => { setSearchQuery(event.target.value); }

    return (<>
        <Button variant="outlined" sx={{ margin: "5px" }} onClick={() => {setOpen(true)}}>Add friend</Button>
        <Dialog open={open}>
            <DialogTitle>Add New Friend</DialogTitle>
            <DialogContent>
                <DialogContentText>Search for the user's name that you want to add as a friend.</DialogContentText>
                <TextField sx={{margin: '10px 0'}} label="Search" type="search" variant="outlined" onChange={handleSearch}/>
                <List>
                    {searchQuery.length == 0 ? [] : userList.map((item, index) => (item.displayName.toLowerCase().includes(searchQuery) ?
                        <ListItem key={index} disablePadding>
                            <ListItemButton onClick={() => { addFriend(userList[index].id); setOpen(false) }}>
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

const FriendsList = () => {
    const contactList = [];
    const [contacts, setContacts] = useState(contactList);

    useEffect(() => { get(ref(getDatabase(), 'users/' + getAuth().currentUser.uid + '/contacts/'))
                        .then((snapshot) => {snapshot.forEach((contact) => {contactList.push(contact.val())})}).then(() => {setContacts(contactList)}) });


    return <>
        <AddFriendDialog />
        <Divider />
        <List>
            {contacts.map((item, index) => (
                <ListItem sx={{margin: "10px"}} key={index} disablePadding>
                    <ListItemAvatar>
                        <Avatar src={item.profile_picture} />
                    </ListItemAvatar>
                    <ListItemText sx={{ color: "white" }} primary={item} secondary={item.userName} />
                </ListItem>
            ))}
        </List>
    </>
};

export default FriendsList;
