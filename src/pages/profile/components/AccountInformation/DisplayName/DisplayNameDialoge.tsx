import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField } from "@mui/material"
import { useState } from "react"
import { updateUserDisplayName } from "../../../api/UpdateDisplayName";
import { InformationDialogPropTypes } from "../Types/InformationDialogPropTypes";

function DisplayNameDialoge({open, setOpen, setInformation}: InformationDialogPropTypes){

    const [nameError, setNameError] = useState(false)

    const [newName, setNewName] = useState('')    

    function handleClose(){
        setOpen(false)
        setNewName('')
        setNameError(false)
    }   

    const isNotEmpty = (newName: string, setNameError: React.Dispatch<React.SetStateAction<boolean>>) => {

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
                <DialogTitle className="bg-primary text-white">Change Display Name</DialogTitle>
                <DialogContent className="bg-primary">
                    <DialogContentText sx={{color: "white"}}>
                        Enter new display name.
                    </DialogContentText>
                    <form autoComplete="off">  
                        <TextField                        
                        sx={{input: {color: "white"}}}
                        autoFocus
                        margin="dense"
                        id="name"                       
                        fullWidth
                        type="text"
                        variant="outlined"
                        label="Display Name"
                        inputProps={{
                            style: {
                                color: '#FFFFFF',
                                fontSize: '15px'
                            }
                        }}
                        InputLabelProps={{
                            style: {
                                color: '#BF8AB1',
                                fontSize: '15px'
                            }
                        }}
                        onChange={(event) => {setNewName(event.target.value)}}                                                                  
                        error={nameError}   
                        helperText={nameError == true ? 'Field can not be empty.' : ''}                         
                        />
                        <DialogActions>
                            <Button onClick={handleClose} type="button" sx={{color: "white"}}>Cancel</Button>
                            <Button onClick={event => { if(isNotEmpty(newName, setNameError)) {updateUserDisplayName(event, setInformation, newName), setOpen(false)}}} variant="contained" color="secondary" >Submit</Button>                    
                        </DialogActions>
                    </form>                    
                </DialogContent>                
            </Dialog>
    )
}

export default DisplayNameDialoge;
