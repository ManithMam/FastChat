import React from "react";
import { UserAuth } from "../../../../../context/AuthContext";
import { useEffect, useState } from "react";
import { ChangeButton } from "../ChangeButton";
import UsernameDialog from "./UsernameDialog";

function Username(){

    const {fastchatUser} = UserAuth();
    
    const [username, setUsername] = useState()    

    useEffect(() => {
        if(fastchatUser?.userName) {
            setUsername(fastchatUser.userName)
        }
      }, [fastchatUser])   

    return(
        <div className=" flex flex-row mb-20">
            <div className=" flex flex-grow flex-col">
                <h1 className="text-slate-100 font-bold text-2xl">Username</h1>
                <p className=" text-slate-100 ">{username}</p>
            </div>       
            <div className=" flex items-center">
                <ChangeButton setInformation={setUsername} displayDialoge={UsernameDialog} />
            </div>    
        </div>
    )
}

export default Username;