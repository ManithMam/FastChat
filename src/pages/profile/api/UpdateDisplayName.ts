import { updateProfile, getAuth } from "firebase/auth";
import { getDatabase, ref, update} from "firebase/database";

const updateDisplayNameInDB = (id: string, name: string) => {
    const db = getDatabase();   
    update(ref(db, 'users/' + id), {
        displayName: name
    });
}

export const updateUserDisplayName = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, setName: React.Dispatch<React.SetStateAction<string>>, newName: string) => {    

    event.preventDefault()

    const auth = getAuth();

    const user = auth.currentUser;

    if(user != null){
        updateProfile(user, {        
            displayName: newName
        }).then(() => {        
            setName(newName)        
            updateDisplayNameInDB(user.uid, newName)
        })
        .catch((err) => {
            console.error(err)
        })
    }
     
    
}   


