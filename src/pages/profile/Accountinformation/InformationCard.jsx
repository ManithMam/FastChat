import DisplayName from "./information/DisplayName";
import Email from "./information/Email";
import Username from "./information/Username";



function InformationCard (){   

    return (
        <div className="bg-primary m-10 p-12">

                <DisplayName/>   

                <Username/>

                <Email/>                          
           
        </div>
    )
}

export default InformationCard;
