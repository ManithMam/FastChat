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
        <Dialog open={open}>
            <DialogTitle className="bg-primary text-white">Enter credentials</DialogTitle>
            <DialogContent className="bg-primary">
                <DialogContentText sx={{color: "white"}} >
                    You need to re-enter your credentials before you are able to change sensitive information.
                </DialogContentText>
                <form autoComplete="off" className="flex flex-col" >

                    <DialogContentText sx={{color: "white"}}>
                        Email
                    </DialogContentText>
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
                    sx={{input: {color: "white"}}}
                    autoFocus
                    margin="dense"
                    id="email"
                    variant="outlined"
                    error={errorEmail}
                    helperText={errorEmail == true ? helperTextEmail : ""}
                    onChange={(event) => {setEmailCredentials(event.target.value)}}
                    />

                    <DialogContentText sx={{color: "white"}}>
                        Password
                    </DialogContentText>
                    <TextField      
                    label="Password"
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
                    id="password"
                    variant="outlined"
                    error={errorPassword}
                    type="password"
                    helperText={errorPassword == true ? helperTextPassword : ""}
                    onChange={(event) => {setPassword(event.target.value)}}
                    />                                 

                    <DialogActions>
                        <Button onClick={handleClose} sx={{color: "white"}}>Cancel</Button>
                        <Button onClick={() => {handleSubmit(emailCredentials, password, setHelperTextPassword)}} variant="contained" color="button">Submit</Button>
                    </DialogActions>          

                </form>
            </DialogContent>
        </Dialog>

        <Dialoge open={openDialog} setOpen={setOpenDialog} setInformation={setInformation}/>
        </>
    ) 
}

export default CredentialsDialog;