import { Button } from "@mui/material";

function Password(){

    return(
        <div className=" flex flex-row mb-10">
            <h1 className="text-slate-100 font-bold text-2xl flex-grow">Password</h1>

            <div className=" flex items-center">
                <Button variant="contained" color="button" size="large">Change</Button>                  
            </div>                
        </div> 
    )

}

export default Password;