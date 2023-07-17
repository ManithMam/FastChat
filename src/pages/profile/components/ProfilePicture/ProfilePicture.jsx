import { Avatar } from "@mui/material";
import LoginInformation from "./LoginInformation";
import { UserAuth } from "../../../../context/AuthContext";
import { useEffect, useState } from "react";
import { uploadFile } from "../../api/UpdateProfilePicture";

 
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