import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField } from "@mui/material"
import { useState } from "react"
import { updatePasswort } from "../../../api/UpdatePassword"


function PasswordDialoge({open, setOpen}){

    const [passwordError, setPasswordError] = useState(false)

    const [newPassword, setNewPassword] = useState('')    

    function handleClose(){
        setOpen(false)
        setNewPassword('')
        setPasswordError(false)
    }   

    const isNotEmpty = (newPassword, setPasswordError) => {

        if(newPassword == ''){
            setPasswordError(true)         
            return false; 
        }      

        return true;
    }

    return(
        <Dialog open={open}>
                <DialogTitle>Change Password</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter new password.
                    </DialogContentText>
                    <form autoComplete="off">  
                        <TextField
                        autoFocus
                        margin="dense"
                        id="name"                       
                        fullWidth
                        variant="outlined"
                        onChange={(event) => {setNewPassword(event.target.value)}}                                                                  
                        error={passwordError}   
                        helperText={passwordError == true ? 'Please Enter a email.' : ''}                         
                        />
                        <DialogActions>
                            <Button onClick={handleClose} color="button" variant="contained" type="button">Cancel</Button>
                            <Button onClick={event => { if(isNotEmpty(newPassword, setPasswordError)) {updatePasswort(event, newPassword), setOpen(false)}}} color="button" variant="contained">Submit</Button>                    
                        </DialogActions>
                    </form>                    
                </DialogContent>                
            </Dialog>
    )
}

export default PasswordDialoge;