import { createContext, useContext, useEffect, useState } from "react";
import {
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";

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

  const signIn = () => {
    return signInWithPopup(auth, new GoogleAuthProvider())
  };

  const logOut = () => {
    return signOut(auth);
  };

  const getChats = async () => {
    const chatsRef = collection(db, "chats")
    
    const userChatQuery = query(chatsRef, where("users", "array-contains", user.uid));
    const chats = await getDocs(userChatQuery);
    
    return chats.docs.map((chat) => {
      return {
        id: chat.id,
        ...chat.data()
      }
    })
  };

  return (
    <UserContext.Provider value={{user, setUser, logOut, signIn, getChats }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
