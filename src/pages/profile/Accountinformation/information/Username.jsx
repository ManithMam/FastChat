import ChangeButton from "../../changeButton";
import { UserAuth } from "../../../../context/AuthContext";


function Username(){

    const {user} = UserAuth();

    return(
        <div>
            <div>
                <h1 className=" text-slate-100">Username</h1>
                <p className=" text-slate-100">{user.displayName}</p>
            </div>       
            <ChangeButton/>     
        </div>
    )
}

export default Username;