import { getAuth, updateEmail } from "firebase/auth";
import { getDatabase, ref, update} from "firebase/database";


const handleError = (err, setErrorText) => {
    if(err.code == 'auth/email-already-in-use'){
        setErrorText("Email already in use please pick another.")
    }
}

const updateEmailDB = (id, newEmail) => {
    const db = getDatabase();    
    update(ref(db, 'users/' + id), {
        email: newEmail
    })
}

export const updateUserEmail = (event, setEmail, newEmail, setErrorText) => {
    event.preventDefault() 

    const auth = getAuth();

    const user = auth.currentUser;       

    updateEmail(user, newEmail).then(() => {          
        setEmail(user.email);
        updateEmailDB(user.uid, newEmail)
        return true
    }).catch((err) => {        
        handleError(err, setErrorText)       
        return false;
    })
    
}