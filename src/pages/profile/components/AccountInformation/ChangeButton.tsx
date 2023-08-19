import { Button } from "@mui/material";
import { useState } from "react";
import { changeButtonPropTypes } from "../types/ChangeButtonTypes";

export function ChangeButton({setInformation, Dialog}: changeButtonPropTypes){

    const [open, setOpen] = useState(false)

    function handleOpen(){
        setOpen(true)
    }     
  
    return(
        <>
            <Button variant="contained" color="secondary" size="large" onClick={handleOpen}>Change</Button>
            <Dialog open={open} setOpen={setOpen} setInformation={setInformation}/>  
        </>
    )
}
