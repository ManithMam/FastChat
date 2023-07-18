import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField } from "@mui/material"
import { useState } from "react"
import { updateProfile } from "firebase/auth";
import { updateUserDisplayName } from "../../../../api/UpdateAccountInformation";

function DisplayNameDialoge({open, setOpen, setName}){

    const [nameError, setNameError] = useState(false)

    const [newName, setNewName] = useState('')    

    function handleClose(){
        setOpen(false)
        setNewName('')
        setNameError(false)
    }   

    const isNotEmpty = (newName, setNameError) => {

        if(newName == ''){
            setNameError(true)         
            return false; 
        }      

        return true;
    }

    return(
        <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Change Display Name</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter new display name.
                    </DialogContentText>
                    <form autoComplete="off">  
                        <TextField
                        autoFocus
                        margin="dense"
                        id="name"                       
                        fullWidth
                        variant="outlined"
                        onChange={(event) => {setNewName(event.target.value)}}                                                                  
                        error={nameError}   
                        helperText={nameError == true ? 'Please Enter a name.' : ''}                         
                        />
                        <DialogActions>
                            <Button onClick={handleClose} color="button" variant="contained" type="button">Cancel</Button>
                            <Button onClick={event => { if(isNotEmpty(newName, setNameError)) {updateUserDisplayName(event, setName, newName), setOpen(false)}}} color="button" variant="contained">Submit</Button>                    
                        </DialogActions>
                    </form>                    
                </DialogContent>                
            </Dialog>
    )
}

export default DisplayNameDialoge;