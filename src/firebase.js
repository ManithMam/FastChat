// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRVW9u__JTRHmrjr2YMMHovy0vlrllf74",
  authDomain: "socketchat-7dd2a.firebaseapp.com",
  projectId: "socketchat-7dd2a",
  storageBucket: "socketchat-7dd2a.appspot.com",
  messagingSenderId: "284577539732",
  appId: "1:284577539732:web:292867bbd11b59be5b7681",
  measurementId: "G-KBY174SZ15",
  databaseURL: "https://socketchat-7dd2a-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

export const firestore = getFirestore(app);
export const db = getDatabase(app);
export default app