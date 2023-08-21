import { getAuth, GoogleAuthProvider, signInWithPopup, reauthenticateWithCredential, EmailAuthProvider, EmailAuthCredential } from "firebase/auth"

const handleReauthErrors = (err: any, setHelperTextPassword: React.Dispatch<React.SetStateAction<string>>) => {
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

const Reauthenticate = async(credentials: EmailAuthCredential | undefined, setHelperTextPassword: React.Dispatch<React.SetStateAction<string>>) => {
    const auth = getAuth();
    const user = auth.currentUser;
    let reauthenticated = false
    
    if(user != null && credentials != undefined){
        await reauthenticateWithCredential(user, credentials).then(() => {      
            reauthenticated = true        
        })
        .catch((err) => {        
            handleReauthErrors(err, setHelperTextPassword) 
            console.error(err);                   
        });
    }    

    return reauthenticated;
    
}

const GetCredentialsEmailAndPassword = async (email: string, password: string) => {  
    try{
        const credentials = await EmailAuthProvider.credential(email, password)             
        return credentials
    }
    catch(err){        
        console.log(err)
    }
}

export const ReauthenticateWithEmailAndPassword = async(email: string, password: string, setHelperTextPassword: React.Dispatch<React.SetStateAction<string>>) => {
    const credentials = await GetCredentialsEmailAndPassword(email, password)    
    return await Reauthenticate(credentials, setHelperTextPassword)       
}
