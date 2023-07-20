import { getAuth, updateEmail } from "firebase/auth";



export const updateUserEmail = (event, setEmail, newEmail) => {
    event.preventDefault() 

    const auth = getAuth();

    const user = auth.currentUser;

    updateEmail(user, newEmail).then(() => {
        console.log("Sucess")
        console.log("New Mail")
        console.log(user.email)
        setEmail(user.email);
    })
}