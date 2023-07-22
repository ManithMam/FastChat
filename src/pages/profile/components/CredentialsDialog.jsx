import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, DialogContentText } from "@mui/material";
import { useState } from "react";
import { ReauthenticateWithEmailAndPassword, ReauthenticateWithGoogle } from "../api/ReAuthenticate";

function CredentialsDialog({open, setOpen}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openEmailDialog, setOpenEmailDialog] = useState(false);

    function handleClose(){
        setOpen(false)       
    }   

    return(
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Enter credentials</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You need to re-enter your credentials before you are able to change sensitive information.
                </DialogContentText>
                <form autoComplete="off" className="flex flex-col">
                    <DialogContentText>
                        Email
                    </DialogContentText>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    variant="outlined"
                    />
                    <DialogContentText>
                        Password
                    </DialogContentText>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    />
                     <DialogContentText className=" text-center">
                        Or
                    </DialogContentText>
                    <DialogActions sx={{ display: 'flex', justifyContent: "center"}}>
                        <Button variant="contained" onClick={() => console.log("Works")}>Log in with Google</Button>
                    </DialogActions>
                    <DialogActions>
                        <Button>Cancel</Button>
                        <Button>Submit</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    )

}

export default CredentialsDialog;