import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import LogIn from "./pages/login/LogIn";
import SignUp from "./pages/signup/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContextProvider, UserAuth } from "./context/AuthContext";
import AuthRoute from "./components/AuthRoute";
import { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import Profile from "./pages/profile/Profile";

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#8000c6",
      },
      secondary: {
        main: "#797979",
      },
      button: {
        main: "#05F2F2"
      }
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile/>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <AuthRoute>
                <LogIn />
              </AuthRoute>
            }
          />
          <Route
            exact
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
