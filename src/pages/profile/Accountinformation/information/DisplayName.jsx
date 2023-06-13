import { UserAuth } from "../../../../context/AuthContext";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField } from "@mui/material"
import { useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";

function DisplayName (){
 
    const {user} = UserAuth();   

    const [open, setOpen] = useState(false)

    const [newName, setNewName] = useState('')

    const [name, setName] = useState(user.displayName)

    useEffect(() => {
        if(user?.uid) {
          setName(user.displayName)
        }
      }, [user])

    function handleOpen(){
        setOpen(true)
    }

    function handleClose(){
        setOpen(false)
        setNewName('')
    }  

    function updateUserDisplayName(){

        if(newName == ''){
            alert('Please Enter a new name before submiting')
            return
        }

        if(newName == user.displayName){
            alert('Please Enter a new name before submiting')
            return
        }

        console.log(newName)   
        updateProfile(user, {
            displayName: newName
        })             
        setName(newName)   

        setOpen(false)
    }   

    return (        
        <div className=" flex flex-row mb-20">
            <div className=" flex flex-grow flex-col">
                <h1 className=" text-slate-100 font-bold text-2xl">Display Name</h1>
                <p className=" text-slate-100">{name}</p>                    
            </div>    
        <div className=" flex items-center">
            <Button variant="contained" color="button" size="large" onClick={handleOpen}>Change</Button>    

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Change Display Name</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter new display name.
                    </DialogContentText>
                    <form>  
                        <TextField
                        autoFocus
                        margine="dense"
                        id="name"                       
                        fullWidth
                        variant="standard"
                        onChange={(event) => {setNewName(event.target.value)}}                                   
                        />
                        <DialogActions>
                        <Button onClick={handleClose} color="button" variant="contained" type="button">Cancel</Button>
                        <Button onClick={updateUserDisplayName} color="button" variant="contained" type="button">Submit</Button>                    
                        </DialogActions>
                    </form>                    
                </DialogContent>                
            </Dialog>

        </div>                  
    </div>         
    )
}

export default DisplayName;