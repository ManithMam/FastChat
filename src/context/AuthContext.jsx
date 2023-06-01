import { createContext, useContext, useEffect, useState } from "react";
import {
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth, db } from "../firebase";

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

  const signInWithGoogle = () => {
    return signInWithPopup(auth, new GoogleAuthProvider())
    //TODO: Implement user creation in realtime db
  };

  const signInWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
    //TODO: Implement user creation in realtime db
  };

  const signUpWithEmail = (username, email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
    //TODO: Implement user creation in realtime db
  };

  const getUserChats = async (userId) => {
    //TODO: Implement this
    return ["chat1", "chat2", "chat3"];
  };

  const onUserChatsUpdate = (userId, callback) => {
    //TODO: Implement this
  };

  const getChatInfo = async (chatId) => {
    //TODO: Implement this
    return {
      participants: ["USER_ID", "USER_ID"],
    }
  };

  const getChatMessages = async (chatId) => {
    //TODO: Implement this
    return [
      {
        "from": "USER_ID",
        "to": "USER_ID",
        "message": "Hello World!",
        "timestamp": 1647483103
      },
      {
        "from": "USER_ID",
        "to": "USER_ID",
        "message": "Hello World!",
        "timestamp": 1647483103
      },
      {
        "from": "USER_ID",
        "to": "USER_ID",
        "message": "Hello World!",
        "timestamp": 1647483103
      },
      {
        "from": "USER_ID",
        "to": "USER_ID",
        "message": "Hello World!",
        "timestamp": 1647483103
      }
    ]
  };

  const onChatMessagesUpdate = (chatId, callback) => {
    //TODO: Implement this
  };

  const sendChatMessage = async (chatId, message) => {
    //TODO: Implement this
    return true;
  };

  const logOut = () => {
    return signOut(auth);
  };  

  return (
    <UserContext.Provider value={{user, setUser, logOut, signInWithGoogle, signInWithEmail, signUpWithEmail, getUserChats, onUserChatsUpdate, getChatInfo, getChatMessages, onChatMessagesUpdate, sendChatMessage }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
