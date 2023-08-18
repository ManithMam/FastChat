import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { signUpWithEmail } from '../../_api/AuthApi';

const SignUp = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    // Email validation regex pattern
    const emailRegex = /^\S+@\S+\.\S+$/;

    // Password validation regex pattern
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    // Validate email and password
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        'Password must contain at least 8 characters, including uppercase and lowercase letters, and at least one number'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    //TODO: adjust method to allow for all signup attributes
    const result = await signUpWithEmail(userName, displayName, email, password);
    if(result.success === false) {
      setError(result.error);
      return;
    }
  };

  return (

    <div
  className="w-full min-h-screen flex flex-col justify-center items-center"
  style={{
    backgroundColor: '#1E1E1E',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  }}
>
  <div
    className="rounded-lg flex flex-col justify-center items-center"
    style={{
      backgroundColor: '#40033C',
      width: '550px',
      height: '610px',
      borderRadius: '30px',
      transform: 'rotate(0deg)',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <h1
      className="text-6xl font-bold m-5"
      style={{
        color: '#FFFFFF',
        fontSize: '50px',
        fontWeight: 'bold',
        fontFamily: 'Inter, sans-serif',
        marginTop: '2rem'
      }}
    >
      Create an account
    </h1>
    <form onSubmit={handleSignUp} 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center'
        }}
    >


      <div className="m-3">
      <TextField
        label="Username"
        variant="outlined"
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
        style={{
          width: '400px',
          height: '45px',
          borderRadius: '10px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '15px',
        }}
        inputProps={{
          style: {
            color: '#FFFFFF',
            fontSize: '15px',
          }
        }}
        InputLabelProps={{
          style: {
            color: '#BF8AB1',
            fontSize: '15px',
          }
        }}
      />
      </div>

      <div className="m-3">
      <TextField
        label="Display Name"
        variant="outlined"
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        required
        style={{
          width: '400px',
          height: '45px',
          borderRadius: '10px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '15px',
        }}
        inputProps={{
          style: {
            color: '#FFFFFF',
            fontSize: '15px',
          }
        }}
        InputLabelProps={{
          style: {
            color: '#BF8AB1',
            fontSize: '15px',
          }
        }}
      />
      </div>
        
      <div className="m-3">
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ 
            width: '400px', 
            height: '45px', 
            borderRadius: '10px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '15px',}}
          inputProps={{ 
            style: { 
              color: '#FFFFFF',
              fontSize: '15px',
            } 
          }}
          InputLabelProps={{ 
            style: { 
              color: '#BF8AB1',
              fontSize: '15px',
            } 
          }}
        />
      </div>

      <div className="m-3">
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ 
            width: '400px', 
            height: '45px', 
            borderRadius: '10px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '15px',}}
          inputProps={{ 
            style: { 
              color: '#FFFFFF'
            } 
          }}
          InputLabelProps={{ 
            style: { 
              color: '#BF8AB1',
              fontSize: '15px', 
            } 
          }}
        />
      </div>

      <div className="m-3">
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={{ 
            width: '400px', 
            height: '45px', 
            borderRadius: '10px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '15px',}}
          inputProps={{ 
            style: { 
              color: '#FFFFFF'        
            } 
          }}
          InputLabelProps={{ 
            style: { 
              color: '#BF8AB1',
              fontSize: '15px',
            } 
          }}
        />
      </div>

      <div className="m-3">
        <Button type="submit" variant="outlined" 
        style={{ 
          width: '120px', 
          height: '45px', 
          color: '#40033C', 
          backgroundColor: '#05F2F2', 
          borderRadius: '10px',
          fontWeight: 'bold',
          fontFamily: 'Inter, sans-serif',
          fontSize: '15px',
        }}
        >
          Sign Up
        </Button>
      </div>

      <p className="m-3" style={{color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: '15px'}}>
        Already have an account?{" "}
        <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/login')}>
          Login here
        </span>
      </p>

      {error && (
        <p className="text-red-500 m-3" 
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {error}
        </p>
      )}

    </form>
  </div>
</div>
  );
};

export default SignUp;
