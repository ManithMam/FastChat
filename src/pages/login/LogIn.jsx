import { Button } from "@mui/material";
import React, { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { TextField } from '@mui/material';
import { signInWithEmailAndPassword } from "firebase/auth";

const LogIn = () => {
  const { signInWithGoogle, signInWithEmailAndPassword } = UserAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleGoogleLogin = async () => {
    const result = await signInWithGoogle();
    if (result) {
      navigate('/');
    } else {
      alert('Error logging in!');
    }
  }

  const handleEmailLogin = async () => {
    const result = await signInWithEmailAndPassword(email, password);
    if (result) {
      navigate('/');
    } else {
      alert('Error logging in with email and password!');
    }
  }

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
          Log In
        </h1>
        <form
          onSubmit={(e) => { e.preventDefault(); handleEmailLogin(); }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
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
                fontSize: '15px',
              }}
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
              Log In
            </Button>
          </div>

          <div className="m-3">
            <Button onClick={handleGoogleLogin} variant="outlined"
              style={{
                width: '180px',
                height: '45px',
                color: '#FFFFFF',
                backgroundColor: '#FF3D00',
                borderRadius: '10px',
                fontWeight: 'bold',
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
              }}
            >
              Log in with Google
            </Button>
          </div>


          <p className="m-3" style={{ color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: '15px' }}>
            Don't have an account?{" "}
            <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/signup')}>
              Sign up here
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

export default LogIn;