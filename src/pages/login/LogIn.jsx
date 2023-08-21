import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../_api/AuthApi";
import { UserAuth } from "../../context/AuthContext";

const LogIn = () => {
  const navigate = useNavigate();
  const {isLoading} = UserAuth();

  const handleLogin = async () => {
    const result = await signInWithGoogle();
    if (result) {
      navigate('/');
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-5xl'>FastChat</h1>
      <Button
        variant='contained'
        color='primary'
        onClick={handleLogin}
        disabled={isLoading}
      >
        Log In
      </Button>
    </div>
  );
};

export default LogIn;
