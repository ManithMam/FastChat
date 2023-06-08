import { Avatar } from "@mui/material";
import LoginInformation from "./LoginInformation";
import { UserAuth } from "../../../context/AuthContext";

function ProfilePicture (){        

    const {user} = UserAuth();       

    return (
        <div>
            <Avatar  sx={{width: 450, height: 450}}/>
            <LoginInformation provider={user.providerId}/>
        </div>        
    )

}

export default ProfilePicture;