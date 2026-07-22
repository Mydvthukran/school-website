import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Gallery from './pages/Gallery';
import Events from './pages/Events';
import Staff from './pages/Staff';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import SubmissionsManager from './pages/admin/sections/SubmissionsManager';
import EventsManager from './pages/admin/sections/EventsManager';
import StaffManager from './pages/admin/sections/StaffManager';
import GalleryManager from './pages/admin/sections/GalleryManager';
import StatsManager from './pages/admin/sections/StatsManager';
import MessagesManager from './pages/admin/sections/MessagesManager';

import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* ── Public Site ── */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="academics" element={<Academics />} />
            <Route path="admissions" element={<Admissions />} />
            <Route path="events" element={<Events />} />
            <Route path="staff" element={<Staff />} />
            <Route path="careers" element={<Careers />} />
            <Route path="contact" element={<Contact />} />
            <Route path="gallery" element={<Gallery />} />
          </Route>

          {/* ── Admin Panel ── */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/submissions" element={<ProtectedRoute><SubmissionsManager /></ProtectedRoute>} />
          <Route path="/admin/events" element={<ProtectedRoute><EventsManager /></ProtectedRoute>} />
          <Route path="/admin/staff" element={<ProtectedRoute><StaffManager /></ProtectedRoute>} />
          <Route path="/admin/gallery" element={<ProtectedRoute><GalleryManager /></ProtectedRoute>} />
          <Route path="/admin/stats" element={<ProtectedRoute><StatsManager /></ProtectedRoute>} />
          <Route path="/admin/messages" element={<ProtectedRoute><MessagesManager /></ProtectedRoute>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
