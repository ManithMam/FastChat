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
  push,
  onValue,
} from "firebase/database";

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
    return signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        createOrUpdateUserData(result.user);
        return true;
      })
      .catch((error) => {
        return false;
      });
  };

  const createOrUpdateUserData = async (user) => {
    // Check if user exists in database
    const userRef = ref(db, `users/${user.uid}`);
    const userSnapshot = await get(userRef);
    if (userSnapshot.exists()) {
      // Set lastOnline to current time
      console.log("User exists")
      set(ref(db, `users/${user.uid}/lastOnline`), Date.now());
    } else {
      // User does not exist
      // Create user data
      console.log("User does not exist")
      set(userRef, {
        userName: user.displayName,
        displayName: user.displayName,
        lastOnline: Date.now(),
        participantOf: [],
      });
    }
  }

  const logOut = () => {
    return signOut(auth);
  };

  const createNewChat = async (userId) => {
    // Create a new chat with the current user and the user with the given userId
    // Check if user exists in database
    const participantRef = ref(db, `users/${userId}`);
    const participantSnapshot = await get(participantRef);
    if (participantSnapshot.exists()) {
      const currentUserRef = ref(db, `users/${user.uid}`);
      const currentUserSnapshot = await get(currentUserRef);
      if (currentUserSnapshot.exists()) {
        // User exists
        // Create a new chat
        const chatRef = ref(db, "chats");
        const newChatRef = push(chatRef);
        const newChatKey = newChatRef.key;

        // Add the current user as a participant
        set(ref(db, `chats/${newChatKey}/participants/${user.uid}`), true);
        // Add the other user as a participant
        set(ref(db, `chats/${newChatKey}/participants/${userId}`), true);
        // Add the chat to the current user's participantOf
        set(
          ref(db, `users/${user.uid}/participantOf/${newChatKey}`),
          true
        );
        // Add the chat to the other user's participantOf
        set(
          ref(db, `users/${userId}/participantOf/${newChatKey}`),
          true
        );

        return newChatKey;
      } else {
        // User does not exist
        return null;
      }
    } else {
      // User does not exist
      return null;
    }
  };

  const onChatChanges = (callback) => {
    const currentUserRef = ref(db, `users/${user.uid}`);
    const currentUserSnapshot = get(currentUserRef);
    const participantOfRef = ref(
      db,
      `users/${user.uid}/participantOf`
    );
    
    onValue(participantOfRef, (snapshot) => {
      const participantOf = snapshot.val();
      if (participantOf) {
        const chats = Object.keys(participantOf);
        callback(chats);
      }
    });
  };

  const getChatMessages = async (chatId) => {
    const messagesRef = ref(db, `messages/${chatId}`);
    return get(messagesRef).then((snapshot) => {
      if(snapshot.exists()) {
        return snapshot.val();
      } else {
        return [];
      }
    });
  };

  const onChatMessagesChanges = (chatId, callback) => {
    const messagesRef = ref(db, `messages/${chatId}`);
    onValue(messagesRef, (snapshot) => {
      const messages = snapshot.val();
      if (messages) {
        callback(messages);
      }
    });
  };

  const sendMessage = async (chatId, message) => {
    const messagesRef = ref(db, `messages/${chatId}`);
    const newMessageRef = push(messagesRef);
    const newMessageKey = newMessageRef.key;

    const messageData = {
      sender: user.uid,
      message: message,
      timestamp: Date.now(),
    }

    set(ref(db, `messages/${chatId}/${newMessageKey}`), messageData);

    return { ...messageData, id: newMessageKey};
  };


  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logOut,
        signInWithGoogle,
        onChatChanges,
        createNewChat,
        getChatMessages,
        onChatMessagesChanges,
        sendMessage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
