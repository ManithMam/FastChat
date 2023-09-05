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
import { getDatabase, connectDatabaseEmulator, ref, set, get } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import path from "path";



const user1Id = "userId1"
const user1Data = { userName: "bernd", displayName: "BeRnd", email: "Bernd@mail.com", password: "password123"}
const user2Id = "userId2"
const user2Data = { userName: "anna", displayName: "AnNa", email: "Anna@mail.com", password: "password123"}
const avatarPath = path.join(__dirname, "./avatar.png")
const avatar = fs.readFileSync(avatarPath)


describe('Firebase Storage - Security Rules', () => {

    let testEnv: RulesTestEnvironment
    let authenticatedUser:  RulesTestContext
    let unauthenticatedUser

    beforeAll(async () => {       

        const storageRulesPath = path.join(__dirname, "../../storage.rules")
        const dbRulesPath = path.join(__dirname, "../../database.rules")

        testEnv = await initializeTestEnvironment({
            projectId: "socketchat-7dd2a",
            storage: {
              rules: fs.readFileSync(storageRulesPath, "utf-8"),
             
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
        const unauthenticatedUser = testEnv.unauthenticatedContext()
    })

    it('Should be able to write to storage when authenticated', async () => {       
        
        const ref = storageRef(authenticatedUser.storage(), `avatars/${user1Id}/avatar`)
        await assertSucceeds(uploadBytes(ref, avatar))
        
    })

    it.todo('Should fail when unauthorized and writting to storage')
})