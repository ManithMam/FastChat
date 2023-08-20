import { UserAuth } from "../context/AuthContext";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getDatabase, connectDatabaseEmulator, ref, get, update, child, onValue, push, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createUser } from "../_api/UserApi";
import { signUpWithEmail } from "../_api/AuthApi";

beforeEach(() => {

    const auth = getAuth();
    connectAuthEmulator(auth, "http://127.0.0.1:9099");

    const db = getDatabase();
  // Point to the RTDB emulator running on localhost.
  connectDatabaseEmulator(db, "127.0.0.1", 9001);

})

test('Add user in realtime db', async () => {
    const sth = signUpWithEmail("usernametest", "displaynametest", "test@mail.com", "myPassword123!")
    console.log(sth)  
   
})
