import { getAuth } from "firebase/auth";
import { getDatabase, ref, update, get} from "firebase/database";
import { usernameExists } from "../../../_api/UserApi";

export const newUsernameIsNotUnique = async (username: string, setNameError: React.Dispatch<React.SetStateAction<boolean>>, setErrorText: React.Dispatch<React.SetStateAction<string>>) => {
  let usernameAlreadyExists: boolean = false;

  if(await usernameExists(username)){   
    setNameError(true)
    setErrorText('Username has to be unique')
    usernameAlreadyExists = true;  
    return usernameAlreadyExists;
  }
  
  return usernameAlreadyExists;
}

export const updateUsernameInDB = (id: string, newUsername: string) => {

    const db = getDatabase();    

    update(ref(db, 'users/' + id), {
        userName: newUsername
    });   
}

export const updateUsername = (event: React.MouseEvent<HTMLButtonElement>, setUsername: React.Dispatch<React.SetStateAction<string>>, newUsername: string) => {

    event.preventDefault() 
    
    console.log("start")
    const auth = getAuth();

    const user = auth.currentUser;

    if(user != null){
      setUsername(newUsername);       
      updateUsernameInDB(user.uid, newUsername)
    }    

}
