import { Button } from '@mui/material'
import React from 'react'
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth } from '../../firebase';

const LogIn = () => {

  const { signInWithGoogle } = UserAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLoginWithGoogle = () => {
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
    <form onSubmit={handleLogin}>
      <div className='m-3'>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className='m-3'>
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className='m-3'>
        <button type='submit'>Log In</button>
      </div>
    </form>
    {error && <p className='text-red-500 m-3'>{error}</p>}
    <Button variant="outlined" onClick={() => handleLoginWithGoogle()}>Log in with Google</Button>
  </div>
  );
}

export default LogIn