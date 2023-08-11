import { updateProfile, getAuth } from "firebase/auth";
import { getDatabase, ref, update, get} from "firebase/database";

export const newUsernameIsNotUnique = async (username, setNameError, setErrorText) => {
    try {
        const database = getDatabase();
        const usersRef = ref(database, 'users');
        const snapshot = await get(usersRef);
    
        if (snapshot.exists()) {
          const usersData = snapshot.val();
          const usernames = Object.values(usersData).map(user => user.userName);
    
          if(usernames.includes(username)){ // Returns true if the username exists in the database, false otherwise
            setNameError(true)
            setErrorText('Username has to be unique')
            return true;
          } 
          else{            
            return false;
          }
        } else {
          return false; // No usernames in the database
        }
      } catch (error) {
        console.error('Error checking username existence:', error);
        return false; // If there's an error, assume the username is not taken
      }
}

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
