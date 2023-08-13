import { createContext, useContext, useEffect, useState } from "react";
import {
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db as realtimedb } from "../firebase";
import { ref, child, update, set, get, onValue, push } from "firebase/database";
import {v4 as uuidv4} from 'uuid';

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
        if(currentUser !== null) {
          setUser(currentUser);
        }
      });
    }
  }, [authUser]);

  const signInWithGoogle = async () => {
    const result = await signInWithRedirect(auth, new GoogleAuthProvider());
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
          ""
        );
        return { success: true, error: null };
      }
    } catch (error) {
      if(error.message.includes('already in use')) {
        return { success: false, error: 'Email already in use!' };
      }
      return { success: false, error: error.message};
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
      await update(ref(realtimedb, "users/" + userId), {
        lastOnline: Date.now(),
      });
      setUser(userSnapshot.val());
    } else {
      const userData= {
        id: userId,
        userName: userName,
        displayName: displayName,
        email: email,
        profile_picture: profile_picture,
        lastOnline: Date.now(),
        participantOf: [],
      }
      await set(ref(realtimedb, "users/" + userId), userData);
      setUser(userData);
    }
  };

  const getCurrentUser = async () => {
    if (authUser?.uid === undefined) return null;

    const userRef = ref(realtimedb, `users/`);
    const userSnapshot = await get(child(userRef, authUser.uid));
    if (userSnapshot.exists()) {
      return {...userSnapshot.val(), id: authUser.uid};
    }
    return null;
  };

  const createChat = async (userId, participantId) => {
    console.log("Creating chat between " + userId + " and " + participantId)

    // Create a new chat with the current user and the user with the given userId
    // Check if user exists in database
    const participantRef = ref(realtimedb, `users/${participantId}`);
    const participantSnapshot = await get(participantRef);
    if (participantSnapshot.exists()) {
      const currentUserRef = ref(realtimedb, `users/${userId}`);
      const currentUserSnapshot = await get(currentUserRef);
      if (currentUserSnapshot.exists()) {
        // User exists
        // Create a new chat
        const chatRef = ref(realtimedb, "chats");
        const newChatRef = push(chatRef);
        const newChatKey = newChatRef.key;

        // Add the chat to the chats object
        const chatData = {
          title: null,
          participants: [userId, participantId],
        };
        await set(newChatRef, chatData);

        // Append the chat id to the user's participantOf array
        const userParticipantOfRef = ref(
          realtimedb,
          `users/${userId}/participantOf`
        );
        if(currentUserSnapshot.val().participantOf === undefined) {
          await set(userParticipantOfRef, [newChatKey]);
        } else {
          await update(userParticipantOfRef, [newChatKey]);
        }

        // Append the chat id to the participant's participantOf array
        const participantParticipantOfRef = ref(
          realtimedb,
          `users/${participantId}/participantOf`
        );
        if(participantSnapshot.val().participantOf === undefined) {
          await set(participantParticipantOfRef, [newChatKey]);
        } else {
          await update(participantParticipantOfRef, [newChatKey]);
        }

        return newChatKey;
      } else {
        // User does not exist
        console.log("User does not exist")
        return null;
      }
    } else {
      // User does not exist
      console.log("User does not exist")
      return null;
    }

  };

  const onUserChatsUpdate = (userId, callback) => {
    // Get initial data and update whenever it changes, return a function to unsubscribe
    const chatsRef = ref(realtimedb, `users/${userId}/participantOf`);
    const unsubscribe = onValue(chatsRef, (snapshot) => {
      const chats = snapshot.val();
      callback(chats);
    });
    return unsubscribe;
  };

  const getChatInfo = async (chatId) => {
    // Get chat info from database
    const chatRef = ref(realtimedb, `chats/${chatId}`);
    const chatSnapshot = await get(chatRef);
    if (chatSnapshot.exists()) {
      return chatSnapshot.val();
    }
    return null;
  };

  const onChatMessagesUpdate = (chatId, callback) => {
    // Get initial data and update whenever it changes, return a function to unsubscribe
    const messagesRef = ref(realtimedb, `messages/${chatId}`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const messages = snapshot.val();
      callback(messages);
    });
    return unsubscribe;
  };

  const sendChatMessage = async (chatId, userId, message) => {
    // Check if chat exists
    const chatRef = ref(realtimedb, `chats/${chatId}`);
    const chatSnapshot = await get(chatRef);
    if (chatSnapshot.exists()) {
      // Get messages from database
      const messagesRef = ref(realtimedb, `messages/${chatId}`);
      const messagesSnapshot = await get(messagesRef);

      const messageObject = {
        id: uuidv4(),
        from: userId,
        message: message,
        timestamp: Date.now(),
      }

      if (messagesSnapshot.exists()) {
        // Append message to messages array
        const messages = messagesSnapshot.val();
        messages.push(messageObject);
        await set(messagesRef, messages);

        return true;
      } else {
        // Create messages array
        await set(messagesRef, [messageObject]);

        return true;
      }
    } else {
      // Chat does not exist
      return false;
    }
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
        createChat,
        getCurrentUser,
        onUserChatsUpdate,
        getChatInfo,
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