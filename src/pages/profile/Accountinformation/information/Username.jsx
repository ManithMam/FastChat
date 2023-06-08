import { UserAuth } from "../../../../context/AuthContext";
import { Button } from "@mui/material";


function Username(){

    const {user} = UserAuth();

    return(
        <div className=" flex flex-row mb-20">
            <div className=" flex flex-grow flex-col">
                <h1 className="text-slate-100 font-bold text-2xl">Username</h1>
                <p className=" text-slate-100 text-sm">{user.displayName}</p>
            </div>       
            <div className=" flex items-center">
                <Button variant="contained" color="button">Change</Button>   
            </div>    
        </div>
    )
}

export default Username;