import { useState } from "react";
import { List, ListItem, ListItemButton, ListItemText, ListItemAvatar, Avatar } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from "@mui/material"
import { getDatabase, ref, get } from "firebase/database";


const allUsers = [];

get(ref(getDatabase(), 'users/'))
    .then((snapshot) => { snapshot.forEach((child) => {allUsers.push(child.val())}) })

const AddFriendDialog = () => {
    
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(allUsers);

    const handleAddFriend = () => { setOpen(false) };
    const handleCloseDialog = () => { setSearchQuery(''); setOpen(false); }; // Ich muss das Schließen des Dialogs in dieser Funktion durchführen, weil React ansonsten einen too many re-renders Fehler wirft wenn man setOpen direkt in der property aufruft
    const handleSearch = (event) => { setSearchQuery(event.target.value); }

    return (<>
        <Button variant="outlined" sx={{ margin: "5px" }} onClick={() => {setOpen(true)}}>Add friend</Button>
        <Dialog open={open}>
            <DialogTitle>Add New Friend</DialogTitle>
            <DialogContent>
                <DialogContentText>Search for the user's name that you want to add as a friend.</DialogContentText>
                <TextField sx={{margin: '10px 0'}} label="Search" type="search" variant="outlined" onChange={handleSearch}/>
                <List>
                    {searchQuery.length == 0 ? [] : searchResults.map((item, index) => (item.displayName.includes(searchQuery) ?
                        <ListItem key={index} disablePadding>
                            <ListItemButton onClick={handleAddFriend}>
                                <ListItemAvatar>
                                    <Avatar src={item.profile_picture}/>
                                </ListItemAvatar>
                                <ListItemText primary={item.displayName} />
                            </ListItemButton>
                        </ListItem> : null
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
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
