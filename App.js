import React, { useState, useEffect } from 'react';
import './App.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);

  // Check if user is logged in from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentPage('dashboard');
    }
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const handleRegisterSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setCurrentPage('landing');
  };

  const handleUpdateProfile = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <div className="App">
      {currentPage === 'landing' && <Landing onNavigate={handleNavigate} />}
      {currentPage === 'login' && <Login onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />}
      {currentPage === 'register' && <Register onNavigate={handleNavigate} onRegisterSuccess={handleRegisterSuccess} />}
      {currentPage === 'dashboard' && user && (
        <Dashboard 
          user={user} 
          onNavigate={handleNavigate} 
          onLogout={handleLogout} 
        />
      )}
      {currentPage === 'profile' && user && (
        <Profile 
          user={user} 
          onNavigate={handleNavigate} 
          onUpdateProfile={handleUpdateProfile}
        />
      )}
    </div>
  );
}

export default App;
