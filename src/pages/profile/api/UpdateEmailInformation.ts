import { getAuth, updateEmail } from "firebase/auth";
import { getDatabase, ref, update} from "firebase/database";


const handleError = (err: any, setErrorText: React.Dispatch<React.SetStateAction<string>>) => {
    if(err.code == 'auth/email-already-in-use'){
        setErrorText("Email already in use please pick another.")
    }
}

const updateEmailDB = (id: string, newEmail: string) => {
    const db = getDatabase();    
    update(ref(db, 'users/' + id), {
        email: newEmail
    })
}

export const updateUserEmail = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, setEmail: React.Dispatch<React.SetStateAction<string>> | undefined, newEmail: string, setErrorText: React.Dispatch<React.SetStateAction<string>>) => {

    event.preventDefault()     

    let isUpdated = false;

    const auth = getAuth();

    const user = auth.currentUser;       

    if(user != null){        
        await updateEmail(user, newEmail).then(() => {    
            if(setEmail){
                setEmail(newEmail);
            }                  
            updateEmailDB(user.uid, newEmail)
            isUpdated = true
            return true;
        }).catch((err: any) => {        
            handleError(err, setErrorText)       
            isUpdated = false
            return false;
        })   
    }

    return isUpdated;
}