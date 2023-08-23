import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const AuthRoute = ({ children }) => {
  const {user} = UserAuth();

  if (user) {
    return <Navigate to='/' />;
  }
  return children;
};

export default AuthRoute;