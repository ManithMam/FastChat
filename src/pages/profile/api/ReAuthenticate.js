import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, reauthenticateWithCredential } from "firebase/auth"

const Reauthenticate = async(credentials) => {
    const auth = getAuth();
    const user = auth.currentUser;

    reauthenticateWithCredential(user, credentials).then(() => {
        console.log("Reauthenticated");
    })
    .catch((err) => {
        return err        
    });
}

const GetCredentialsEmailAndPassword = (email, password) => {
    const auth = getAuth();
    let credentials;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            credentials = userCredentials
        })
        .catch((err) => {
            return err.message;
        })

    console.log(credentials);
    return credentials;
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
    Reauthenticate(credentials);
}

export const ReauthenticateWithGoogle = async() => {
    const credentials = await GetCredentialsGoogle();
    Reauthenticate(credentials);
}