import { Avatar } from "@mui/material";
import LoginInformation from "./LoginInformation";
import { UserAuth } from "../../../../context/AuthContext";
import { useEffect, useState } from "react";
import { uploadFile } from "../../api/UpdateProfilePicture";

 
function ProfilePicture (){

    const {user} = UserAuth();

    const [imgUrl, setImgUrl] = useState();  

    useEffect(() => {
        if(user?.profile_picture) {
          setImgUrl(user.profile_picture)
        }
      }, [user])
 
    return (
        <div>
            <Avatar src={imgUrl} sx={{width: 450, height: 450}} onClick={() => {uploadFile(user, setImgUrl)} }/>
            <LoginInformation uid={user.id}/>
        </div>        
    )
} 

export default ProfilePicture;