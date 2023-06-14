import { Avatar } from "@mui/material";
import LoginInformation from "./LoginInformation";
import { UserAuth } from "../../../context/AuthContext";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { updateProfile, getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

 async function readFile(){   

    const [fileHandle] = await window.showOpenFilePicker();

    const file = await fileHandle.getFile();

    console.log(file);

    return file;
}  

async function updateUserProfile(user, setImgUrl){

    const storage = getStorage();    

    const uid = user.uid;       

    const avatarRef = await ref(storage, `avatars/${uid}/avatar`)

    const imgUrl = await getDownloadURL(avatarRef)   

    updateProfile(user, {
        photoURL: imgUrl
    })

    setImgUrl(imgUrl);
        
}

async function uploadFile(user, setImgUrl){

    console.log("start...")

    const storage = getStorage();

    const uid = user.uid;    

    const storageRef = await ref(storage, `avatars/${uid}/avatar`)

    const img = await readFile();

    await uploadBytes(storageRef, img)

    updateUserProfile(user, setImgUrl);  
   
}
 
function ProfilePicture (){

    const {user} = UserAuth();

    const [imgUrl, setImgUrl] = useState();  
    
    useEffect(() => {
        if(user?.photoURL) {
          setImgUrl(user.photoURL)
        }
      }, [user])
 
    return (
        <div>
            <Avatar src={imgUrl} sx={{width: 450, height: 450}} onClick={() => {uploadFile(user, setImgUrl)} }/>
            <LoginInformation provider={user.providerId}/>
        </div>        
    )
} 

export default ProfilePicture;