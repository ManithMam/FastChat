import { Avatar } from "@mui/material";
import LoginInformation from "./LoginInformation";
import { UserAuth } from "../../../context/AuthContext";

function ProfilePicture (){        

    const {user} = UserAuth();  

    

    return (
        <div>
            <Avatar  sx={{width: 400, height: 400}}/>
            <LoginInformation provider={user.providerId}/>
        </div>        
    )

}

export default ProfilePicture;