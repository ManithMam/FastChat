import { getAuth, deleteUser } from "firebase/auth"
import { remove, getDatabase, ref, get, child } from "firebase/database";
import { getStorage, deleteObject } from "firebase/storage";
import { ref as storageRef} from "firebase/storage";

const deleteProfilePicture = () => {    

    const auth = getAuth();
    const user = auth.currentUser;    

    const uid = user.uid;

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

    const auth = getAuth();
    const user = auth.currentUser;    

    const uid = user.uid;    

    const dbRef = ref(db)
    
    await get(child(dbRef, 'users/' + uid + '/profile_picture')).then((snapshot) => {
        console.log(snapshot.val())
        if(snapshot.val() == ""){
            console.log("picture doesnt exist...")
            return
        }
        else{
            console.log("Picture exists...delete...")
            deleteProfilePicture();
        }
        
    })
    .catch((err) => {
        console.error(err)
        console.log("error")
    })      

}

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

export const deleteAccount = async () => {      
    await ProfilePicCheck();  
    deleteUserDB();    
    deleteUserAuth();      
}
