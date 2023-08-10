import InformationCard from "./AccountInformation/InformationCard";
import ProfilePicture from "./ProfilePicture/ProfilePicture";
import SensitiveInformation from "./SensitiveInformation/SensitiveInformation";

const Profile = () => {
    return (
        <div className=" bg-background h-screen flex flex-wrap">              
            <div className=" basis-1/2 flex justify-center items-center mb-44">
                <ProfilePicture/>
            </div>
            <div className=" basis-1/2 flex flex-col flex-grow justify-center">               
                    <InformationCard/>                            
                    <SensitiveInformation/>               
            </div>            
        </div>
    );
}

export default Profile;