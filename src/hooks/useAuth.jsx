import { createContext, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../data/users.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem('telemed-user');
    return stored ? JSON.parse(stored) : null;
  });
  const navigate = useNavigate();

  const login = ({ email, password }) => {
    const matchedUser = users.find((user) => user.email === email && user.password === password);

    if (!matchedUser) {
      return { success: false, message: 'Invalid credentials. Please try again.' };
    }

    setCurrentUser(matchedUser);
    localStorage.setItem('telemed-user', JSON.stringify(matchedUser));
    const redirectMap = {
      admin: '/admin',
      doctor: '/doctor',
      patient: '/patient',
    };

    navigate(redirectMap[matchedUser.role] || '/');
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('telemed-user');
    navigate('/login');
  };

  const value = useMemo(() => ({ currentUser, login, logout }), [currentUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
