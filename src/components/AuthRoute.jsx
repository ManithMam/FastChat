import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const AuthRoute = ({ children }) => {
  const { authUser } = UserAuth();

  if (authUser) {
    return <Navigate to='/' />;
  }
  return children;
};

export default AuthRoute;