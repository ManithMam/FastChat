import { GoogleAuthProvider, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase";
import ApiResponse from "./models/ApiResponse";
import { createUser, emailExists, updateUser, usernameExists } from "./UserApi";

export async function signInWithGoogle() {
    signInWithPopup(auth, new GoogleAuthProvider()).then((result) => {
        const email = result.user.email || "";
        emailExists(email).then((exists) => {
            if (!exists) {
                createUser(
                    result.user.uid,
                    null,
                    result.user.displayName || "",
                    email,
                    result.user.photoURL || ""
                )
            } else {
                updateUser(result.user.uid, {
                    lastOnline: Date.now(),
                });
            }
        });
    }).catch((error) => {
        console.log(error);
    });
}

export async function signInWithEmail(email: string, password: string) {
    const result = await signInWithEmailAndPassword(auth, email, password);

     if(result.user) {
        updateUser(result.user.uid, {
            lastOnline: Date.now(),
        });
    }

    return result;
}

export async function signUpWithEmail(userName: string, displayName: string, email: string, password: string): Promise<ApiResponse<UserCredential>> {
    try {
        if(await usernameExists(userName)) {
            throw new Error("Username already exists");
        }

        const result = await createUserWithEmailAndPassword(auth, email, password);
        const userResult = await createUser(
            result.user.uid,
            userName,
            displayName,
            email,
            result.user.photoURL || ""
        )

        if (!userResult.success) {
            throw new Error(userResult.error);
        }

        return {
            data: result,
            success: true,
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                error: error.message,
                success: false,
            };
        } else {
            return {
                error: "An unknown error occurred.",
                success: false,
            };
        }
    }
}

export function logOut() {
    signOut(auth);
}