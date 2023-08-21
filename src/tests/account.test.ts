import { getAuth, connectAuthEmulator, deleteUser } from "firebase/auth";
import { getDatabase, connectDatabaseEmulator, ref, set } from "firebase/database";
import { signUpWithEmail } from "../_api/AuthApi";

beforeEach(() => {

    const auth = getAuth();
    connectAuthEmulator(auth, "http://127.0.0.1:9099");

    const db = getDatabase();
  // Point to the RTDB emulator running on localhost.
  connectDatabaseEmulator(db, "127.0.0.1", 9000);
})


test('Should add user in realtime db', async () => {
    
  
    const sth = await signUpWithEmail("usernametest", "displaynametest", "testlululu@mail.com", "myPassword123!")
    expect(sth.success).toBe(true)   

    const auth = getAuth();
    const user = auth.currentUser;

    expect(user?.email).toBe("testlululu@mail.com")
    expect(user?.uid).toBeDefined();    
})

const deleteUserAuth = () => {    

  const auth = getAuth();
  const user = auth.currentUser;
  
  try{
      if(user != null){
          deleteUser(user)  
      }             
  }
  catch(err){
      throw err;
  }
}

afterAll(() => {
  const db = getDatabase();
  set(ref(db), null);
  deleteUserAuth();   
})