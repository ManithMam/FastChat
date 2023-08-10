import DisplayName from "./DisplayName/DisplayName";
import Email from "../SensitiveInformation/Email/Email";
import Username from "./Username/Username";


function InformationCard (){   

    return (
        <div className="bg-primary m-10 p-12 rounded-lg">

                <DisplayName/>   

                <Username/>

                <Email/>                          
           
        </div>
    )
}

export default InformationCard;
