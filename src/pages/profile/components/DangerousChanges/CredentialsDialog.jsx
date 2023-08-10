import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, DialogContentText } from "@mui/material";
import { useState } from "react";
import { ReauthenticateWithEmailAndPassword } from "../../api/ReAuthenticate";


function CredentialsDialog({open, setOpen, setInformation, InformationDialog: Dialoge}){

    const [emailCredentials, setEmailCredentials] = useState('');
    const [password, setPassword] = useState('');
    const [openDialog, setOpenDialog] = useState(false);  
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [helperTextEmail, setHelperTextEmail] = useState('');
    const [helperTextPassword, setHelperTextPassword] = useState('');
    
    const emailRegex = /^\S+@\S+\.\S+$/;

    function handleClose(){
        setEmailCredentials('');
        setPassword('');
        setOpen(false);
        resetHelperText();
        resetErrors();
    }   

    function handleOpenEmailDialog(){
        setEmailCredentials('');
        setPassword('');
        setOpen(false);
        setOpenDialog(true)
    }

    function resetHelperText(){
        setHelperTextEmail('')
        setHelperTextPassword('')
    }

    function resetErrors(){
        setErrorEmail(false)
        setErrorPassword(false)        
    }

    function handleWrongCredentials(){
        setErrorEmail(true)
        setErrorPassword(true)        
    }

    function passwordTest(password){

        if(password == ""){           
            setHelperTextPassword("Password should not be empty.")
            return false;
        }
    }

    function emailTest(email){

        if(email == ""){            
            setHelperTextEmail("Email should not be empty.")
            return false;
        }

        if (!emailRegex.test(email.trim())) {           
            setHelperTextEmail("Should be a email.")
            return false;
        }        

    }  

    function credentialsTestFailed(email, password){
        let atLeastOneWrong = false;
        resetErrors();
        resetHelperText();       
        
        if(emailTest(email) == false){  
            setErrorEmail(true)          
            atLeastOneWrong = true
        }

        if(passwordTest(password) == false){            
            setErrorPassword(true)
            atLeastOneWrong = true
        }       
      
        return atLeastOneWrong;
    }

    async function handleSubmit(email, password, setHelperTextPassword){

        let succesfullSubmit = false

        if(credentialsTestFailed(email, password) == true){
            handleWrongCredentials();
        }
        
        if(await ReauthenticateWithEmailAndPassword(email, password, setHelperTextPassword)){            
            succesfullSubmit = true
        }             

        if(succesfullSubmit){          
            handleOpenEmailDialog();
        }
        else{           
            handleWrongCredentials();
        }       
    }

    return(
        <>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Enter credentials</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You need to re-enter your credentials before you are able to change sensitive information.
                </DialogContentText>
                <form autoComplete="off" className="flex flex-col">

                    <DialogContentText>
                        Email
                    </DialogContentText>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    variant="outlined"
                    error={errorEmail}
                    helperText={errorEmail == true ? helperTextEmail : ""}
                    onChange={(event) => {setEmailCredentials(event.target.value)}}
                    />

                    <DialogContentText>
                        Password
                    </DialogContentText>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    error={errorPassword}
                    helperText={errorPassword == true ? helperTextPassword : ""}
                    onChange={(event) => {setPassword(event.target.value)}}
                    />                                 

                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={() => {handleSubmit(emailCredentials, password, setHelperTextPassword)}}>Submit</Button>
                    </DialogActions>          

                </form>
            </DialogContent>
        </Dialog>

        <Dialoge open={openDialog} setOpen={setOpenDialog} setInformation={setInformation}/>
        </>
    ) 
}

export default CredentialsDialog;