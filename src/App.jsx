import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import DoctorDashboard from './pages/DoctorDashboard.jsx';
import PatientDashboard from './pages/PatientDashboard.jsx';
import NotFound from './pages/NotFound.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import { AuthProvider } from './hooks/useAuth.jsx';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/doctor" element={<ProtectedRoute requiredRole="doctor"><DoctorDashboard /></ProtectedRoute>} />
        <Route path="/patient" element={<ProtectedRoute requiredRole="patient"><PatientDashboard /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
