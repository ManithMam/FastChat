import DisplayName from "./information/DisplayName";
import Email from "./information/Email";
import Username from "./information/Username";


function InformationCard (){

    return (
        <div className=" bg-red-700 m-20 p-14 w-2/4">
            <DisplayName/>
            <Username/>
            <Email/>
        </div>
    )
}

export default InformationCard;
