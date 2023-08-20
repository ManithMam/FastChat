import { UserAuth } from "../context/AuthContext";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getDatabase, connectDatabaseEmulator, ref, get, update, child, onValue, push, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";

beforeEach(() => {

    const auth = getAuth();
    connectAuthEmulator(auth, "http://127.0.0.1:9099");

    const db = getDatabase();
  // Point to the RTDB emulator running on localhost.
  connectDatabaseEmulator(db, "127.0.0.1", 9001);

})

test('Add user in realtime db', async () => {
    
   
   
})
