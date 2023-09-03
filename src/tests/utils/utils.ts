import { deleteUser, getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const deleteUserAuth = () => {    
    const auth = getAuth();
    const user = auth.currentUser;
    
    try{
        if(user != null){
            deleteUser(user)  
        }             
    }
    catch(err){
        throw err;
    }
}

const deleteRealtimeDb = () => {
    const db = getDatabase();
    set(ref(db), null); 
}

export const resetAuthAndDb = () => {
    deleteRealtimeDb()
    deleteUserAuth()
}