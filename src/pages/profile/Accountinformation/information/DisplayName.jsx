import ChangeButton from "../../changeButton";
import { UserAuth } from "../../../../context/AuthContext";


function DisplayName (){

    const {user} = UserAuth();            

    return (
        <div>
            <div>          
                <h1>Display Name</h1>
                <p>{user.displayName}</p>
                <ChangeButton/>
            </div>
        </div>
    )
}

export default DisplayName;