import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/login/LogIn";
import SignUp from "./pages/signup/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";
import { createTheme, ThemeProvider } from "@mui/material";

import Interface from "./pages/interface/Interface";
import Profile from "./pages/profile/components/Profile";


const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#40033C",
      },
      secondary: {
        main: "#797979",
      },
      button: {
        main: "#05F2F2"
      },
      whiteText: {
        main: "#FFFFFF"
      }      
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Interface />
              </ProtectedRoute>
            }
          />
          <Route          
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <AuthRoute>
                <LogIn />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <SignUp />
              </AuthRoute>
            }
          />
        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;
