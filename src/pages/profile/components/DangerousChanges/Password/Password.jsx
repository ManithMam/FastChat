import { Button } from "@mui/material";

import { UserAuth } from "../../../../../context/AuthContext";
import { useEffect, useState } from "react";
import CredentialsDialog from "../CredentialsDialog";
import { ChangeButtonTest } from "../../changeTest";
import ChangeDialog from "../../ChangeDialog";
import { updatePasswort } from "../../../api/UpdatePassword";
import { ChangeButton } from "../../AccountInformation/information/ChangeButton";


function Password(){   

    const [password, setPassword] = useState()    

    return(
        <div className=" flex flex-row mb-10">
            <h1 className="text-slate-100 font-bold text-2xl flex-grow">Password</h1>

            <div className=" flex items-center">
               
            </div>                
        </div> 
    )

}

export default Password;