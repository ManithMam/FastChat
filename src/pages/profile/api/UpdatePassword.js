import { getAuth, updatePassword } from "firebase/auth";


export const updatePasswort = (event, newPassword) => {
    
    event.preventDefault() 

    const auth = getAuth();

    const user = auth.currentUser;

    updatePassword(user, newPassword).then(() => {
        console.log("Success new password")
        //setPassword(newPassword)
    }).catch((err) => {
        throw err
    })
    
}