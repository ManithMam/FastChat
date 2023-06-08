import { Button } from "@mui/material";


function Password(){
    return(
        <div className="bg-primary m-10 p-12 rounded-lg">
            <div className=" flex flex-row">
                <h1 className="text-slate-100 font-bold text-2xl flex-grow">Password</h1>

                <div className=" flex items-center">
                    <Button variant="contained" color="button" size="large">Change</Button>   
                </div>        
                
            </div>        
                
        </div>
    )
}

export default Password;