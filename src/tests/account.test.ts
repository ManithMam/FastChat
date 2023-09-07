import { getAuth, connectAuthEmulator, deleteUser } from "firebase/auth";
import { getDatabase, connectDatabaseEmulator, ref, set, get } from "firebase/database";
import { signUpWithEmail } from "../_api/AuthApi";
import { resetAuthAndDb } from "./utils/utils";
import { getUser } from "../_api/UserApi";
import { updateUserDisplayName } from "../pages/profile/api/UpdateDisplayName"
import { updateUsername } from "../pages/profile/api/UpdateUsername";
import { ReauthenticateWithEmailAndPassword } from "../pages/profile/api/ReAuthenticate";
import { updateUserEmail } from "../pages/profile/api/UpdateEmailInformation";
import { updateUserPassword } from "../pages/profile/api/UpdatePassword";
import { deleteAccount } from "../pages/profile/api/DeleteUser";
import { beforeAll, describe, it, expect, afterAll, vi, beforeEach } from 'vitest' 


beforeAll(async () => {

    const auth = getAuth();
    connectAuthEmulator(auth, "http://127.0.0.1:9099");

    const db = getDatabase();
  // Point to the RTDB emulator running on localhost.
    connectDatabaseEmulator(db, "127.0.0.1", 9000);
   
})

describe('User account modification', () => {  

  it('Should add user', async () => {
    const sth = await signUpWithEmail("usernametest", "displaynametest", "test@mail.com", "myPassword123!")
    expect(sth.success).toBe(true)   

    const auth = getAuth(); 
    const user = auth.currentUser;
    let userInDb

    if(user){
      userInDb = await getUser(user?.uid)
    }      

    expect(user?.email).toBe("test@mail.com")
    expect(user?.uid).toBeDefined();    
    expect(userInDb?.data?.displayName).toBe("displaynametest")
    expect(userInDb?.data?.userName).toBe("usernametest")
  })

  it('Should update display name', async () => {   
    
    const mockState = vi.fn()
    await updateUserDisplayName(mockState, "newDisplayName")

    const auth = getAuth(); 
    const user = auth.currentUser;

    let userInDb;

    if(user){
      userInDb = await getUser(user?.uid)
    }

    expect(userInDb?.data?.displayName).toBe("newDisplayName") 
  })

  it('Should update username', async () => {
    const mockState = vi.fn()
    await updateUsername(mockState, "newUsername")

    const auth = getAuth(); 
    const user = auth.currentUser;

    let userInDb;

    if(user){
      userInDb = await getUser(user?.uid)
    }

    expect(userInDb?.data?.userName).toBe("newUsername")
  })

  it('Should reauthenticate user', async () => {
    const setHelperTextMock = vi.fn()
    const isReauthenticated = await ReauthenticateWithEmailAndPassword("test@mail.com", "myPassword123!", setHelperTextMock)

    expect(isReauthenticated?.success).toBe(true)
  })  

  it('Should update email', async () => {
    const setHelperTextMock = vi.fn()
    await ReauthenticateWithEmailAndPassword("test@mail.com", "myPassword123!", setHelperTextMock)
   
    const setEmailMock = vi.fn()
    const setErrorTextMock = vi.fn()
    const emailIsUpdated = await updateUserEmail(setEmailMock, "new@mail.com", setErrorTextMock)
    
    const auth = getAuth(); 
    const user = auth.currentUser;

    let userInDb;

    if(user){
      userInDb = await getUser(user?.uid)
    }

    expect(emailIsUpdated).toBe(true)
    expect(userInDb?.data?.email).toBe("new@mail.com")
  })

  it('Should update password', async () => {
    const setHelperTextMock = vi.fn()
    await ReauthenticateWithEmailAndPassword("new@mail.com", "myPassword123!", setHelperTextMock)

    const isUpdated = await updateUserPassword("newPassword123!")

    expect(isUpdated?.success).toBe(true)

    const isReauthenticatedFail = await ReauthenticateWithEmailAndPassword("new@mail.com", "myPassword123!", setHelperTextMock)
    expect(isReauthenticatedFail?.success).toBe(false)

    const isReauthenticatedSuccess = await ReauthenticateWithEmailAndPassword("new@mail.com", "newPassword123!", setHelperTextMock)
    expect(isReauthenticatedSuccess?.success).toBe(true)

  })

  it('Should delete account', async () => {           

    const accountIsDeleted = await deleteAccount()    

    expect(accountIsDeleted?.success).toBe(true)
   
  })
})

afterAll(() => {
  resetAuthAndDb(); 
})
