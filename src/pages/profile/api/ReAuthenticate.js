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

    
    await reauthenticateWithCredential(user, credentials).then(() => {
        console.log("Reauthenticated")
        return true
    })
    .catch((err) => {        
        handleReauthErrors(err, setHelperTextPassword) 
        console.error(err);                 
        return false;
    });

    return false;
}

const GetCredentialsEmailAndPassword = async (email, password) => {  
    try{
        const credentials = await EmailAuthProvider.credential(email, password)     
        console.log(credentials)
        return credentials
    }
    catch(err){
        console.error(err)
        return false;
    }
}

const GetCredentialsGoogle = async() => {
    const auth = getAuth();
    let credentials;
    
    await signInWithPopup(auth, new GoogleAuthProvider())
        .then((result) => {
            credentials = GoogleAuthProvider.credentialFromResult(result);
        })
        .catch((err) => {
            return err.message;
        })

    return credentials;
}

export const ReauthenticateWithEmailAndPassword = async(email, password, setHelperTextPassword) => {
    const credentials = await GetCredentialsEmailAndPassword(email, password)    
    if(Reauthenticate(credentials, setHelperTextPassword) == true){       
        return true;
    }
    else{       
        return false
    }
    
}

export const ReauthenticateWithGoogle = async() => {
    const credentials = await GetCredentialsGoogle();
    return Reauthenticate(credentials);
}