import ChangeButton from "../../changeButton";
import { UserAuth } from "../../../../context/AuthContext";

function Email(){   
    const {user} = UserAuth(); 

    return(
        <div>
            <div>
                <h1 className=" text-slate-100">Email</h1>
                <p className=" text-slate-100">{user.email}</p>
            </div>
            <ChangeButton/>
        </div>
    )
}

export default Email;