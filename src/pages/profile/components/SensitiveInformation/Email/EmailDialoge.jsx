import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField } from "@mui/material"
import { useState } from "react"
import { updateProfile } from "firebase/auth";
import { updateUserEmail } from "../../../api/UpdateEmailInformation";
import { useEffect } from "react";


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
        <Dialog open={open} PaperProps={{
            sx: {
              width: "50%",
              maxHeight: 300
            }
          }}>
                <DialogTitle className="bg-primary text-white"><p className=" text-slate-100">Change Email</p></DialogTitle>
                <DialogContent  className="bg-primary">
                    <DialogContentText sx={{color: "white"}}>
                        Enter new email.
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
                        onChange={(event) => {setNewEmail(event.target.value)}}                                                                  
                        error={emailError}   
                        helperText={emailError == true ? 'Please Enter a valid email.' : ''}                         
                        />
                        <DialogActions>
                            <Button onClick={handleClose} type="button" sx={{color: "white"}}>Cancel</Button>
                            <Button onClick={event => { if(isNotEmpty(newEmail, setEmailError)) {updateUserEmail(event, setInformation, newEmail), setOpen(false)}}} color="button" variant="contained">Submit</Button>                    
                        </DialogActions>
                    </form>                    
                </DialogContent>                
            </Dialog>
    )
}

export default EmailDialoge;