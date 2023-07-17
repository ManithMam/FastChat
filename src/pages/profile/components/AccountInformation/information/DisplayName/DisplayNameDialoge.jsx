import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField } from "@mui/material"
import { useState } from "react"
import { updateProfile } from "firebase/auth";

function DisplayNameDialoge({open, setOpen, setNewName, setName, newName, user}){

    const [nameError, setNameError] = useState(false)

    function handleClose(){
        setOpen(false)
        setNewName('')
        setNameError(false)
    }    

    function updateUserDisplayName(event){

        event.preventDefault()      

        if(newName == ''){
            setNameError(true)    
            return        
        }

        if(newName == user.displayName){
            setNameError(true)        
            return   
        }
         
        updateProfile(user, {
            displayName: newName
        })             
        setName(newName)          
        setNameError(false)
        setOpen(false)
    }   

    return(
        <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Change Display Name</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter new display name.
                    </DialogContentText>
                    <form autoComplete="off" onSubmit={updateUserDisplayName}>  
                        <TextField
                        autoFocus
                        margin="dense"
                        id="name"                       
                        fullWidth
                        variant="outlined"
                        onChange={(event) => {setNewName(event.target.value)}}   
                        required    
                        error={nameError}   
                        helperText={nameError == true ? 'Please Enter a name.' : ''}                         
                        />
                        <DialogActions>
                            <Button onClick={handleClose} color="button" variant="contained" type="button">Cancel</Button>
                            <Button onClick={updateUserDisplayName} color="button" variant="contained" type="submit">Submit</Button>                    
                        </DialogActions>
                    </form>                    
                </DialogContent>                
            </Dialog>
    )
}

export default DisplayNameDialoge;