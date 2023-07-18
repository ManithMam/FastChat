import { updateProfile, getAuth } from "firebase/auth";
import { getDatabase, ref, update} from "firebase/database";


const updateDisplayNameInDB = (id, name) => {
    const db = getDatabase();
    console.log(id)
    update(ref(db, 'users/' + id), {
        displayName: name
    });
}

export const updateUserDisplayName = async (event, setName, newName) => {    

    event.preventDefault()     

    const auth = getAuth();

    const user2 = auth.currentUser

    updateProfile(user2, {        
        displayName: newName
    }).then(() => {        
        setName(auth.currentUser.displayName)        
        updateDisplayNameInDB(user2.uid, newName)
    })    
    
}   

