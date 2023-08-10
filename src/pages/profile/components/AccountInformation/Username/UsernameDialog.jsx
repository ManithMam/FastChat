import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField } from "@mui/material"
import { useState } from "react"
import { updateUsername } from "../../../api/UpdateUsername"

function UsernameDialog({open, setOpen, setInformation}){

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
        <Dialog open={open}>
                <DialogTitle>Change Username</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter new username.
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
                        helperText={nameError == true ? 'Field can not be empty.' : ''}                         
                        />
                        <DialogActions>
                            <Button onClick={handleClose} color="button" variant="contained" type="button">Cancel</Button>
                            <Button onClick={event => { if(isNotEmpty(newName, setNameError)) {updateUsername(event, setInformation, newName), setOpen(false)}}} color="button" variant="contained">Submit</Button>                    
                        </DialogActions>
                    </form>                    
                </DialogContent>                
            </Dialog>
    )
}

export default UsernameDialog; 