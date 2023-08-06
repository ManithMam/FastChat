import DisplayName from "./information/DisplayName/DisplayName";
import Email from "../DangerousChanges/Email/Email";
import Username from "./information/Username/Username";


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
