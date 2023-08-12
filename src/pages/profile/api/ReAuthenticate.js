import { getAuth, GoogleAuthProvider, signInWithPopup, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth"

const handleReauthErrors = (err, setHelperTextPassword) => {
    console.log("Inside handle reauth errors")
    if(err.code == 'auth/user-mismatch'){
        setHelperTextPassword("Email and password are wrong. Check credentials and please try again.")
    }
    if(err.code == 'auth/wrong-password'){
        setHelperTextPassword("Wrong password.")
    }
    if(err.code == 'auth/too-many-requests'){
        setHelperTextPassword("Too many attempts to login. Temporary account timeout. Please try again later.")
    }     
}

const Reauthenticate = async(credentials, setHelperTextPassword) => {
    const auth = getAuth();
    const user = auth.currentUser;
    let reauthenticated = false
    
    await reauthenticateWithCredential(user, credentials).then(() => {
        console.log("Authenticated")
        reauthenticated = true
        
    })
    .catch((err) => {        
        handleReauthErrors(err, setHelperTextPassword) 
        console.error(err);       
        
    });

    return reauthenticated;
    
}

const GetCredentialsEmailAndPassword = async (email, password) => {  
    try{
        const credentials = await EmailAuthProvider.credential(email, password)             
        return credentials
    }
    catch(err){        
        return false;
    }
}

export const ReauthenticateWithEmailAndPassword = async(email, password, setHelperTextPassword) => {
    const credentials = await GetCredentialsEmailAndPassword(email, password)    
    return await Reauthenticate(credentials, setHelperTextPassword)       
}
