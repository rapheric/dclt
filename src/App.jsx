// App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Admindashboard";
// import Hero from "./pages/Hero";
// import RmDashboard from "./pages/Rmdashboard";
import CreditChecklist from "./pages/CreditChecklist";
import RequestChecklist from "./pages/rmChecklist";
// import Creatchecklistpage from "./components/cocreator/creatorpage";

// Layout & ProtectedRoute
// import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// / NCBA Dashboard Layout & Pages
import MainLayout from "././components/cocreator/cocreatordash/Colayout";
import DashboardHome from "././components/cocreator/cocreatordash/pages/DashboardHome";
import Checklists from "././components/cocreator/cocreatordash/pages/Checklists";
import Deferrals from "././components/cocreator/cocreatordash/pages/Deferrals";
import Completed from "././components/cocreator/cocreatordash/pages/Completed";
import RelationshipManagers from "././components/cocreator/cocreatordash/pages/RelationshipManagers";
import Settings from "././components/cocreator/cocreatordash/pages/Settings";

// Styles
import "./App.css";
// import RmDashboardd from "./pages/Rmdashboard";
import RMDashboard from "./components/cocreator/rmDashboard";
// import CheckerLayout from "./components/cocreator/coCreator";
import CheckerLayout from "./components/cochecker/clLayout/CheckerLayout";

const App = () => {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
        <Route path="/cochecker" element={<CheckerLayout />} />

      {/* ==========================
          MAIN LAYOUT ROUTES
          (Dashboard with Sidebar + Navbar)
      =========================== */}
      <Route
        path="/cocreator"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<DashboardHome />} />
        <Route path="checklists" element={<Checklists />} />
        <Route path="deferrals" element={<Deferrals />} />
        <Route path="completed" element={<Completed />} />
        <Route path="rms" element={<RelationshipManagers />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* ==========================
          OTHER DASHBOARD ROUTES
          (For RM, CO, CO-Creator)
      =========================== */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* <Route
        path="/cochecker"
        element={
          <ProtectedRoute>
            <Hero />
          </ProtectedRoute>
        }
      /> */}


      <Route
        path="/rm"
        element={
          <ProtectedRoute>
            <RMDashboard />
          </ProtectedRoute>
        }
      />

       {/* <Route
        path="/cocheker"
        element={
          <ProtectedRoute>
            <CheckerLayout/>
          </ProtectedRoute>
        }
      /> */}

      {/* <Route
        path="/cocreator"
        element={
          <ProtectedRoute>
            <Creatchecklistpage />
          </ProtectedRoute>
        }
      /> */}

      {/* STANDALONE CHECKLIST ROUTES */}
      <Route path="/cl" element={<CreditChecklist />} />
      <Route path="/rmck" element={<RequestChecklist />} />

      {/* CATCH-ALL */}
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
};

export default App;
