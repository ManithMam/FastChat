import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField } from "@mui/material"
import { useState } from "react"
import { updateUserEmail } from "../../../api/UpdateEmailInformation";
import { InformationDialogPropTypes } from "../Types/InformationDialogPropTypes";
import { UserAuth } from "../../../../../context/AuthContext";

function EmailDialoge({ open, setOpen, setInformation }: InformationDialogPropTypes) {

    const { fastchatUser, updateFastchatUser } = UserAuth();

    const [emailError, setEmailError] = useState(false)

    const [errorText, setErrorText] = useState('')

    const [newEmail, setNewEmail] = useState('')

    const emailRegex = /^\S+@\S+\.\S+$/;

    function isEmail(newEmail: string) {

        if (!emailRegex.test(newEmail.trim())) {
            setErrorText("Should be a email.")
            return false;
        }

        return true;

    }

    function handleClose() {
        setOpen(false)
        setNewEmail('')
        setEmailError(false)
    }

    const isNotEmpty = (newEmail: string, setEmailError: React.Dispatch<React.SetStateAction<boolean>>) => {

        if (newEmail == '') {
            setEmailError(true)
            setErrorText("Should not be empty.")
            return false;
        }

        return true;
    }

    const isValid = () => {

        let isValid = true;

        if (isNotEmpty(newEmail, setEmailError) == false) {
            isValid = false;
            return isValid;
        }

        if (isEmail(newEmail) == false) {
            isValid = false;
            return isValid;
        }

        return isValid;
    }

    const handleEmailChange = async () => {
        
        if (isValid()) {
            if (await updateUserEmail(setInformation, newEmail, setErrorText)) {
                handleClose()
                fastchatUser!.email = newEmail;
                updateFastchatUser(fastchatUser!);
            } else {
                setEmailError(true)
            }
        }
    }

    return (
        <Dialog open={open} PaperProps={{
            sx: {
                width: "50%",
                maxHeight: 300
            }
        }}>
            <DialogTitle className="bg-primary text-white"><p className=" text-slate-100">Change Email</p></DialogTitle>
            <DialogContent className="bg-primary">
                <DialogContentText sx={{ color: "white" }}>
                    Enter new email.
                </DialogContentText>
                <form autoComplete="off">
                    <TextField
                        label="Email"
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
                        sx={{ input: { color: "white" } }}
                        autoFocus
                        margin="dense"
                        id="name"
                        fullWidth
                        variant="outlined"
                        onChange={(event) => { setNewEmail(event.target.value) }}
                        error={emailError}
                        helperText={emailError == true ? errorText : ''}
                    />
                    <DialogActions>
                        <Button onClick={handleClose} type="button" sx={{ color: "white" }}>Cancel</Button>
                        <Button onClick={async () => handleEmailChange()} color="secondary" variant="contained">Submit</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EmailDialoge;