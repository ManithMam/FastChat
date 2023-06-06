import ChangeButton from "../../changeButton";
import { UserAuth } from "../../../../context/AuthContext";

function Email(){   
    const {user} = UserAuth(); 

    return(
        <div>
            <div>
                <h1>Email</h1>
                <p>{user.email}</p>
            </div>
            <ChangeButton/>
        </div>
    )
}

export default Email;