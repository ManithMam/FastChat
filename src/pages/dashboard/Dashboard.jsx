import React from 'react'
import app from '../../firebase'
import { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../_api/AuthApi';

const Dashboard = () => {
  const navigate = useNavigate();

  const { user, fastchatUser, isLoading } = UserAuth();

  return (
    isLoading ? <div>Loading...</div> :
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-5xl'>FastChat</h1>
        <h2 className='text-2xl'>Welcome, {fastchatUser.displayName}</h2>
        <button onClick={logOut}>Log Out</button>
      </div>
  )
};

export default Dashboard;
