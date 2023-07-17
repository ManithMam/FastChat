import { UserAuth } from "../../../../../../context/AuthContext";
import { Button} from "@mui/material"
import { useState, useEffect } from "react";
import DisplayNameDialoge from "./DisplayNameDialoge";

function DisplayName (){
 
    const {user} = UserAuth();   

    const [open, setOpen] = useState(false)

    const [newName, setNewName] = useState('')    

    const [name, setName] = useState(user.displayName)

    useEffect(() => {
        if(user?.uid) {
          setName(user.displayName)
        }
      }, [user])

    function handleOpen(){
        setOpen(true)
    }     

    return (        
        <div className=" flex flex-row mb-20">
            <div className=" flex flex-grow flex-col">
                <h1 className=" text-slate-100 font-bold text-2xl">Display Name</h1>
                <p className=" text-slate-100">{name}</p>                    
            </div>    
        <div className=" flex items-center">
            <Button variant="contained" color="button" size="large" onClick={handleOpen}>Change</Button>    

            <DisplayNameDialoge open={open} setOpen={setOpen} setNewName={setNewName} setName={setName} newName={newName} user={user}/>

        </div>                  
    </div>         
    )
}

export default DisplayName;