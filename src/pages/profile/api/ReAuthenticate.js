import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"


export const GetCredentialsEmailAndPassword = (email, password) => {
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

export const GetCredentialsGoogle = async() => {
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