import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { authUser } = UserAuth();

  if (!authUser) {
    return <Navigate to='/login' />;
  }
  return children;
};

export default ProtectedRoute;