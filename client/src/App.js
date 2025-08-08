import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useTheme } from './contexts/ThemeContext';

// Components
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Main pages
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';



// Contribution pages
import Contributions from './pages/contributions/Contributions';
import MakePayment from './pages/contributions/MakePayment';
import PaymentHistory from './pages/contributions/PaymentHistory';

// Loan pages
import Loans from './pages/loans/Loans';
import ApplyLoan from './pages/loans/ApplyLoan';
import LoanDetails from './pages/loans/LoanDetails';

// Meeting pages
import Meetings from './pages/meetings/Meetings';
import CreateMeeting from './pages/meetings/CreateMeeting';
import MeetingDetails from './pages/meetings/MeetingDetails';

// Report pages
import Reports from './pages/reports/Reports';
import FinancialReport from './pages/reports/FinancialReport';

// Profile and settings
import Profile from './pages/profile/Profile';
import Settings from './pages/settings/Settings';

// Contact page
import Contact from './pages/Contact';

// Admin pages
import AdminMembers from './pages/admin/Members';
import AdminFinances from './pages/admin/Finances';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Layout>{children}</Layout>;
};

// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />



        {/* Contribution Routes */}
        <Route
          path="/contributions"
          element={
            <ProtectedRoute>
              <Contributions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contributions/pay"
          element={
            <ProtectedRoute>
              <MakePayment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contributions/history"
          element={
            <ProtectedRoute>
              <PaymentHistory />
            </ProtectedRoute>
          }
        />

        {/* Loan Routes */}
        <Route
          path="/loans"
          element={
            <ProtectedRoute>
              <Loans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loans/apply"
          element={
            <ProtectedRoute>
              <ApplyLoan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loans/:id"
          element={
            <ProtectedRoute>
              <LoanDetails />
            </ProtectedRoute>
          }
        />

        {/* Meeting Routes */}
        <Route
          path="/meetings"
          element={
            <ProtectedRoute>
              <Meetings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meetings/create"
          element={
            <ProtectedRoute>
              <CreateMeeting />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meetings/:id"
          element={
            <ProtectedRoute>
              <MeetingDetails />
            </ProtectedRoute>
          }
        />

        {/* Report Routes */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports/financial"
          element={
            <ProtectedRoute>
              <FinancialReport />
            </ProtectedRoute>
          }
        />

        {/* Contact Page */}
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

        {/* Profile and Settings */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/members"
          element={
            <ProtectedRoute>
              <AdminMembers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/finances"
          element={
            <ProtectedRoute>
              <AdminFinances />
            </ProtectedRoute>
          }
        />

        {/* Default Routes */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
