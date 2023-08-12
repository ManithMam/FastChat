import { getAuth, updatePassword } from "firebase/auth";


export const updatePasswort = (event, newPassword) => {
    
    event.preventDefault() 

    const auth = getAuth();

    const user = auth.currentUser;

    try{
        updatePassword(user, newPassword)
    }
    catch(err){
        throw err;
    }
}