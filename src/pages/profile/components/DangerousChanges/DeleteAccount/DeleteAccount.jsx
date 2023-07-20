import { Button } from "@mui/material";

function DeleteAccount(){

    return(
        <div className=" flex flex-row">
                <h1 className="text-slate-100 font-bold text-2xl flex-grow">Delete Account</h1>

                <div className=" flex items-center">
                    <Button variant="contained" color="button" size="large">Delete</Button>                  
                </div>        
                
            </div> 
    )

}

export default DeleteAccount