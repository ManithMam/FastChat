import { Avatar } from "@mui/material";
import LoginInformation from "./LoginInformation";
import { UserAuth } from "../../../context/AuthContext";
import { getStorage, ref, uploadBytes, getDownloadURL, getBytes } from "firebase/storage"
import { updateProfile } from "firebase/auth";

async function readFile(){   

    const [fileHandle] = await window.showOpenFilePicker();

    const file = await fileHandle.getFile();

    console.log(file);

    return file;
}  

async function uploadFile(user){

    const storage = getStorage();

    const username = user.displayName;    

    const storageRef = ref(storage, `avatars/${username}/avatar`)

    const img = await readFile();

    uploadBytes(storageRef, img).then((snaphot) => {
        console.log('Uploaded img to cloud storage.')
    })
}

function updateUserProfile(user){

    const storage = getStorage();

    const username = user.displayName;    

    const avatarRef = ref(storage, `avatars/${username}/avatar`)

    getDownloadURL(avatarRef)
        .then((url) => {
            updateProfile(user, {
                photoURL: url
            })
            console.log(url)
            console.log('Updated avatar')
        })   
        .catch((err) => {
            console.log(err)
        })
}

function ProfilePicture (){   

    const {user} = UserAuth();       
    
    return (
        <div>
            <Avatar sx={{width: 450, height: 450}} onClick={() => {uploadFile(user)} }/>
            <LoginInformation provider={user.providerId}/>
        </div>        
    )

}

 

export default ProfilePicture;