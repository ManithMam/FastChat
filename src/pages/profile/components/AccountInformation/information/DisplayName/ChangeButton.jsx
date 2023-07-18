import { Button} from "@mui/material"
import { useState } from "react";
import DisplayNameDialoge from "./DisplayNameDialoge";

export function ChangeButton({setName}){

    const [open, setOpen] = useState(false)

    function handleOpen(){
        setOpen(true)
    }     
  
    return(
        <>
            <Button variant="contained" color="button" size="large" onClick={handleOpen}>Change</Button>
            <DisplayNameDialoge open={open} setOpen={setOpen} setName={setName}/>  
        </>
    )
}