import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import LogIn from "./pages/login/LogIn";
import SignUp from "./pages/signup/signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContextProvider, UserAuth } from "./context/AuthContext";
import AuthRoute from "./components/AuthRoute";
import { useEffect } from "react";

const App = () => {
  return (
    <div>
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
    </div>
  );
};

export default App;
