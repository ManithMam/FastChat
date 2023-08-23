import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { updateProfile } from "firebase/auth";
import { getDatabase, update} from "firebase/database";
import {ref as dbRef} from "firebase/database";
import FastChatUser from "../../../_api/models/FastChatUser";
import { getAuth } from "firebase/auth";

const getUserId = () => {
    const auth = getAuth();

    const user = auth.currentUser;

    return user?.uid;
}

const pickerOptions = {
    types: [
        {
            description: "Images",
            accept: {
                "image/*": [".png", ".jpeg", ".jpg"],
            }
        }
    ],
    excludeAcceptAllOption: true,
    multiple: false,
}

const readFile = async () => {   
    
    const [fileHandle] = await window.showOpenFilePicker(pickerOptions);      

    const file = await fileHandle.getFile();

    console.log(file);

    return file;
}  

const updateProflePictureURLInRealtimeDB = (userId: string | undefined, imgUrl: string) => {
    const db = getDatabase();    
    update(dbRef(db, 'users/' + userId), {
        profile_picture: imgUrl
    });
}

const updateUserProfile = async (setImgUrl: React.Dispatch<React.SetStateAction<string | undefined>>) => {

    const storage = getStorage();        
    
    const uid = getUserId();     
    
    const avatarRef = await ref(storage, `avatars/${uid}/avatar`)

    const imgUrl = await getDownloadURL(avatarRef)   

    if(uid){
        updateProflePictureURLInRealtimeDB(uid, imgUrl);
    }    
    setImgUrl(imgUrl);
        
}

export const uploadFile = async (setImgUrl: React.Dispatch<React.SetStateAction<string | undefined>>) => {   

    const storage = getStorage();
  
    const uid = getUserId();

    const storageRef = await ref(storage, `avatars/${uid}/avatar`)

    const img = await readFile();

    await uploadBytes(storageRef, img)

    const imgUrl = await getDownloadURL(storageRef)   

    updateProflePictureURLInRealtimeDB(uid, imgUrl);

    setImgUrl(imgUrl);    
   
}