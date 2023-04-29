import React from 'react'
import app from '../../firebase'
import { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

const Dashboard = () => {

  const { user, logOut, getChats, createNewChat} = UserAuth();
  const [chats, setChats] = useState({})

  const [findUsername, setFindUsername] = useState("")

  useEffect(() => {
    if(user?.uid) {
      getChats().then((chats) => {
        setChats(chats)
      })
    }
  }, [user])

  const handleNewChat = (event) => {
    event.preventDefault()
    createNewChat(findUsername).then((chat) => {
      console.log(chat)
    })
  }

  return (
    <div>
      <h1 className='text-5xl'>Dashboard</h1>
      <h2>Logged in as {user.displayName} ({user.uid})</h2>
      <h3>Create a new chat</h3>
      <form onSubmit={handleNewChat}>
        <input type='text' placeholder='Username' onInput={(event) => setFindUsername(event.target.value)} />
        <button type='submit'>Create</button>
      </form>
      <button onClick={() => logOut()}>LogOut</button>
    </div>

  )
}

export default Dashboard