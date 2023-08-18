import { GoogleAuthProvider, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase";
import ApiResponse from "./models/ApiResponse";
import { checkUsernameExists, createOrUpdateUser } from "./UserApi";

export async function signInWithGoogle() {
    signInWithPopup(auth, new GoogleAuthProvider()).then((result) => {
        createOrUpdateUser(
            result.user.uid,
            result.user.displayName || "",
            result.user.displayName || "",
            result.user.email || "",
            result.user.photoURL || ""
        )
    }).catch((error) => {
        console.log(error);
    });
}

export async function signInWithEmail(email: string, password: string) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await createOrUpdateUser(
        result.user.uid,
        result.user.displayName || "",
        result.user.displayName || "",
        result.user.email || "",
        result.user.photoURL || ""
    )

    return result;
}

export async function signUpWithEmail(userName: string, displayName: string, email: string, password: string): Promise<ApiResponse<UserCredential>> {
    try {
        if(await checkUsernameExists(userName)) {
            throw new Error("Username already exists");
        }

        const result = await createUserWithEmailAndPassword(auth, email, password);
        const userResult = await createOrUpdateUser(
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