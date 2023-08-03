import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth"

const Reauthenticate = async(credentials) => {
    const auth = getAuth();
    const user = auth.currentUser;

    
    reauthenticateWithCredential(user, credentials).then(() => {
        console.log("Reauthenticated")
        return true
    })
    .catch((err) => {
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

export const ReauthenticateWithEmailAndPassword = async(email, password) => {
    const credentials = await GetCredentialsEmailAndPassword(email, password)    
    if(Reauthenticate(credentials) == true){       
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