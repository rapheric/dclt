import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Admindashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import Hero from "./pages/Hero";
import RmDashboard from "./pages/Rmdashboard";
// import CoCheckerDashboard from "./pages/codashboard";
import CreditChecklist from "./pages/CreditChecklist";
import Cocreator from "./components/cocreator/coCreator";

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cl" element={<CreditChecklist />} />

      {/* Protected routes
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="admin">
            <Dashboard />
          </ProtectedRoute>
        }
      /> */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cochecker"
        element={
          <ProtectedRoute>
            <Hero />
          </ProtectedRoute>
        }
      />

       <Route
        path="/rm"
        element={
          <ProtectedRoute>
            <RmDashboard />
          </ProtectedRoute>
        }
      />
       <Route
        path="/cocreator"
        element={
          <ProtectedRoute>
            <Cocreator />
          </ProtectedRoute>
        }
      />
       <Route
        path="/cochecker"
        element={
          <ProtectedRoute>
            <Hero />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
