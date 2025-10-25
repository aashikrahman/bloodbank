import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "../pages/Register.jsx";
import Login from "../features/auth/Login.jsx";
import Dashboard from "../features/admin/Dashboard.jsx";
import Profile from "../features/user/Profile.jsx";
import { Noroute } from "../pages/Noroute.jsx";
import { AuthProvider } from "../Context/AuthContext.jsx";
import ProtectedRoute from "../features/user/ProtectedRopute.jsx";

const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Noroute />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute adminOnly>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
