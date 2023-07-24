import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, DialogContentText } from "@mui/material";
import { useState } from "react";
import { ReauthenticateWithEmailAndPassword, ReauthenticateWithGoogle } from "../api/ReAuthenticate";
import EmailDialoge from "./AccountInformation/information/Email/EmailDialoge";

function CredentialsDialog({open, setOpen, setInformation}){

    const [emailCredentials, setEmailCredentials] = useState('');
    const [password, setPassword] = useState('');
    const [openEmailDialog, setOpenEmailDialog] = useState(false);  

    function handleClose(){
        setEmailCredentials('');
        setPassword('');
        setOpen(false);
    }   

    function handleOpenEmailDialog(){
        setEmailCredentials('');
        setPassword('');
        setOpen(false);
        setOpenEmailDialog(true)
    }

    return(
        <>
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
                    onChange={(event) => {setEmailCredentials(event.target.value)}}
                    />
                    <DialogContentText>
                        Password
                    </DialogContentText>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    onChange={(event) => {setPassword(event.target.value)}}
                    />
                     <DialogContentText className=" text-center">
                        Or
                    </DialogContentText>
                    <DialogActions sx={{ display: 'flex', justifyContent: "center"}}>
                        <Button variant="contained" onClick={() => {if(ReauthenticateWithGoogle()) {handleOpenEmailDialog()}}}>Log in with Google</Button>
                    </DialogActions>

                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={() => {if(ReauthenticateWithEmailAndPassword(emailCredentials, password)) {handleOpenEmailDialog()}}} >Submit</Button>
                    </DialogActions>          

                </form>
            </DialogContent>
        </Dialog>

        <EmailDialoge open={openEmailDialog} setOpen={setOpenEmailDialog} setInformation={setInformation}/>
        </>
    ) 

   

}

export default CredentialsDialog;