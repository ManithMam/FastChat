import { ChangeButtonSensitive } from "../ChangeButtonSensitive";
import PasswordDialoge from "./PasswordDialog";
import { useState } from "react";


function Password(){   

    const [password, setPassword] = useState("")    

    return(
        <div className=" flex flex-row mb-10">
            <h1 className="text-slate-100 font-bold text-2xl flex-grow">Password</h1>

            <div className=" flex items-center">
               <ChangeButtonSensitive setInformation={setPassword} displayDialoge={PasswordDialoge}/>
            </div>                
        </div> 
    )

}

export default Password;