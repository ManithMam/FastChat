import React from 'react'
import app from '../../firebase'
import { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import Chat from './Chat';

const Dashboard = () => {

  const { user, logOut, createNewChat, onChatChanges} = UserAuth();
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)

  const [findUsername, setFindUsername] = useState("")

  useEffect(() => {
    if(user?.uid) {
      onChatChanges((chats) => {
        console.log(chats)
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
      <div className='my-5'>
        <h3>Your Chats</h3>
        {chats?.map((chatId) => {
          return <div className='cursor-pointer' key={chatId} onClick={() => setCurrentChat(chatId)}>{chatId}</div>
        })}
      </div>
      <div>
        {currentChat ? <Chat chatId={currentChat}/> : <div>No chat selected</div>}
      </div>
      <button onClick={() => logOut()}>LogOut</button>
    </div>

  )
}

export default Dashboard