import ChangeButton from "../../changeButton";
import { UserAuth } from "../../../../context/AuthContext";


function DisplayName (){

    const {user} = UserAuth();            

    return (
        <div>
            <div>          
                <h1 className=" text-slate-100">Display Name</h1>
                <p className=" text-slate-100">{user.displayName}</p>
                <ChangeButton/>
            </div>
        </div>
    )
}

export default DisplayName;