import { UserAuth } from "../../../../../context/AuthContext";
import { Button } from "@mui/material";

function Email(){   
    const {user} = UserAuth(); 

    return(
        <div className=" flex flex-row">
            <div className=" flex flex-grow flex-col">
                <h1 className=" text-slate-100 font-bold text-2xl">Email</h1>
                <p className=" text-slate-100">{user.email}</p>
            </div>
            <div className=" flex items-center">
                <Button variant="contained" color="button" size="large">Change</Button>   
            </div>   
        </div>
    )
}

export default Email;