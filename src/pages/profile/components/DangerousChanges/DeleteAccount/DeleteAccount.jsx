import { Button } from "@mui/material";
import { ChangeButtonSensitiveNoInfo } from "../ChangeButtonSensitiveNoInformation";
import DeleteAccountDialog from "./DeleteAccountDialog";

function DeleteAccount(){

    return(
        <div className=" flex flex-row">
                <h1 className="text-slate-100 font-bold text-2xl flex-grow">Delete Account</h1>

                <div className=" flex items-center">
                    <ChangeButtonSensitiveNoInfo displayDialoge={DeleteAccountDialog}/>       
                </div>        
                
            </div> 
    )

}

export default DeleteAccount