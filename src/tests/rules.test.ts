import {
    assertFails,
    assertSucceeds,
    initializeTestEnvironment,
    RulesTestContext,
    RulesTestEnvironment,    
  } from "@firebase/rules-unit-testing"
import { beforeAll, describe, it, beforeEach } from 'vitest' 
import fs from 'fs';
import { ref, set, get, update } from "firebase/database";
import { ref as storageRef, uploadBytes, getBytes } from "firebase/storage";
import path from "path";
import FastChatUser from "../_api/models/FastChatUser";



const user1Data: FastChatUser = { id: "userId1", userName: "bernd", displayName: "BeRnd", email: "Bernd@mail.com", profile_picture: "imgURL", lastOnline: 1, participantOf: []}
const user2Data: FastChatUser = {id: "userId2", userName: "anna", displayName: "AnNa", email: "Anna@mail.com", profile_picture: "imgURL", lastOnline: 1, participantOf: []}
const avatarPath = path.join(__dirname, "./avatar.png")
const avatar = fs.readFileSync(avatarPath)

describe('Firebase Storage - Security Rules', () => {

    let testEnv: RulesTestEnvironment
    let authenticatedUser:  RulesTestContext
    let authenticatedUser2:  RulesTestContext
    let unauthenticatedUser: RulesTestContext

    beforeAll(async () => {       

        const storageRulesPath = path.join(__dirname, "../../storage.rules")
        const dbRulesPath = path.join(__dirname, "../../database.rules")

        testEnv = await initializeTestEnvironment({
            projectId: "socketchat-7dd2a",
            storage: {
              rules: fs.readFileSync(storageRulesPath, "utf-8"),             
            },
            database: {
                rules: fs.readFileSync(dbRulesPath, "utf-8")
            }
          });


          await testEnv.clearStorage();
          await testEnv.clearDatabase();         
    }) 

    beforeEach(async () => {
        authenticatedUser = testEnv.authenticatedContext(user1Data.id)
        authenticatedUser2 = testEnv.authenticatedContext(user2Data.id)
        unauthenticatedUser = testEnv.unauthenticatedContext()
        
    })

    it('Should be able to write to storage when authenticated', async () => {               
        const ref = storageRef(authenticatedUser.storage(), `avatars/${user1Data.id}/avatar`)
        await assertSucceeds(uploadBytes(ref, avatar))        
    })

    it('Should be able to read from storage when authenticated', async () => {
        await assertSucceeds(getBytes(storageRef(authenticatedUser.storage(), `avatars/${user1Data.id}/avatar`)))
    })

    it('Should fail when unauthorized and writting to storage', async () => {        
        await assertFails(uploadBytes(storageRef(unauthenticatedUser.storage(), `avatars/${user1Data.id}/avatar`), avatar))
    })

    it('Should fail when unauthorized and reading from storage', async () => {
        await assertFails(getBytes(storageRef(unauthenticatedUser.storage(), `avatars/${user1Data.id}/avatar`)))
    })

    it('Should fail when different account reads from storage', async () => {
        await assertFails(getBytes(storageRef(authenticatedUser2.storage(), `avatars/${user1Data.id}/avatar`)))
    })

    it('Should be able to write to db when authorized', async () => {
        const userRef = ref(authenticatedUser.database(), 'users/' + user1Data.id)
        set(userRef, user1Data)     

        const userDataUpdate: Partial<FastChatUser> = {displayName: "newName1"}
        await assertSucceeds(update(userRef, userDataUpdate))    
    })

    it('Should not be able to write to db when unauthorized', async () => {
        const userRefUnauth = ref(unauthenticatedUser.database(), 'users/' + user1Data.id)
        const userDataUpdate: Partial<FastChatUser> = {displayName: "newNameUnauth"}
        await assertFails(update(userRefUnauth, userDataUpdate))    
    })

    it('Should be able to read db when authorized', async () => {
        const userRef = ref(authenticatedUser.database(), 'users/' + user1Data.id)
        await assertSucceeds(get(userRef))
    })

    it('Should not be able to read db when unauthorized', async () => {
        const userRefUnauth = ref(unauthenticatedUser.database(), 'users/' + user1Data.id)
        await assertFails(get(userRefUnauth))
    })   
    
})