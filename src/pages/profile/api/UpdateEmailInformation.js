import { getAuth, updateEmail } from "firebase/auth";

const auth = getAuth();

export const updateUserEmail = (event, setEmail, newEmail) => {
    event.preventDefault() 

    const user = auth.currentUser;

    updateEmail(user, newEmail).then(() => {
        console.log("Sucess")
        console.log("New Mail")
        console.log(user.email)
        setEmail(user.email);
    })
}