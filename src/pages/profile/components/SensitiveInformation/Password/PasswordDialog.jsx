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
        <Dialog open={open} PaperProps={{
            sx: {
              width: "50%",
              maxHeight: 300
            }
          }}>
                <DialogTitle className="bg-primary text-white">Change Password</DialogTitle>
                <DialogContent className="bg-primary">
                    <DialogContentText sx={{color: "white"}}>
                        Enter new password.
                    </DialogContentText>
                    <form autoComplete="off">  
                        <TextField
                        className=" bg-textfield"
                        sx={{input: {color: "white"}}}
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
                            <Button onClick={handleClose} type="button" sx={{color: "white"}}>Cancel</Button>
                            <Button onClick={event => { if(isNotEmpty(newPassword, setPasswordError)) {updatePasswort(event, newPassword), setOpen(false)}}} color="button" variant="contained">Submit</Button>                    
                        </DialogActions>
                    </form>                    
                </DialogContent>                
            </Dialog>
    )
}

export default PasswordDialoge;