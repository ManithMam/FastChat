import { ThemeProvider } from "@emotion/react";
import { UserAuth } from "../../../../context/AuthContext";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField } from "@mui/material"
import { useState } from "react";
import { red } from "@mui/material/colors";



function DisplayName (){
 
    const {user} = UserAuth();   

    const [open, setOpen] = useState(false)

    function handleOpen(){
        setOpen(true)
    }

    function handleClose(){
        setOpen(false)
    }

    return (        
        <div className=" flex flex-row mb-20">
            <div className=" flex flex-grow flex-col">
                <h1 className=" text-slate-100 font-bold text-2xl">Display Name</h1>
                <p className=" text-slate-100">{user.displayName}</p>                    
            </div>    
        <div className=" flex items-center">
            <Button variant="contained" color="button" size="large" onClick={handleOpen}>Change</Button>   

           
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <DialogContentText>
                        Enter new display name.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margine="dense"
                        id="name"
                        label="New Display Name"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="button" variant="contained">Cancel</Button>
                    <Button color="button" variant="contained">Submit</Button>                    
                </DialogActions>
            </Dialog>       

        </div>                  
    </div>         
    )
}

export default DisplayName;