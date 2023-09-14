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

export const updateUsername = async ( setUsername: React.Dispatch<React.SetStateAction<string>>, newUsername: string) => { 
    
    try{      
      const auth = getAuth();

      const user = auth.currentUser;

      if(user != null){
        await updateUsernameInDB(user.uid, newUsername)
        setUsername(newUsername);              
      }    
      else{
        throw new Error("User is null");
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
