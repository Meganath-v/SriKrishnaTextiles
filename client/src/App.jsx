import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BulkOrderPage from './pages/BulkOrderPage';
import AdminDashboard from './pages/AdminDashboard';
import CareersPage from './pages/CareersPage';
import UserLogin from './pages/UserLogin';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0f0c29] text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bulk-order" element={<BulkOrderPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
