import React from 'react'
import app from '../../firebase'
import { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

const Dashboard = () => {

  const { user, logOut, getChats } = UserAuth();
  const [chats, setChats] = useState({})

  useEffect(() => {
    if(user?.uid) {
      getChats().then((chats) => {
        console.log(user.uid)
        console.log(chats)
      })
    }
  }, [user])

  return (
    <div>
      <h1 className='text-5xl'>Dashboard</h1>
      <h2>Logged in as {user.displayName}</h2>
      <button onClick={() => logOut()}>LogOut</button>
    </div>

  )
}

export default Dashboard