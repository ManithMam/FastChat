import React from "react";
import { UserAuth } from "../../../../../context/AuthContext";

import { ChangeButtonSensitive } from "../ChangeButtonSensitive";

import { useState, useEffect } from "react";
import EmailDialoge from "./EmailDialoge";

function Email(){   
    const {fastchatUser} = UserAuth(); 

    const [email, setEmail] = useState()

    useEffect(() => {
        if(fastchatUser?.email) {
            setEmail(fastchatUser.email)
        }
      }, [fastchatUser])  

    return(
        <div className=" flex flex-row">
            <div className=" flex flex-grow flex-col">
                <h1 className=" text-slate-100 font-bold text-2xl">Email</h1>
                <p className=" text-slate-100">{email}</p>
            </div>
            <div className=" flex items-center">
            <ChangeButtonSensitive setInformation={setEmail} displayDialoge={EmailDialoge}/>
            </div>   
        </div>
    )
}

export default Email;