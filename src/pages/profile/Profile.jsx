import InformationCard from "./Accountinformation/InformationCard";
import ProfilePicture from "./ProfilePicture/ProfilePicture";
import Password from "./password/Password";

export default function Profile (){
    return (
        <div className=" bg-background h-screen flex flex-wrap">              
            <div className=" basis-1/2 flex justify-center items-center mb-44">
                <ProfilePicture/>
            </div>
            <div className=" basis-1/2 flex flex-col flex-grow justify-center">
               
                    <InformationCard/>               
             
                    <Password/>
               
            </div>
            
        </div>
    );
}