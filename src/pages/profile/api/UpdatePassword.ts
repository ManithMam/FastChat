import { getAuth, updatePassword } from "firebase/auth";

export const updateUserPassword = async ( newPassword: string) => {    

    try{
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
        else{
            throw new Error("User is null")
        }    

        return {
            success: true
        }
    }
    catch(err: unknown){
        if(err instanceof Error){
            return {
                err: err.message,
                success: false
            }
        }
    }
    
}