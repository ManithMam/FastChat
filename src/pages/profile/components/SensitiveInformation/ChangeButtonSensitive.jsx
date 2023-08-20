import React from "react";
import { Button} from "@mui/material"
import { useState } from "react";
import CredentialsDialog from "./CredentialsDialog";



export function ChangeButtonSensitive({setInformation, displayDialoge}){

    const [open, setOpen] = useState(false)

    function handleOpen(){
        setOpen(true)
    }     
  
    return(
        <>
            <Button variant="contained" color="button" size="large" onClick={handleOpen}>Change</Button>
            <CredentialsDialog open={open} setOpen={setOpen} setInformation={setInformation} InformationDialog={displayDialoge}/>  
        </>
    )
}