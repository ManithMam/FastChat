import { getAuth, updatePassword } from "firebase/auth";

export const updatePasswort = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, newPassword: string) => {
    
    event.preventDefault() 

    const auth = getAuth();

    const user = auth.currentUser;

    if(user != null){
        try{
            await updatePassword(user, newPassword)
        }
        catch(err){
            throw err;
        }
    }
    
}