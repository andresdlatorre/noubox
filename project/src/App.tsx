import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages - User App
import HomePage from './pages/user/HomePage';
import BrowsePage from './pages/user/BrowsePage';
import QueuePage from './pages/user/QueuePage';
import ProfilePage from './pages/user/ProfilePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Pages - Admin App
import AdminDashboard from './pages/admin/AdminDashboard';
import SongManagement from './pages/admin/SongManagement';
import UserManagement from './pages/admin/UserManagement';
import VenueSettings from './pages/admin/VenueSettings';

// Components
import { NowPlaying } from './components/music/NowPlaying';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="browse" element={<BrowsePage />} />
          <Route path="queue" element={<QueuePage />} />
          <Route 
            path="profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* Admin/Partner Routes */}
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="songs" element={<SongManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="settings" element={<VenueSettings />} />
        </Route>
      </Routes>

      {/* Global Player - Shows on all pages except admin */}
      <NowPlaying />
    </Router>
  );
}

export default App;