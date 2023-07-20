import Password from "./Password/Password";
import DeleteAccount from "./DeleteAccount/DeleteAccount";


function DangerousChanges(){
    return(
        <div className="bg-primary m-10 p-12 rounded-lg">
            <Password/>
            <DeleteAccount/>                          
        </div>
    )
}

export default DangerousChanges;