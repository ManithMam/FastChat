import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from "@mui/material";
import { deleteAccount } from "../../../api/DeleteUser";
import { UserAuth } from "../../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function DeleteAccountDialog({open, setOpen}){    

    const {logOut} = UserAuth();
    const navigate = useNavigate();

    function logOutUser(){
        logOut();
        navigate("/signup");
    }    

    function handleClose(){
        setOpen(false)
    }

    return(
        <Dialog open={open}>
            <DialogTitle>Delete account</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To delete the account confirm by clicking the DELETE button.
                </DialogContentText>
                <DialogActions sx={{display: "flex", flexDirection: "column"}}>
                    <Button sx={{ mb: "35px", mt: "20px"}} onClick={() => {logOutUser(), deleteAccount()}} variant="contained" size="large">DELETE</Button>
                    <Button onClick={() => handleClose()}>Cancel</Button>                    
                </DialogActions>
                
            </DialogContent>
        </Dialog>
    )
}

export default DeleteAccountDialog;