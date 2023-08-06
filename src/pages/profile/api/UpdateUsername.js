import { updateProfile, getAuth } from "firebase/auth";
import { getDatabase, ref, update, onValue} from "firebase/database";

export const updateUsernameInDB = (id, newUsername) => {

    const db = getDatabase();    

    update(ref(db, 'users/' + id), {
        userName: newUsername
    });    

}

export const updateUsername = (event, setUsername, newUsername) => {

    event.preventDefault() 

    const auth = getAuth();

    const user = auth.currentUser;

    updateProfile(user, {        
        userName: newUsername
    }).then(() => {        
        setUsername(newUsername);       
        updateUsernameInDB(user.uid, newUsername)
    })  

    

}
