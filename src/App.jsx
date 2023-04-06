import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import LogIn from "./pages/login/LogIn";
import SignUp from "./pages/signup/signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContextProvider } from "./context/AuthContext";

const App = () => {
  return (
    <div>
      <AuthContextProvider>
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
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
};

export default App;
