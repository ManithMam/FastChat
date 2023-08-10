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
        <Dialog open={open} PaperProps={{
            sx: {
              width: "50%",
              maxHeight: 300
            }
          }}>
                <DialogTitle className="bg-primary"><p className=" text-slate-100">Change Username</p></DialogTitle>
                <DialogContent className="bg-primary">
                    <DialogContentText>
                        <p className=" text-slate-100">Enter new username.</p>
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
                        onChange={(event) => {setNewName(event.target.value)}}                                                                  
                        error={nameError}   
                        helperText={nameError == true ? 'Field can not be empty.' : ''}                         
                        />
                        <DialogActions>
                            <Button onClick={handleClose} type="button"><p className=" text-slate-100">Cancel</p></Button>
                            <Button onClick={event => { if(isNotEmpty(newName, setNameError)) {updateUsername(event, setInformation, newName), setOpen(false)}}} color="button" variant="contained">Submit</Button>                    
                        </DialogActions>
                    </form>                    
                </DialogContent>                
            </Dialog>
    )
}

export default UsernameDialog; 