import DisplayName from "./information/DisplayName";
import Email from "./information/Email";
import Username from "./information/Username";


function InformationCard (){

    return (
        <div className=" bg-primary m-8 p-14 pr-96 mt-32">
            <DisplayName/>
            <Username/>
            <Email/>
        </div>
    )
}

export default InformationCard;
