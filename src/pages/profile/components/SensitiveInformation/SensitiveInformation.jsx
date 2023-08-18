import React from "react";
import Password from "./Password/Password";
import DeleteAccount from "./DeleteAccount/DeleteAccount";


function SensitiveInformation(){
    return(
        <div className="bg-primary m-10 p-12 rounded-lg">
            <Password/>
            <DeleteAccount/>                          
        </div>
    )
}

export default SensitiveInformation;