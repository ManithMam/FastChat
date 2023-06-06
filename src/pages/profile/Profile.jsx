import InformationCard from "./Accountinformation/InformationCard";
import ProfilePicture from "./ProfilePicture/ProfilePicture";

export default function Profile (){
    return (
        <div>
            <div>
                <ProfilePicture/>
            </div>
            <div>
                <InformationCard/>
            </div>
        </div>
    );
}