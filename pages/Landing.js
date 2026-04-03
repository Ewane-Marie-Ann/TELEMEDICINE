import React from 'react';
import '../styles/Landing.css';

const Landing = ({ onNavigate }) => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="landing-header">
          <h1>
            <i className="fas fa-heartbeat"></i> Telemedicine
          </h1>
          <p>Patient Monitoring System</p>
        </div>

        <div className="landing-description">
          <h2>Real-time Patient Vital Monitoring</h2>
          <p>A comprehensive solution for monitoring patient health vitals with real-time data tracking and analysis.</p>
          
          <div className="features">
            <div className="feature-item">
              <i className="fas fa-chart-line"></i>
              <h3>Real-time Monitoring</h3>
              <p>Track vital signs continuously</p>
            </div>
            <div className="feature-item">
              <i className="fas fa-bell"></i>
              <h3>Smart Alerts</h3>
              <p>Get notified of abnormal readings</p>
            </div>
            <div className="feature-item">
              <i className="fas fa-history"></i>
              <h3>Data History</h3>
              <p>Access complete health records</p>
            </div>
          </div>
        </div>

        <div className="landing-buttons">
          <button className="btn btn-primary" onClick={() => onNavigate('login')}>
            Login
          </button>
          <button className="btn btn-secondary" onClick={() => onNavigate('register')}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
