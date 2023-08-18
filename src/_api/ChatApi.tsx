import { get, onValue, push, ref, set, update } from "firebase/database";
import { db as realtimedb } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import Message from "./models/Message";
import { User } from "firebase/auth";

export async function createChat(user: User | null, participantId: string) {
    if (user) {
        console.log("Creating chat between " + user.uid + " and " + participantId);

        // Create a new chat with the current user and the user with the given userId
        // Check if user exists in database
        const participantRef = ref(realtimedb, `users/${participantId}`);
        const participantSnapshot = await get(participantRef);
        if (participantSnapshot.exists()) {
            const currentUserRef = ref(realtimedb, `users/${user.uid}`);
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
                    participants: [user.uid, participantId],
                };
                await set(newChatRef, chatData);

                // Append the chat id to the user's participantOf array
                const userParticipantOfRef = ref(
                    realtimedb,
                    `users/${user.uid}/participantOf`
                );
                if (currentUserSnapshot.val().participantOf === undefined) {
                    await set(userParticipantOfRef, [newChatKey]);
                } else {
                    await update(userParticipantOfRef, [newChatKey]);
                }

                // Append the chat id to the participant's participantOf array
                const participantParticipantOfRef = ref(
                    realtimedb,
                    `users/${participantId}/participantOf`
                );
                if (participantSnapshot.val().participantOf === undefined) {
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
    }
}

export function onUserChatsUpdate(user: User | null, callback: (chats: string[]) => void) {
    if (user) {
        // Get initial data and update whenever it changes, return a function to unsubscribe
        const chatsRef = ref(realtimedb, `users/${user.uid}/participantOf`);
        const unsubscribe = onValue(chatsRef, (snapshot) => {
            const chats = snapshot.val();
            callback(chats ? chats : []);
        });
        return unsubscribe;
    }
}

export async function getChatInfo(chatId: string) {
    // Get chat info from database
    const chatRef = ref(realtimedb, `chats/${chatId}`);
    const chatSnapshot = await get(chatRef);
    if (chatSnapshot.exists()) {
        return chatSnapshot.val();
    }
    return null;
}

export function onChatMessagesUpdate(chatId: string, callback: (messages: Message[]) => void) {
    // Get initial data and update whenever it changes, return a function to unsubscribe
    const messagesRef = ref(realtimedb, `messages/${chatId}`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
        const messages = snapshot.val();
        callback(messages);
    });

    return unsubscribe;
}

export async function sendChatMessage(user: User | null, chatId: string, message: string) {
    if (user) {
        // Check if chat exists
        const chatRef = ref(realtimedb, `chats/${chatId}`);
        const chatSnapshot = await get(chatRef);
        if (chatSnapshot.exists()) {
            // Get messages from database
            const messagesRef = ref(realtimedb, `messages/${chatId}`);
            const messagesSnapshot = await get(messagesRef);

            const messageObject = {
                id: uuidv4(),
                from: user.uid,
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
    }
}