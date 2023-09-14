import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField } from "@mui/material"
import { useState } from "react"
import { updateUserPassword } from "../../../api/UpdatePassword"
import { InformationDialogPropTypes } from "../Types/InformationDialogPropTypes"

function PasswordDialoge({open, setOpen}: InformationDialogPropTypes){

    const [passwordError, setPasswordError] = useState(false)

    const [newPassword, setNewPassword] = useState('')    

    function handleClose(){
        setOpen(false)
        setNewPassword('')
        setPasswordError(false)
    }   

    const isNotEmpty = (newPassword: string, setPasswordError: React.Dispatch<React.SetStateAction<boolean>>) => {

        if(newPassword == ''){
            setPasswordError(true)         
            return false; 
        }      

        return true;
    }

    const handlePasswordChange = async (newPassword: string, setPasswordError: React.Dispatch<React.SetStateAction<boolean>>) => {
        if(isNotEmpty(newPassword, setPasswordError)){
            await updateUserPassword(newPassword)
            setOpen(false)
        }
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
                        label="Password"
                        type="password"
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
                            <Button onClick={ async () => {await handlePasswordChange(newPassword, setPasswordError)}} color="secondary" variant="contained">Submit</Button>                    
                        </DialogActions>
                    </form>                    
                </DialogContent>                
            </Dialog>
    )
}

export default PasswordDialoge;