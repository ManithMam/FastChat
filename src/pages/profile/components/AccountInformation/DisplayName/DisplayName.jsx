import { UserAuth } from "../../../../../context/AuthContext";
import { useState, useEffect } from "react";
import { ChangeButton } from "../ChangeButton";
import DisplayNameDialoge from "./DisplayNameDialoge";

function DisplayName (){
 
    const {user} = UserAuth();       

    const [name, setName] = useState()

    useEffect(() => {
        if(user?.displayName) {
          setName(user.displayName)
        }
      }, [user])   
    
    return (        
        <div className=" flex flex-row mb-20">
            <div className=" flex flex-grow flex-col">
                <h1 className=" text-slate-100 font-bold text-2xl">Display Name</h1>
                <p className=" text-slate-100">{name}</p>                    
            </div>    
        <div className=" flex items-center">
            <ChangeButton setInformation={setName} displayDialoge={DisplayNameDialoge}/>
        </div>                  
    </div>         
    )
}

export default DisplayName;