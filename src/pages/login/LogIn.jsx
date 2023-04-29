import { Button } from '@mui/material'
import React from 'react'
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {

  const { signInWithGoogle } = UserAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithGoogle().then((result) => {
      console.log(result)
      if (result === true) {
        navigate("/");
      } else {
        alert("Something went wrong. Please try again.")
      }
    });
  }

  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center'>
      <h1 className='text-6xl font-bold m-5'>Welcome to FastChat!</h1>
      <Button variant="outlined" onClick={() => handleLogin()}>Log in with Google</Button>
    </div>
  )
}

export default LogIn