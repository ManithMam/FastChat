import React from "react";
import InformationCard from "./AccountInformation/InformationCard";
import ProfilePicture from "./ProfilePicture/ProfilePicture";
import SensitiveInformation from "./SensitiveInformation/SensitiveInformation";

const Profile = () => {
    return (
        <div className="flex flex-col bg-background min-h-screen flex-wrap lg:flex-row">              
            <div className=" basis-1/2 flex justify-center items-center mb-0 lg:mb-44 mt-10">
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