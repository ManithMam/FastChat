import { updateProfile, getAuth } from "firebase/auth";
import { getDatabase, ref, update} from "firebase/database";

const updateDisplayNameInDB = (id: string, name: string) => {
    const db = getDatabase();   
    update(ref(db, 'users/' + id), {
        displayName: name
    });
}

export const updateUserDisplayName = async (setName: React.Dispatch<React.SetStateAction<string>>, newName: string) => {        

    try{
        const auth = getAuth();

        const user = auth.currentUser;

        if(user != null){
               await updateProfile(user, {        
                displayName: newName
            }).then(async () => {      
                await updateDisplayNameInDB(user.uid, newName)  
                setName(newName)                                 
            })
            .catch((err) => {
                console.error(err)
            })
        }
        else{
            throw new Error("User is null")
        }

        return{
            newDisplayName: user.displayName,
            success: true
        }
    }
    catch(err: unknown){
        if(err instanceof Error){
            return{
                err: err.message,
                success: false
            }
        }
    }    
}   


