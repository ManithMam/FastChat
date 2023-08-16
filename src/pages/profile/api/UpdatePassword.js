import { getAuth, updatePassword } from "firebase/auth";


export const updatePasswort = async (event, newPassword) => {
    
    event.preventDefault() 

    const auth = getAuth();

    const user = auth.currentUser;

    try{
        await updatePassword(user, newPassword)
    }
    catch(err){
        throw err;
    }
}