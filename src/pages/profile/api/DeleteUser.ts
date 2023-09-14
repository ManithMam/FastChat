import { getAuth, deleteUser } from "firebase/auth"
import { remove, getDatabase, ref, get, child } from "firebase/database";
import { getStorage, deleteObject } from "firebase/storage";
import { ref as storageRef} from "firebase/storage";

const getUserId = () => {
    const auth = getAuth();
    const user = auth.currentUser;    

    return user?.uid;
}

const deleteProfilePicture = () => {      

    const uid = getUserId();

    const storage = getStorage();

    const profilePicRef = storageRef(storage, `avatars/${uid}/avatar`)

    try{       
        deleteObject(profilePicRef)
    }
    catch(err){
        throw err;
    }
}

const ProfilePicCheck =  async () => {   

    const db = getDatabase();  

    const uid = getUserId(); 

    const dbRef = ref(db)
    
    await get(child(dbRef, 'users/' + uid + '/profile_picture')).then((snapshot) => {
        console.log(snapshot.val())
        if(snapshot.val() == ""){           
            return
        }
        else{            
            deleteProfilePicture();
        }
        
    })
    .catch((err) => {
        console.error(err)
        console.log("error")
    })      

}

const deleteUserDB = () => {    

    const uid = getUserId();

    const db  = getDatabase();   
    
    remove(ref(db, 'users/' + uid)) 
     
}

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

export const deleteAccount = async () => {      

    try{
        await ProfilePicCheck();  
        deleteUserDB();    
        deleteUserAuth(); 

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
