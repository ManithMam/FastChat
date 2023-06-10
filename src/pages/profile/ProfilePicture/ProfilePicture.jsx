import { Avatar } from "@mui/material";
import LoginInformation from "./LoginInformation";
import { UserAuth } from "../../../context/AuthContext";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { updateProfile, getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

async function readFile(){   

    const [fileHandle] = await window.showOpenFilePicker();

    const file = await fileHandle.getFile();

    console.log(file);

    return file;
}  

async function updateUserProfile(user, setImgUrl){

    const storage = getStorage();

    const username = user.displayName;    

    const avatarRef = await ref(storage, `avatars/${username}/avatar`)

    const imgUrl = await getDownloadURL(avatarRef)   

    updateProfile(user, {
        photoURL: imgUrl
    })

    setImgUrl(imgUrl);
        
}

async function uploadFile(user, setImgUrl){

    console.log("start...")

    const storage = getStorage();

    const username = user.displayName;    

    const storageRef = ref(storage, `avatars/${username}/avatar`)

    const img = await readFile();

    uploadBytes(storageRef, img).then((snaphot) => {
        console.log('Uploaded img to cloud storage.')      
    })

    updateUserProfile(user, setImgUrl);  
   
}

function ProfilePicture (){      
    
    const auth = getAuth();    

    const [user, setUser] = useState({});
    
    const [imgUrl, setImgUrl] = useState();   

    onAuthStateChanged(auth, async (currUser) => {
        if(currUser){
            setUser(currUser)
            setImgUrl(currUser.photoURL)
        }
        else{
            console.log('noUser')
        }
    })    
    
    return (
        <div>
            <Avatar src={imgUrl} sx={{width: 450, height: 450}} onClick={() => {uploadFile(user, setImgUrl)} }/>
            <LoginInformation provider={user.providerId}/>
        </div>        
    )
} 

export default ProfilePicture;