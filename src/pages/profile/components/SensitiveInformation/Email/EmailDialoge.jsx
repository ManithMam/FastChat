import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField } from "@mui/material"
import { useState } from "react"
import { updateUserEmail } from "../../../api/UpdateEmailInformation";

function EmailDialoge({open, setOpen, setInformation}){
    
    const [emailError, setEmailError] = useState(false)

    const [errorText, setErrorText] = useState('')

    const [newEmail, setNewEmail] = useState('')    

    const emailRegex = /^\S+@\S+\.\S+$/;

    function isEmail(newEmail){        

        if (!emailRegex.test(newEmail.trim())) {           
            setErrorText("Should be a email.")
            return false;
        }        

        return true;

    }  

    function handleClose(){
        setOpen(false)
        setNewEmail('')
        setEmailError(false)
    }   

    const isNotEmpty = (newEmail, setEmailError) => {

        if(newEmail == ''){
            setEmailError(true)      
            setErrorText("Should not be empty.")   
            return false; 
        }      

        return true;
    }

    const isValid = () => {

        let isValid = true;

        if(isNotEmpty(newEmail, setEmailError) == false){
            isValid = false;
            return isValid;
        }

        if(isEmail(newEmail) == false){
            isValid = false;
            return isValid;
        }

        return isValid;
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
                        helperText={emailError == true ? errorText : ''}                         
                        />
                        <DialogActions>
                            <Button onClick={handleClose} type="button" sx={{color: "white"}}>Cancel</Button>
                            <Button onClick={event => { if(isValid()) {updateUserEmail(event, setInformation, newEmail, setErrorText) ? setOpen(false) : setEmailError(true)}}} color="button" variant="contained">Submit</Button>                    
                        </DialogActions>
                    </form>                    
                </DialogContent>                
            </Dialog>
    )
}

export default EmailDialoge;