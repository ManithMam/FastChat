import { Avatar } from "@mui/material";
import LoginInformation from "./LoginInformation";
import { UserAuth } from "../../../../context/AuthContext";
import { useEffect, useState } from "react";
import { uploadFile } from "../../api/UpdateProfilePicture";

 
function ProfilePicture (){

    const {fastchatUser} = UserAuth();

    const [imgUrl, setImgUrl] = useState<string>();  

    useEffect(() => {
        if(fastchatUser?.profile_picture) {
          setImgUrl(fastchatUser?.profile_picture)
        }
      }, [fastchatUser])
 
    return (
        <div>
            <Avatar src={imgUrl} sx={{width: 450, height: 450}} onClick={() => {uploadFile(fastchatUser, setImgUrl)} }/>
            <LoginInformation uid={fastchatUser?.id}/>
        </div>        
    )
} 

export default ProfilePicture;