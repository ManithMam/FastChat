import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField } from "@mui/material"
import { useState } from "react"
import { updateUserDisplayName } from "../../../api/UpdateDisplayName";

function DisplayNameDialoge({open, setOpen, setInformation}){

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
                        helperText={nameError == true ? 'Field can not be empty.' : ''}                         
                        />
                        <DialogActions>
                            <Button onClick={handleClose} color="button" variant="contained" type="button">Cancel</Button>
                            <Button onClick={event => { if(isNotEmpty(newName, setNameError)) {updateUserDisplayName(event, setInformation, newName), setOpen(false)}}} color="button" variant="contained">Submit</Button>                    
                        </DialogActions>
                    </form>                    
                </DialogContent>                
            </Dialog>
    )
}

export default DisplayNameDialoge;