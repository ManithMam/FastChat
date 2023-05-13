import { Button } from '@mui/material'
import React from 'react'
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import LogInEmail from './LogInEmail';


const Container = ({ children }) => (
  <div className='grid grid-cols-2 h-screen'>
    <div className='bg-gray-200 p-8 '>{children[0]}</div>
    <div className='bg-orange-200 p-8'>{children[1]}</div>
  </div>
);

const LogIn = () => {
  const { signIn } = UserAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    signIn().then(() => {
      console.log("Logged in")
      navigate("/");
    });
  }

  const createEMailAccount = () => {

  }

  const LeftContent = () => (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold m-5">Welcome to FastChat!</h1>
      <Button
      variant="contained"
      color="secondary"
      onClick={() => handleLogin()}
      >
      Log in with Google
      </Button>

      <LogInEmail/>

      <Button
      variant="contained"
      color="secondary"
      onClick={() => createEMailAccount()}
      >
      No account? Create one.
      </Button>
    </div>
  )

  const RightContent = () => (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold m-5">Right Content</h1>
    </div>
  )

  return (
    <Container>
      <LeftContent/>
      <RightContent/>
    </Container>
  )
}

export default LogIn