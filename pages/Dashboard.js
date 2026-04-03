import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../styles/Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = ({ user, onNavigate, onLogout }) => {
  const [currentVitals, setCurrentVitals] = useState({ heartRate: 72, spo2: 98, temperature: 36.5 });
  const [vitalsHistory, setVitalsHistory] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Heart Rate (bpm)',
        data: [],
        borderColor: '#ff6384',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        tension: 0.4,
      },
      {
        label: 'SpO₂ (%)',
        data: [],
        borderColor: '#36a2eb',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Temperature (°C)',
        data: [],
        borderColor: '#ffce56',
        backgroundColor: 'rgba(255, 206, 86, 0.1)',
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const vitals = generateVitals();
      const now = new Date();
      const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

      setCurrentVitals({
        heartRate: vitals.heart_rate,
        spo2: vitals.spo2,
        temperature: parseFloat(vitals.temperature),
      });

      setChartData(prev => ({
        labels: [...prev.labels.slice(-9), timeStr],
        datasets: [
          { ...prev.datasets[0], data: [...prev.datasets[0].data.slice(-9), vitals.heart_rate] },
          { ...prev.datasets[1], data: [...prev.datasets[1].data.slice(-9), vitals.spo2] },
          { ...prev.datasets[2], data: [...prev.datasets[2].data.slice(-9), parseFloat(vitals.temperature)] },
        ],
      }));

      setVitalsHistory(prev => [{ time: timeStr, ...vitals }, ...prev.slice(0, 9)]);
      checkAlerts(vitals);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const generateVitals = () => ({
    heart_rate: Math.floor(Math.random() * 41) + 60,
    spo2: Math.floor(Math.random() * 6) + 95,
    temperature: (Math.random() * 2 + 36).toFixed(1),
  });

  const checkAlerts = (vitals) => {
    const newAlerts = [];
    if (vitals.heart_rate < 60 || vitals.heart_rate > 100) {
      newAlerts.push({ type: 'warning', message: `Heart rate is ${vitals.heart_rate} bpm (normal: 60-100)` });
    }
    if (vitals.spo2 < 95) {
      newAlerts.push({ type: 'danger', message: `SpO₂ is ${vitals.spo2}% (Low)` });
    }
    if (parseFloat(vitals.temperature) > 37.5) {
      newAlerts.push({ type: 'warning', message: `Temperature is ${vitals.temperature}°C (High)` });
    }
    setAlerts(newAlerts);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: false },
    },
    plugins: {
      legend: { position: 'top' },
    },
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <h1><i className="fas fa-heartbeat"></i> Patient Dashboard</h1>
        </div>
        <div className="header-right">
          <button className="btn-icon" onClick={() => onNavigate('profile')} title="Profile">
            <i className="fas fa-user-circle"></i>
          </button>
          <button className="btn btn-secondary btn-small" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="patient-info">
          <h2>Welcome, {user?.name}!</h2>
          <p>Member since: {user?.joinDate}</p>
        </div>

        {alerts.length > 0 && (
          <div className="alerts-section">
            {alerts.map((alert, idx) => (
              <div key={idx} className={`alert alert-${alert.type}`}>
                <i className={alert.type === 'danger' ? 'fas fa-exclamation-circle' : 'fas fa-exclamation-triangle'}></i>
                {alert.message}
              </div>
            ))}
          </div>
        )}

        <div className="vitals-cards">
          <div className="card" id="heart-rate-card">
            <div className="card-icon"><i className="fas fa-heart"></i></div>
            <div className="card-content"><h3>Heart Rate</h3><div className="value">{currentVitals.heartRate} bpm</div></div>
          </div>
          <div className="card" id="spo2-card">
            <div className="card-icon"><i className="fas fa-lungs"></i></div>
            <div className="card-content"><h3>SpO₂</h3><div className="value">{currentVitals.spo2} %</div></div>
          </div>
          <div className="card" id="temperature-card">
            <div className="card-icon"><i className="fas fa-thermometer-half"></i></div>
            <div className="card-content"><h3>Temperature</h3><div className="value">{currentVitals.temperature} °C</div></div>
          </div>
        </div>

        <div className="charts-section">
          <h2>Vitals Trend</h2>
          <div className="chart-container"><Line data={chartData} options={chartOptions} /></div>
        </div>

        <div className="table-section">
          <h2>Vitals History</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr><th>Time</th><th>Heart Rate (bpm)</th><th>SpO₂ (%)</th><th>Temperature (°C)</th></tr>
              </thead>
              <tbody>
                {vitalsHistory.map((record, idx) => (
                  <tr key={idx}>
                    <td>{record.time}</td>
                    <td>{record.heart_rate}</td>
                    <td>{record.spo2}</td>
                    <td>{record.temperature}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
