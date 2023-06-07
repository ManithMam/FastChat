import InformationCard from "./Accountinformation/InformationCard";
import ProfilePicture from "./ProfilePicture/ProfilePicture";
import Password from "./password/Password";

export default function Profile (){
    return (
        <div className=" bg-background h-screen flex justify-around flex-wrap">          
            <div className="flex justify-center flex-wrap mt-32 ml-48">
                <ProfilePicture/>
            </div>
            <div>
                <div className="flex justify-center flex-wrap">
                    <InformationCard/>
                </div>
                <div>
                    <Password/>
                </div>  
            </div>
            
        </div>
    );
}