import InformationCard from "./Accountinformation/InformationCard";
import ProfilePicture from "./ProfilePicture/ProfilePicture";
import Password from "./password/Password";

export default function Profile (){
    return (
        <div className=" bg-background">
          
            <div>
                <ProfilePicture/>
            </div>
            <div>
                <InformationCard/>
            </div>
            <div>
                <Password/>
            </div>                                        
            
        </div>
    );
}