import {
    assertFails,
    assertSucceeds,
    initializeTestEnvironment,
    RulesTestContext,
    RulesTestEnvironment,    
  } from "@firebase/rules-unit-testing"
import { beforeAll, describe, it, expect, afterAll, vi, beforeEach } from 'vitest' 
import fs from 'fs';
import { getAuth, connectAuthEmulator, deleteUser } from "firebase/auth";
import { getDatabase, connectDatabaseEmulator, ref, set, get, Database, update } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getBytes } from "firebase/storage";
import path from "path";
import FastChatUser from "../_api/models/FastChatUser";


const user1Id = "userId1"
const user1Data: FastChatUser = { id: user1Id, userName: "bernd", displayName: "BeRnd", email: "Bernd@mail.com", profile_picture: "imgURL", lastOnline: 1, participantOf: []}
const user2Id = "userId2"
const user2Data: FastChatUser = {id: user2Id, userName: "anna", displayName: "AnNa", email: "Anna@mail.com", profile_picture: "imgURL", lastOnline: 1, participantOf: []}
const avatarPath = path.join(__dirname, "./avatar.png")
const avatar = fs.readFileSync(avatarPath)


describe('Firebase Storage - Security Rules', () => {

    let testEnv: RulesTestEnvironment
    let authenticatedUser:  RulesTestContext
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

    afterAll( async () => {
        
        //await testEnv.cleanup()
    })

    beforeEach(async () => {
        authenticatedUser = testEnv.authenticatedContext(user1Id)
        unauthenticatedUser = testEnv.unauthenticatedContext()
        
    })

    it('Should be able to write to storage when authenticated', async () => {               
        const ref = storageRef(authenticatedUser.storage(), `avatars/${user1Id}/avatar`)
        await assertSucceeds(uploadBytes(ref, avatar))        
    })

    it('Should be able to read from storage when authenticated', async () => {
        await assertSucceeds(getBytes(storageRef(authenticatedUser.storage(), `avatars/${user1Id}/avatar`)))
    })

    it('Should fail when unauthorized and writting to storage', async () => {        
        await assertFails(uploadBytes(storageRef(unauthenticatedUser.storage(), `avatars/${user1Id}/avatar`), avatar))
    })

    it('Should fail when unauthorized and reading from storage', async () => {
        await assertFails(getBytes(storageRef(unauthenticatedUser.storage(), `avatars/${user1Id}/avatar`)))
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