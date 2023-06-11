import React from 'react'
import app from '../../firebase'
import { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

const Dashboard = () => {

  const { user, logOut, onUserChatsUpdate, createChat } = UserAuth();
  const [chats, setChats] = useState([])

  useEffect(() => {
    if (user) {
      // createChat(user.id, "aHJClUCO6zLX2kCt0qjrSCzYbhO2")
      const unsubscribe = onUserChatsUpdate(user.id, (chats) => {
        console.log(chats)
        setChats(chats ? chats : [])
      });

      return unsubscribe
    }
  }, [user])

  return (
    <div>
      <h1 className='text-5xl'>Dashboard</h1>
      <h2>Logged in as {user?.displayName} {user?.id}</h2>
      <h2>Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li key={chat}>{chat}</li>
        ))}
      </ul>
      <button onClick={() => logOut()}>LogOut</button>
    </div>

  )
}

export default Dashboard