import { updateProfile } from "firebase/auth";

export const updateUserDisplayName = (event, setName, newName, user) => {
    
    event.preventDefault()      
     
    updateProfile(user, {
        displayName: newName
    })             
    setName(newName)    
}   

