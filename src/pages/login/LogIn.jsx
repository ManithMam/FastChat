import { Button } from '@mui/material'
import React from 'react'
import { UserAuth } from '../../context/AuthContext';

const LogIn = () => {

  const { logIn } = UserAuth();

  const handleLogin = () => {
    const user = logIn();
    console.log(user)
  }

  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center'>
      <h1 className='text-6xl font-bold m-5'>Welcome to FastChat!</h1>
      <Button variant="outlined" onClick={() => handleLogin()}>Log in with Google</Button>
    </div>
  )
}

export default LogIn