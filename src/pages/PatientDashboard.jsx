import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { motion } from 'framer-motion';
import { 
  Heart, Home, Activity, Pill, Calendar, Bell, 
  LogOut, Menu, Download, Thermometer, Wind, Scale
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';

// Sample data for the trends
const chartData = [
  { time: '08:00', heart: 72, sp02: 98 },
  { time: '10:00', heart: 75, sp02: 97 },
  { time: '12:00', heart: 82, sp02: 98 },
  { time: '14:00', heart: 78, sp02: 99 },
  { time: '16:00', heart: 74, sp02: 98 },
];

export default function PatientDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const { logout, currentUser } = useAuth();

  const vitals = [
    { icon: Heart, title: 'Heart Rate', value: 74, unit: 'bpm', status: 'normal', color: '#EF4444' },
    { icon: Thermometer, title: 'Temperature', value: 36.5, unit: '°C', status: 'normal', color: '#F59E0B' },
    { icon: Wind, title: 'Oxygen Level', value: 98, unit: '%', status: 'normal', color: '#3B82F6' },
    { icon: Heart, title: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'normal', color: '#22C55E' },
    { icon: Scale, title: 'Weight', value: 72.5, unit: 'kg', status: 'normal', color: '#8B5CF6' },
  ];

  const menuItems = [
    { icon: Home, label: 'Dashboard' }, 
    { icon: Activity, label: 'My Vitals' }, 
    { icon: Pill, label: 'Prescriptions' }, 
    { icon: Calendar, label: 'Appointments' }
  ];

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', display: 'flex' }}>
      {/* Sidebar */}
      <motion.div 
        className="sidebar" 
        style={{ 
          width: sidebarOpen ? '260px' : '80px',
          background: 'rgba(30, 41, 59, 0.5)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(59, 130, 246, 0.1)',
          height: '100vh',
          position: 'sticky',
          top: 0
        }} 
        animate={{ width: sidebarOpen ? '260px' : '80px' }} 
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 border-bottom" style={{ borderColor: 'rgba(59, 130, 246, 0.1)' }}>
          <div className="d-flex align-items-center justify-content-between">
            {sidebarOpen && <h5 className="mb-0" style={{ color: 'var(--text-primary)' }}>MediCare</h5>}
            <button className="btn p-0" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ color: 'var(--primary-accent)' }}>
              <Menu size={24} />
            </button>
          </div>
        </div>
        <ul className="list-unstyled p-2">
          {menuItems.map((item, idx) => (
            <li key={idx} className="mb-2">
              <button 
                onClick={() => setActiveTab(item.label)}
                className={`btn w-100 d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none border-0 transition-all ${activeTab === item.label ? 'active' : ''}`}
                style={{ 
                  color: activeTab === item.label ? 'var(--primary-accent)' : 'var(--text-secondary)',
                  background: activeTab === item.label ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                  textAlign: 'left'
                }}
              >
                <item.icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Top Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'rgba(30, 41, 59, 0.5)', borderBottom: '1px solid rgba(59, 130, 246, 0.1)' }}>
          <div className="container-fluid">
            <div className="d-flex align-items-center gap-3 w-100 px-3">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search..." 
                style={{ 
                  background: 'rgba(30, 41, 59, 0.6)', 
                  borderColor: 'rgba(59, 130, 246, 0.2)', 
                  color: 'var(--text-primary)', 
                  maxWidth: '300px' 
                }} 
              />
              <div className="ms-auto d-flex align-items-center gap-3">
                <button className="btn position-relative" style={{ color: 'var(--primary-accent)' }}>
                  <Bell size={24} />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">2</span>
                </button>
                <div className="d-flex align-items-center gap-2 border-start ps-3" style={{ borderColor: 'rgba(59, 130, 246, 0.1)' }}>
                  <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', background: 'rgba(59, 130, 246, 0.2)', color: 'var(--primary-accent)', fontSize: '1.2rem' }}>
                    {currentUser?.avatar || '👤'}
                  </div>
                  <button className="btn btn-sm" onClick={() => logout()} style={{ color: 'var(--text-tertiary)' }}>
                    <LogOut size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-4">
          {activeTab === 'Dashboard' ? (
            <>
          <motion.div className="mb-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 style={{ color: 'var(--text-primary)' }}>Welcome back, {currentUser?.name}!</h2>
            <p style={{ color: 'var(--text-tertiary)' }}>Here's your health summary for today</p>
          </motion.div>

          {/* Vital Cards */}
          <div className="row g-4 mb-5">
            {vitals.map((vital, idx) => {
              const Icon = vital.icon;
              return (
                <motion.div key={idx} className="col-md-6 col-lg-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                  <div 
                    className="p-4 rounded-4" 
                    style={{ 
                      background: 'rgba(30, 41, 59, 0.5)', 
                      border: '1px solid rgba(59, 130, 246, 0.1)',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} 
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div style={{ width: '50px', height: '50px', background: `rgba(${vital.color === '#EF4444' ? '239, 68, 68' : vital.color === '#F59E0B' ? '245, 158, 11' : vital.color === '#22C55E' ? '34, 197, 94' : '59, 130, 246'}, 0.1)`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: vital.color }}>
                        <Icon size={28} />
                      </div>
                      <span className="badge rounded-pill bg-success-subtle text-success">{vital.status}</span>
                    </div>
                    <h5 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{vital.title}</h5>
                    <div className="d-flex align-items-baseline gap-2">
                      <span style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 'bold' }}>{vital.value}</span>
                      <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>{vital.unit}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Charts */}
          <motion.div className="row g-4 mb-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <div className="col-lg-6">
              <div className="card" style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                <div className="card-body">
                  <h5 style={{ color: 'var(--text-primary)' }} className="mb-4">Heart Rate Trend</h5>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.1)" />
                      <XAxis dataKey="time" stroke="var(--text-tertiary)" />
                      <YAxis stroke="var(--text-tertiary)" />
                      <Tooltip contentStyle={{ background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(59, 130, 246, 0.3)' }} />
                      <Line type="monotone" dataKey="heart" stroke="#EF4444" strokeWidth={2} dot={{ fill: '#EF4444', r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card" style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                <div className="card-body">
                  <h5 style={{ color: 'var(--text-primary)' }} className="mb-4">Oxygen Level Trend</h5>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.1)" />
                      <XAxis dataKey="time" stroke="var(--text-tertiary)" />
                      <YAxis stroke="var(--text-tertiary)" />
                      <Tooltip contentStyle={{ background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(59, 130, 246, 0.3)' }} />
                      <Line type="monotone" dataKey="sp02" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6', r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Appointments & Prescriptions */}
          <div className="row g-4">
            <div className="col-lg-6">
              <motion.div className="card" style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(59, 130, 246, 0.1)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <div className="card-body">
                  <h5 style={{ color: 'var(--text-primary)' }} className="mb-4"><Calendar size={20} className="me-2" />Upcoming Appointments</h5>
                  {[
                    { doctor: 'Dr. Emily Johnson', date: '2026-05-20', time: '10:00 AM', type: 'Cardiology Check-up' }, 
                    { doctor: 'Dr. Michael Lee', date: '2026-05-25', time: '02:00 PM', type: 'Follow-up Consultation' }
                  ].map((apt, idx) => (
                    <motion.div key={idx} className="p-3 rounded-3 mb-3" style={{ background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.1)' }} whileHover={{ x: 5 }}>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 style={{ color: 'var(--text-primary)' }} className="mb-1">{apt.doctor}</h6>
                          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }} className="mb-1">{apt.type}</p>
                          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>{apt.date} at {apt.time}</p>
                        </div>
                        <span className="badge bg-info">Scheduled</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <motion.div className="card" style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(59, 130, 246, 0.1)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <div className="card-body">
                  <h5 style={{ color: 'var(--text-primary)' }} className="mb-4"><Pill size={20} className="me-2" />Current Prescriptions</h5>
                  {[
                    { medicine: 'Aspirin 100mg', dosage: '1 tablet daily', duration: '30 days' }, 
                    { medicine: 'Lisinopril 10mg', dosage: '1 tablet morning', duration: '60 days' }
                  ].map((presc, idx) => (
                    <motion.div key={idx} className="p-3 rounded-3 mb-3 d-flex justify-content-between align-items-start" style={{ background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.1)' }} whileHover={{ x: 5 }}>
                      <div>
                        <h6 style={{ color: 'var(--text-primary)' }} className="mb-1">{presc.medicine}</h6>
                        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }} className="mb-0">{presc.dosage}</p>
                        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>Duration: {presc.duration}</p>
                      </div>
                      <button className="btn btn-sm btn-outline-primary"><Download size={16} /></button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="d-flex flex-column align-items-center justify-content-center"
              style={{ minHeight: '60vh' }}
            >
              <div className="p-4 rounded-circle bg-primary bg-opacity-10 mb-4">
                <Activity size={48} className="text-primary" />
              </div>
              <h3 className="fw-bold">{activeTab}</h3>
              <p className="text-secondary">Viewing detailed information for {activeTab} section.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
