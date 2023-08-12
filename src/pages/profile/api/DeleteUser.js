import { getAuth, deleteUser } from "firebase/auth"
import { remove, getDatabase, ref } from "firebase/database";

const deleteUserDB = () => {

    const auth = getAuth();
    const user = auth.currentUser;

    const db  = getDatabase();   

    remove(ref(db, 'users/' + user.uid))
}

const deleteUserAuth = () => {

    const auth = getAuth();
    const user = auth.currentUser;

    try{
        deleteUser(user)
    }
    catch(err){
        throw err;
    }
}


export const deleteAccount = () => {     
    deleteUserDB();    
    deleteUserAuth();      
}
