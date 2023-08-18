import React from "react";
import { ChangeButtonSensitive } from "../ChangeButtonSensitive";
import PasswordDialoge from "./PasswordDialog";

function Password(){        

    return(
        <div className=" flex flex-row mb-10">
            <h1 className="text-slate-100 font-bold text-2xl flex-grow">Password</h1>

            <div className=" flex items-center">
               <ChangeButtonSensitive displayDialoge={PasswordDialoge}/>
            </div>                
        </div> 
    )

}

export default Password;