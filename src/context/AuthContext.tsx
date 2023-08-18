import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import {User} from "firebase/auth";
import FastChatUser from "../_api/models/FastChatUser";
import { updateUser } from "../_api/UserApi";

interface AuthContextProps {
  children: React.ReactNode;
}

interface AuthContextData {
  user: User | null;
  fastchatUser: FastChatUser | null;
  isLoading: boolean;
}

const UserContext = createContext<AuthContextData>({
  user: null,
  fastchatUser: null,
  isLoading: true,
});

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  // User returned from firebase auth
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [fastchatUser, setFastchatUser] = useState<FastChatUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentAuthUser) => {
      setIsLoading(true);
      setAuthUser(currentAuthUser);
      console.log("Auth state changed to ", currentAuthUser);
      if(currentAuthUser) {
        updateUser(
          currentAuthUser.uid,
          {
            lastOnline: Date.now(),
          }
        ).then((res) => {
          if(res.success && res.data) {
            setFastchatUser(res.data);
            setIsLoading(false);
          }
        }).catch(() => {
          console.log("Error creating/updating user");
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log("Is loading:", isLoading);
  }
  , [isLoading]);
  
  return (
    <UserContext.Provider
      value={{
        user: authUser,
        fastchatUser: fastchatUser,
        isLoading: isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};