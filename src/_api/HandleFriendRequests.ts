import { getAuth } from "firebase/auth";
import { getDatabase, ref, push } from "firebase/database";

const auth = getAuth();
const db = getDatabase();

export const addFriend = (id: string) => {
    push(ref(db, "users/" + auth.currentUser?.uid + "/contacts/"), id);
}

const removeFriend = (id: string) => {
    
}
