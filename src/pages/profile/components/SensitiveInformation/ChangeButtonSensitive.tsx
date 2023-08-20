import React from "react";
import { Button} from "@mui/material"
import { useState } from "react";
import CredentialsDialog from "./CredentialsDialog";
import { changeButtonSensitivePropTypes } from "./Types/ChangeButtonSensitiveType";


function ChangeButtonSensitive({setInformation, Dialog}: changeButtonSensitivePropTypes){

    const [open, setOpen] = useState(false)

    function handleOpen(){
        setOpen(true)
    }     
  
    return(
        <>
            <Button variant="contained" color="secondary" size="large" onClick={handleOpen}>Change</Button>
            <CredentialsDialog open={open} setOpen={setOpen} setInformation={setInformation} InformationDialog={Dialog}/>  
        </>
    )
}

export default ChangeButtonSensitive;