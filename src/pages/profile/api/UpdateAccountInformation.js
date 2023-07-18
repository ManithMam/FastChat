import { updateProfile, getAuth } from "firebase/auth";

export const updateUserDisplayName = async (event, setName, newName, user) => {    

    event.preventDefault()     

    const auth = getAuth();

    updateProfile(auth.currentUser, {        
        displayName: newName
    }).then(() => {
        console.log("Updated!")
    })
    
    console.log("current name " + auth.currentUser.displayName)
    
    setName(newName)    
}   

