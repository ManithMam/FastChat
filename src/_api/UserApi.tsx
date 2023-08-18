import { child, get, ref, set, update } from "firebase/database";
import { db as realtimedb } from "../firebase";
import FastChatUser from "./models/FastChatUser";
import ApiResponse from "./models/ApiResponse";

export async function createOrUpdateUser(
  userId: string,
  userName: string | null,
  displayName: string,
  email: string,
  profile_picture: string
): Promise<ApiResponse<FastChatUser>> {
  console.log("Creating or updating user")
  const userRef = ref(realtimedb, `users/`);
  const userSnapshot = await get(child(userRef, userId));

  if (userSnapshot.exists()) {
    await update(ref(realtimedb, "users/" + userId), {
      lastOnline: Date.now(),
    });

    console.log("User updated")
  } else {
    let _userName: string = "";
    if(userName === null) {
      _userName = generateRandomUsername();
      while(await checkUsernameExists(_userName)) {
        userName = generateRandomUsername();
      }
    } else {
      if(await checkUsernameExists(userName)) {
        return {
          error: "Username already exists",
          success: false,
        }
      }
    }

    const userData: FastChatUser = {
      id: userId,
      userName: _userName,
      displayName: displayName,
      email: email,
      profile_picture: profile_picture,
      lastOnline: Date.now(),
      participantOf: [],
    }

    await set(ref(realtimedb, "users/" + userId), userData);
    console.log("User created")
  }

  return await getUser(userId);
}

const getUser = async (userId: string): Promise<ApiResponse<FastChatUser>> => {
  const userRef = ref(realtimedb, `users/${userId}`);
  const userSnapshot = await get(userRef);

  if (userSnapshot.exists()) {
    return {
      data: userSnapshot.val(),
      success: true,
    };
  } else {
    return {
      error: "User not found",
      success: false,
    };
  }
}

export async function checkUsernameExists(username: string) {
  try {
    const usersRef = ref(realtimedb, 'users');
    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
      const usersData: FastChatUser[] = snapshot.val();
      const usernames = Object.values(usersData).map((user: FastChatUser) => user.userName);

      return usernames.includes(username); // Returns true if the username exists in the database, false otherwise
    } else {
      return false; // No usernames in the database
    }
  } catch (error) {
    console.error('Error checking username existence:', error);
    return false; // If there's an error, assume the username is not taken
  }
}

function generateRandomWord() {
  const words = ['sea', 'night', 'star', 'moon', 'sun', 'ocean'];
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}


function generateRandomNumber() {
  return Math.floor(Math.random() * 100001);
}

function generateRandomUsername() {
  const randomWord1 = generateRandomWord();
  const randomWord2 = generateRandomWord();
  const randomNumber = generateRandomNumber();
  return `${randomWord1}${randomWord2}${randomNumber}`;
}