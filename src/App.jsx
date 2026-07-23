// src/App.jsx - Application Router & Layout

import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Client Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { NewsEvents } from './pages/NewsEvents';
import { NewsDetail } from './pages/NewsDetail';
import { Donation } from './pages/Donation';
import { Volunteer } from './pages/Volunteer';
import { Contact } from './pages/Contact';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminNews } from './pages/admin/AdminNews';
import { AdminDonations } from './pages/admin/AdminDonations';
import { AdminVolunteers } from './pages/admin/AdminVolunteers';
import { ProtectedRoute } from './components/ProtectedRoute';

export function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className={isAdminRoute ? "admin-main-wrapper" : "app-main"}>
        <Routes>
          {/* Public Client Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<NewsEvents />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Authentication & Protected Management Routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/news"
            element={
              <ProtectedRoute>
                <AdminNews />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/donations"
            element={
              <ProtectedRoute>
                <AdminDonations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/volunteers"
            element={
              <ProtectedRoute>
                <AdminVolunteers />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
