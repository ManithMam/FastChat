import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from "@mui/material";
import { deleteAccount } from "../../../api/DeleteUser";
import { InformationDialogPropTypes } from "../Types/InformationDialogPropTypes";

function DeleteAccountDialog({open, setOpen}: InformationDialogPropTypes){      

    function handleClose(){
        setOpen(false)
    }

    return(
        <Dialog open={open} PaperProps={{
            sx: {
              width: "50%",
              maxHeight: 300
            }
          }}>
            <DialogTitle className="bg-primary text-white">Delete account</DialogTitle>
            <DialogContent className="bg-primary">
                <DialogContentText sx={{color: "white"}}>
                    To delete the account confirm by clicking the DELETE button.
                </DialogContentText>
                <DialogActions sx={{display: "flex", flexDirection: "column"}}>
                    <Button sx={{ mb: "35px", mt: "20px"}} onClick={() => {deleteAccount()}} variant="contained" size="large" color="secondary" >DELETE</Button>
                    <Button onClick={() => handleClose()} sx={{color: "white"}}>Cancel</Button>                    
                </DialogActions>                
            </DialogContent>
        </Dialog>
    )
}

export default DeleteAccountDialog;