import { Button} from "@mui/material"
import { useState } from "react";
import CredentialsDialog from "./CredentialsDialog";

export function ChangeButtonSensitiveNoInfo({displayDialoge}){

    const [open, setOpen] = useState(false)

    function handleOpen(){
        setOpen(true)
    }     
  
    return(
        <>
            <Button variant="contained" color="button" size="large" onClick={handleOpen}>Change</Button>           
            <CredentialsDialog open={open} setOpen={setOpen} InformationDialog={displayDialoge}/>
        </>
    )
}