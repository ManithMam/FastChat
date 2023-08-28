import { Avatar } from "@mui/material";
import LoginInformation from "./LoginInformation";
import { UserAuth } from "../../../../context/AuthContext";
import { useEffect, useState } from "react";
import { uploadFile } from "../../api/UpdateProfilePicture";

 
function ProfilePicture (){

    const {fastchatUser, updateFastchatUser} = UserAuth();

    const [imgUrl, setImgUrl] = useState<string>();    

    useEffect(() => {
        if(fastchatUser?.profile_picture) {
          setImgUrl(fastchatUser?.profile_picture)
        }
      }, [fastchatUser])
 


    const updateProfilePicture = async () => {
      const test = await uploadFile(setImgUrl)
      if(test.succes){
        fastchatUser!.profile_picture = test.url
        updateFastchatUser(fastchatUser!)
      }     
      else{
        return {
          error: "An unknown error occured",
          success: false 
        }
      }     
    }

    return (
        <div>
            <Avatar src={imgUrl} sx={{width: 450, height: 450}} onClick={() => {updateProfilePicture()} }/>
            <LoginInformation uid={fastchatUser?.id}/>
        </div>        
    )
} 

export default ProfilePicture;