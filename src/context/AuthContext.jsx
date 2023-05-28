import { createContext, useContext, useEffect, useState } from "react";
import {
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db as realtimedb } from "../firebase";
import { ref, child, update, set, get } from "firebase/database";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // User returned from firebase auth
  const [authUser, setAuthUser] = useState(null);

  // Our custom user object
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentAuthUser) => {
      setAuthUser(currentAuthUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  /*
   * This useEffect hook will run whenever the authUser changes.
   * If the authUser is not null, we will fetch the user from the realtime db
   * and set the user state to the user object returned from the db.
   */
  useEffect(() => {
    if (authUser !== null) {
      getCurrentUser().then((currentUser) => {
        setUser(currentUser);
      });
    }
  }, [authUser]);

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    if (result.user) {
      await createOrUpdateUser(
        result.user.uid,
        result.user.displayName,
        result.user.displayName,
        result.user.email,
        result.user.photoURL
      );
      return true;
    }
    return false;
  };

  const signInWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
    //TODO: Implement user creation in realtime db
  };

  const signUpWithEmail = async (username, email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (result.user) {
        await createOrUpdateUser(
          result.user.uid,
          username,
          username,
          email,
          null
        );
        return { success: true, error: null };
      }
    } catch (error) {
      if(error.message.includes('already in use')) {
        return { success: false, error: 'Email already in use!' };
      }
      return { success: false, error: error.message };
    }
  };

  const createOrUpdateUser = async (
    userId,
    userName,
    displayName,
    email,
    profile_picture
  ) => {
    const userRef = ref(realtimedb, `users/`);
    const userSnapshot = await get(child(userRef, userId));

    if (userSnapshot.exists()) {
      update(ref(realtimedb, "users/" + userId), {
        lastOnline: Date.now(),
      });
    } else {
      set(ref(realtimedb, "users/" + userId), {
        userName: userName,
        displayName: displayName,
        email: email,
        profile_picture: profile_picture,
        lastOnline: Date.now(),
        participantOf: [],
      });
    }

    setUser(await getCurrentUser());
  };

  const getCurrentUser = async () => {
    if (authUser?.uid === undefined) return null;

    const userRef = ref(realtimedb, `users/`);
    const userSnapshot = await get(child(userRef, authUser.uid));
    if (userSnapshot.exists()) {
      return userSnapshot.val();
    }
    return null;
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
    };
  };

  const getChatMessages = async (chatId) => {
    //TODO: Implement this
    return [
      {
        from: "USER_ID",
        to: "USER_ID",
        message: "Hello World!",
        timestamp: 1647483103,
      },
      {
        from: "USER_ID",
        to: "USER_ID",
        message: "Hello World!",
        timestamp: 1647483103,
      },
      {
        from: "USER_ID",
        to: "USER_ID",
        message: "Hello World!",
        timestamp: 1647483103,
      },
      {
        from: "USER_ID",
        to: "USER_ID",
        message: "Hello World!",
        timestamp: 1647483103,
      },
    ];
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
    <UserContext.Provider
      value={{
        authUser,
        user,
        setAuthUser,
        logOut,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        getCurrentUser,
        getUserChats,
        onUserChatsUpdate,
        getChatInfo,
        getChatMessages,
        onChatMessagesUpdate,
        sendChatMessage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};