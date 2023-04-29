import { createContext, useContext, useEffect, useState } from "react";
import {
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, firestore, db } from "../firebase";
import {
  getDatabase,
  ref,
  set,
  get,
} from "firebase/database";
import { createNewChatSchema } from "./schemas/chat";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  };

  const logOut = () => {
    return signOut(auth);
  };

  const getChats = async () => {
    // Get all chats where the user is a participant
  };

  const createNewChat = async (userId) => {
    // Create a new chat
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logOut,
        signInWithGoogle,
        getChats,
        createNewChat,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
