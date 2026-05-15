import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { Heart, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

function LoginPage() {
  const [email, setEmail] = useState('patient@medicareplus.com');
  const [password, setPassword] = useState('Patient123!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const result = await login({ email, password });
      if (!result.success) {
        setMessage(result.message);
      }
    } catch (err) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const quickLoginOptions = [
    { email: 'admin@medicareplus.com', password: 'Admin123!', label: 'Admin Demo' },
    { email: 'doctor@medicareplus.com', password: 'Doctor123!', label: 'Doctor Demo' },
    { email: 'patient@medicareplus.com', password: 'Patient123!', label: 'Patient Demo' },
  ];

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, var(--bg-primary) 0%, rgba(30, 41, 59, 0.6) 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="container">
        <div className="row align-items-center justify-content-center">
          {/* Left Side - Illustration & Info */}
          <div
            className="col-lg-5 d-none d-lg-flex flex-column justify-content-center mb-5 mb-lg-0"
          >
            <div className="mb-5">
              <div
                className="rounded-4 p-5 mb-4"
                style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '2px solid rgba(59, 130, 246, 0.3)',
                  textAlign: 'center',
                  minHeight: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Heart size={120} style={{ color: 'var(--primary-accent)' }} className="mb-4" />
                <h3 style={{ color: 'var(--text-primary)' }}>Monitor Patients Anywhere</h3>
              </div>
              <h4 style={{ color: 'var(--text-primary)' }} className="mb-3">
                Your Health, Our Priority
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                Access real-time patient monitoring, secure records, and intelligent alerts anytime, anywhere. Experience the future of healthcare.
              </p>
            </div>
          </div>

          {/* Right Side - Login Card */}
          <div
            className="col-lg-5"
          >
            <div
              className="p-5 rounded-4"
              style={{
                background: 'rgba(30, 41, 59, 0.5)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)',
              }}
            >
              {/* Logo */}
              <div className="text-center mb-4">
                <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                  <Heart size={32} style={{ color: 'var(--primary-accent)' }} />
                  <h3 className="mb-0" style={{ color: 'var(--text-primary)' }}>MediCare Plus</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>Welcome Back</p>
              </div>

              {/* Error Alert */}
              {message && (
                <div
                  className="alert alert-danger d-flex gap-2 mb-4"
                >
                  <AlertCircle size={20} />
                  <span>{message}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-4">
                  <label className="form-label" style={{ color: 'var(--text-secondary)' }}>
                    Email Address
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0" style={{ borderColor: 'rgba(59, 130, 246, 0.2)' }}>
                      <Mail size={20} style={{ color: 'var(--text-tertiary)' }} />
                    </span>
                    <input
                      type="email"
                      className="form-control bg-transparent border-start-0"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ borderColor: 'rgba(59, 130, 246, 0.2)' }}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="form-label" style={{ color: 'var(--text-secondary)' }}>
                    Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0" style={{ borderColor: 'rgba(59, 130, 246, 0.2)' }}>
                      <Lock size={20} style={{ color: 'var(--text-tertiary)' }} />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control bg-transparent border-start-0 border-end-0"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ borderColor: 'rgba(59, 130, 246, 0.2)' }}
                      required
                    />
                    <button
                      type="button"
                      className="btn bg-transparent border-start-0"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ borderColor: 'rgba(59, 130, 246, 0.2)' }}
                    >
                      {showPassword ? (
                        <EyeOff size={20} style={{ color: 'var(--text-tertiary)' }} />
                      ) : (
                        <Eye size={20} style={{ color: 'var(--text-tertiary)' }} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      style={{
                        accentColor: 'var(--primary-accent)',
                      }}
                    />
                    <label className="form-check-label" htmlFor="rememberMe" style={{ color: 'var(--text-secondary)' }}>
                      Remember me
                    </label>
                  </div>
                  <a href="#" style={{ color: 'var(--primary-accent)', textDecoration: 'none' }}>
                    Forgot Password?
                  </a>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-bold mb-4"
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>

                {/* Demo Buttons */}
                <div className="mb-4">
                  <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', textAlign: 'center' }} className="mb-3">
                    Try Demo Accounts
                  </p>
                  <div className="d-grid gap-2">
                    {quickLoginOptions.map((option, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => {
                          setEmail(option.email);
                          setPassword(option.password);
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </form>

              {/* Divider */}
              <div className="position-relative mb-4">
                <hr style={{ borderColor: 'rgba(59, 130, 246, 0.2)' }} />
                <span
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(30, 41, 59, 0.5)',
                    padding: '0 1rem',
                    color: 'var(--text-tertiary)',
                    fontSize: '0.85rem',
                  }}
                >
                  New to MediCare Plus?
                </span>
              </div>

              {/* Register Link */}
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
                Don't have an account? <a href="#" style={{ color: 'var(--primary-accent)', fontWeight: 'bold', textDecoration: 'none' }}>Sign Up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
