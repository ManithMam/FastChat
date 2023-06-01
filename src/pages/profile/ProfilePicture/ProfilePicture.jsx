import { Avatar } from "@mui/material";
import { getAuth } from "firebase/auth";
import LoginInformation from "./LoginInformation";

function ProfilePicture (){    
    const auth = getAuth();
    const user = auth.currentUser;
    let img;
    let provider;    
    
    if(user !== null){
        user.providerData.forEach((profile) => {
            img = profile.photoURL;           
            provider = profile.providerId;
        })
    }    
    
    return (
        <div>
            <Avatar src={img}/>
            <LoginInformation provider={provider}/>
        </div>        
    )

}

export default ProfilePicture;