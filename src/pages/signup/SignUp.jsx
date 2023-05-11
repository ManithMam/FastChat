import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { auth } from '../../firebase';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Email validation regex pattern
    const emailRegex = /^\S+@\S+\.\S+$/;

    // Password validation regex pattern  -->  Password must contain at least 8 characters, including uppercase and lowercase letters, and at least one number
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    // Validate email and password
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    if (!passwordRegex.test(password)) {
      setError('Password must contain at least 8 characters, including uppercase and lowercase letters, and at least one number');
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await auth.createUserWithEmailAndPassword(email.trim(), password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold m-5">Create an account</h1>
      <form onSubmit={handleSignUp}>
        <div className="m-3">
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
          />
        </div>
        <div className="m-3">
          <Button type="submit" variant="outlined">
            Sign Up
          </Button>
        </div>
        
        <p className="m-3">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/login')}>
            Login here
          </span>
        </p>
      </form>
      {error && <p className="text-red-500 m-3">{error}</p>}
    </div>
  );
};

export default SignUp;