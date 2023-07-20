import { Button} from "@mui/material"
import { useState } from "react";
import DisplayNameDialoge from "./DisplayName/DisplayNameDialoge";

export function ChangeButton({setInformation, displayDialoge: Dialoge}){

    const [open, setOpen] = useState(false)

    function handleOpen(){
        setOpen(true)
    }     
  
    return(
        <>
            <Button variant="contained" color="button" size="large" onClick={handleOpen}>Change</Button>
            <Dialoge open={open} setOpen={setOpen} setInformation={setInformation}/>  
        </>
    )
}