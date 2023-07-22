import { getAuth, updateEmail } from "firebase/auth";
import { getDatabase, ref, update} from "firebase/database";

const updateEmailDB = (id, newEmail) => {
    const db = getDatabase();
    console.log(id)
    update(ref(db, 'users/' + id), {
        email: newEmail
    })
}

export const updateUserEmail = (event, setEmail, newEmail) => {
    event.preventDefault() 

    const auth = getAuth();

    const user = auth.currentUser;   

    console.log(user.uid)  

    updateEmail(user, newEmail).then(() => {
        console.log("Sucess")        
        setEmail(user.email);
        updateEmailDB(user.uid, newEmail)
    })
}