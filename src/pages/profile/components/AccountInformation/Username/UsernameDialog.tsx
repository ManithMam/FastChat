import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField } from "@mui/material"
import { useState } from "react"
import { updateUsername, newUsernameIsNotUnique } from "../../../api/UpdateUsername"
import { InformationDialogPropTypes } from "../Types/InformationDialogPropTypes"
import { UserAuth } from "../../../../../context/AuthContext";

function UsernameDialog({ open, setOpen, setInformation }: InformationDialogPropTypes) {

    const {fastchatUser, updateFastchatUser} = UserAuth();

    const [nameError, setNameError] = useState(false)

    const [errorText, setErrorText] = useState('')

    const [newName, setNewName] = useState('')

    function handleClose() {
        setOpen(false)
        setNewName('')
        setNameError(false)
    }

    const isLowerCase = (newName: string, setNameError: React.Dispatch<React.SetStateAction<boolean>>, setErrorText: React.Dispatch<React.SetStateAction<string>>) => {
        const lowerCaseName = newName.toLowerCase();

        if (lowerCaseName == newName) {
            return true;
        }
        else {
            setNameError(true);
            setErrorText("Username has to be lowercase");
            return false;
        }

    }

    const isNotEmpty = (newName: string, setNameError: React.Dispatch<React.SetStateAction<boolean>>, setErrorText: React.Dispatch<React.SetStateAction<string>>) => {

        if (newName == '') {
            setNameError(true)
            setErrorText("Field can not be empty");
            return false;
        }

        return true;
    }

    const isValid = async () => {
        let isValid = true;

        if (isNotEmpty(newName, setNameError, setErrorText) == false) {
            console.log("empty")
            isValid = false;
            return isValid;
        }

        if (isLowerCase(newName, setNameError, setErrorText) == false) {
            console.log("lowercase")
            isValid = false;
            return isValid;
        }

        if (await newUsernameIsNotUnique(newName, setNameError, setErrorText)) {
            console.log("nnot unique")
            isValid = false;
            return isValid;
        }

        return isValid;
    }

    const handleUsernameChange = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (await isValid()) {
            updateUsername(event, setInformation, newName);
            setOpen(false); 
            fastchatUser!.userName = newName;
            updateFastchatUser(fastchatUser!);
        }
    }

    return (
        <Dialog open={open} PaperProps={{
            sx: {
                width: "50%",
                maxHeight: 300
            }
        }}>
            <DialogTitle className="bg-primary text-white"><p className=" text-slate-100">Change Username</p></DialogTitle>
            <DialogContent className="bg-primary">
                <DialogContentText sx={{ color: "white" }}>
                    Enter new username.
                </DialogContentText>
                <form autoComplete="off">
                    <TextField
                        label="Username"
                        sx={{ input: { color: "white" } }}
                        autoFocus
                        margin="dense"
                        id="name"
                        fullWidth
                        variant="outlined"
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
                        onChange={(event) => { setNewName(event.target.value) }}
                        error={nameError}
                        helperText={nameError == true ? errorText : ''}
                    />
                    <DialogActions>
                        <Button onClick={handleClose} type="button" sx={{ color: "white" }}>Cancel</Button>
                        <Button onClick={async (event) => handleUsernameChange(event)} color="secondary" variant="contained">Submit</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UsernameDialog; 
