import { Avatar } from "@mui/material";
import LoginInformation from "./LoginInformation";
import { UserAuth } from "../../../context/AuthContext";
import { getStorage, ref, uploadBytes } from "firebase/storage"

async function readFile(){    

    console.log("Hello!")

    const [fileHandle] = await window.showOpenFilePicker();

    const file = await fileHandle.getFile();

    console.log(file);

    return file;
}  

async function uploadFile(user){

    const storage = getStorage();

    const username = user.displayName;    

    const storageRef = ref(storage, `avatars/${username}/avatar.jpg`)

    const img = await readFile();

    uploadBytes(storageRef, img).then((snaphot) => {
        console.log('Uploaded img to cloud storage.')
    })
}

function ProfilePicture (){   

    const {user} = UserAuth();  
    
    return (
        <div>
            <Avatar sx={{width: 450, height: 450}} onClick={() => {uploadFile(user)}}/>
            <LoginInformation provider={user.providerId}/>
        </div>        
    )

}

 

export default ProfilePicture;