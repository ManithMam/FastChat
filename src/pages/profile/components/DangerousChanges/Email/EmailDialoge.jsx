import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField } from "@mui/material"
import { useState } from "react"
import { updateProfile } from "firebase/auth";
import { updateUserEmail } from "../../../api/UpdateEmailInformation";


function EmailDialoge({open, setOpen, setInformation}){

    const [emailError, setEmailError] = useState(false)

    const [newEmail, setNewEmail] = useState('')    

    function handleClose(){
        setOpen(false)
        setNewEmail('')
        setEmailError(false)
    }   

    const isNotEmpty = (newEmail, setEmailError) => {

        if(newEmail == ''){
            setEmailError(true)         
            return false; 
        }      

        return true;
    }

    return(
        <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Change Email</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter new email.
                    </DialogContentText>
                    <form autoComplete="off">  
                        <TextField
                        autoFocus
                        margin="dense"
                        id="name"                       
                        fullWidth
                        variant="outlined"
                        onChange={(event) => {setNewEmail(event.target.value)}}                                                                  
                        error={emailError}   
                        helperText={emailError == true ? 'Please Enter a email.' : ''}                         
                        />
                        <DialogActions>
                            <Button onClick={handleClose} color="button" variant="contained" type="button">Cancel</Button>
                            <Button onClick={event => { if(isNotEmpty(newEmail, setEmailError)) {updateUserEmail(event, setInformation, newEmail), setOpen(false)}}} color="button" variant="contained">Submit</Button>                    
                        </DialogActions>
                    </form>                    
                </DialogContent>                
            </Dialog>
    )
}

export default EmailDialoge;