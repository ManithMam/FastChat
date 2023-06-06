import ChangeButton from "../../changeButton";
import { UserAuth } from "../../../../context/AuthContext";


function Username(){

    const {user} = UserAuth();

    return(
        <div>
            <div>
                <h1>Username</h1>
                <p>{user.displayName}</p>
            </div>       
            <ChangeButton/>     
        </div>
    )
}

export default Username;