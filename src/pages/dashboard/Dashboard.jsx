import React from 'react'
import app from '../../firebase'
import { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const navigate = useNavigate();

  const { user, logOut } = UserAuth();

  useEffect(() => {
    if(user?.uid) {
      console.log(user.displayName)
    }
  }, [user])

  return (
    <div>
      <h1 className='text-5xl'>Dashboard</h1>
      <h2>Logged in as {user.displayName}</h2>
      <button onClick={() => logOut()}>LogOut</button>
      <button onClick={() => navigate("/profile")}>Profile</button>
    </div>

  )
}

export default Dashboard