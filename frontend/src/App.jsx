import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

// Protected Route Component
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <div style={{ position: 'fixed', bottom: '15px', width: '100%', textAlign: 'center', zIndex: 50, fontSize: '13px', color: '#666', pointerEvents: 'none' }}>
        <div style={{ fontWeight: 500 }}>Made by: Utkarsh Bhujbal</div>
        <div style={{ opacity: 0.8 }}>(utkarshbhujbal02@gmail.com)</div>
      </div>
    </BrowserRouter>
  );
}

export default App;
