import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Activity,
  Users,
  Calendar,
  AlertCircle,
  FileText,
  MessageSquare,
  Video,
  Settings,
  Search,
  Bell,
  LogOut,
  Menu,
  Heart,
  Thermometer,
  Wind,
  Droplets,
  ChevronRight,
  User,
  Clock,
  Circle,
  Scale
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Mock Data for Live Vitals Chart
const liveVitalsData = [
  { time: '10:00', hr: 72, temp: 36.6, spo2: 98 },
  { time: '10:05', hr: 75, temp: 36.7, spo2: 97 },
  { time: '10:10', hr: 82, temp: 36.8, spo2: 98 },
  { time: '10:15', hr: 78, temp: 36.6, spo2: 99 },
  { time: '10:20', hr: 74, temp: 36.5, spo2: 98 },
  { time: '10:25', hr: 85, temp: 37.1, spo2: 96 },
];

export default function DoctorDashboard() {
  const { currentUser, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [pulseColor, setPulseColor] = useState('#3B82F6');

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: Activity, label: 'Live Monitoring' },
    { icon: Users, label: 'Patients' },
    { icon: Calendar, label: 'Appointments' },
    { icon: AlertCircle, label: 'Emergency Alerts' },
    { icon: FileText, label: 'Reports' },
    { icon: MessageSquare, label: 'Messages' },
    { icon: Video, label: 'Video Consultation' },
    { icon: Settings, label: 'Settings' },
  ];

  const monitoringCards = [
    { label: 'Avg Heart Rate', value: '78', unit: 'bpm', trend: '+2%', icon: Heart, color: '#EF4444', status: 'Normal' },
    { label: 'Avg Temperature', value: '36.8', unit: '°C', trend: 'Stable', icon: Thermometer, color: '#F59E0B', status: 'Normal' },
    { label: 'Blood Pressure', value: '120/80', unit: 'mmHg', trend: '-1%', icon: Droplets, color: '#10B981', status: 'Normal' },
    { label: 'Oxygen Level', value: '94', unit: '%', trend: '-4%', icon: Wind, color: '#3B82F6', status: 'Warning' },
    { label: 'Avg Weight', value: '74.2', unit: 'kg', trend: '+0.5%', icon: Scale, color: '#8B5CF6', status: 'Normal' },
  ];

  const patients = [
    { id: '1', name: 'Sara Johnson', hr: '102', temp: '38.2', spo2: '94', bp: '135/85', weight: '68.5', status: 'Critical' },
    { id: '2', name: 'Mark Rivera', hr: '74', temp: '36.6', spo2: '98', bp: '120/80', weight: '82.0', status: 'Normal' },
    { id: '3', name: 'Amina Patel', hr: '88', temp: '37.1', spo2: '96', bp: '128/82', weight: '64.2', status: 'Warning' },
    { id: '4', name: 'James Wilson', hr: '72', temp: '36.5', spo2: '99', bp: '118/75', weight: '88.7', status: 'Normal' },
  ];

  // Pulsing effect for "Live" feeling
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseColor(prev => prev === '#3B82F6' ? 'rgba(59, 130, 246, 0.4)' : '#3B82F6');
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="d-flex" style={{ background: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      {/* 1. Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="sidebar glass-morphism border-end border-opacity-10 position-sticky top-0 vh-100"
        style={{ 
          background: 'rgba(15, 23, 42, 0.9)', 
          backdropFilter: 'blur(20px)',
          borderColor: 'rgba(59, 130, 246, 0.1)' 
        }}
      >
        <div className="p-4 d-flex align-items-center gap-3">
          <div className="rounded-3 p-2 bg-primary bg-opacity-25 shadow-glow">
            <Heart size={24} className="text-primary" />
          </div>
          {sidebarOpen && <h5 className="mb-0 fw-bold tracking-tight">MediCare <span className="text-primary">Pro</span></h5>}
        </div>

        <nav className="mt-4 px-3 flex-grow-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`btn w-100 d-flex align-items-center gap-3 mb-2 p-3 rounded-3 transition-all border-0 ${
                activeTab === item.label ? 'bg-primary bg-opacity-10 text-primary shadow-glow-sm' : 'text-secondary'
              }`}
              style={{ textAlign: 'left' }}
            >
              <item.icon size={20} className={activeTab === item.label ? 'text-primary' : 'text-secondary'} />
              {sidebarOpen && <span className="fw-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-3 border-top border-opacity-10">
          <button onClick={logout} className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 border-0">
            <LogOut size={18} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-grow-1 overflow-auto">
        {/* 2. Top Navbar */}
        <header className="px-4 py-3 glass-morphism sticky-top" style={{ background: 'rgba(15, 23, 42, 0.7)', zIndex: 1000 }}>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="btn btn-link text-primary p-0">
                <Menu size={24} />
              </button>
              <div className="position-relative d-none d-lg-block">
                <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" size={18} />
                <input
                  type="text"
                  className="form-control bg-dark border-0 bg-opacity-50 ps-5 rounded-3"
                  placeholder="Search patients by ID or Name..."
                  style={{ width: '400px', color: '#fff', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            <div className="d-flex align-items-center gap-4">
              <div className="d-flex align-items-center gap-2 bg-success bg-opacity-10 px-3 py-1 rounded-pill">
                <Circle size={8} fill="#10B981" className="text-success pulse" />
                <span className="text-success fw-medium" style={{ fontSize: '0.75rem' }}>System Online</span>
              </div>
              <div className="position-relative pointer">
                <Bell size={22} className="text-secondary" />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger p-1">
                  <span className="visually-hidden">unread alerts</span>
                </span>
              </div>
              <div className="d-flex align-items-center gap-3 ps-3 border-start border-opacity-10">
                <div className="text-end">
                  <div className="fw-bold small">Dr. {currentUser?.name}</div>
                  <div className="text-primary" style={{ fontSize: '0.7rem' }}>Head Cardiology</div>
                </div>
                <div className="rounded-circle bg-primary bg-opacity-20 p-1 border border-primary border-opacity-30">
                  <User size={24} className="text-primary" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4">
          {activeTab === 'Dashboard' ? (
            <>
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h2 className="fw-bold mb-1">Advanced Patient Monitoring</h2>
              <p className="text-secondary mb-0">Active Telemetry Session: #82910-B</p>
            </div>
            <div className="text-end">
              <div className="text-secondary small mb-1">Current Session Time</div>
              <div className="h4 mb-0 fw-mono">02:45:12</div>
            </div>
          </div>

          {/* 3. Real-Time Monitoring Cards */}
          <div className="row g-4 mb-4">
            {monitoringCards.map((card, idx) => (
              <motion.div
                key={idx}
                className="col-xl-3 col-md-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="card glass-morphism border-0 p-4 h-100 shadow-hover" 
                     style={{ background: 'rgba(30, 41, 59, 0.4)', borderLeft: `4px solid ${card.status === 'Critical' ? '#EF4444' : 'rgba(59, 130, 246, 0.2)'}` }}>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="p-2 rounded-3" style={{ background: `${card.color}15` }}>
                      <card.icon size={22} style={{ color: card.color }} />
                    </div>
                    <span className={`badge rounded-pill ${card.status === 'Warning' ? 'bg-warning' : 'bg-primary'} bg-opacity-10 ${card.status === 'Warning' ? 'text-warning' : 'text-primary'}`}>
                      {card.status}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="d-flex align-items-baseline gap-2">
                      <h2 className="fw-bold mb-0">{card.value}</h2>
                      <span className="text-secondary small fw-medium">{card.unit}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="text-secondary small">{card.label}</span>
                      <span className="text-success small d-flex align-items-center gap-1">
                        {card.trend} <Activity size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="row g-4">
            {/* 4. Real-Time Charts */}
            <div className="col-lg-8">
              <div className="card glass-morphism border-0 p-4 h-100" style={{ background: 'rgba(30, 41, 59, 0.4)' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0 d-flex align-items-center gap-2">
                    <Activity size={20} className="text-primary" /> Live Telemetry Waveform
                  </h5>
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-outline-primary active">1H</button>
                    <button className="btn btn-outline-primary">6H</button>
                    <button className="btn btn-outline-primary">24H</button>
                  </div>
                </div>
                <div style={{ width: '100%', height: 400 }}>
                  <ResponsiveContainer>
                    <AreaChart data={liveVitalsData}>
                      <defs>
                        <linearGradient id="colorHR" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ background: '#0F172A', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '12px' }} />
                      <Area 
                        type="monotone" 
                        dataKey="hr" 
                        stroke="#3B82F6" 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#colorHR)" 
                        animationDuration={2000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* 6. Emergency Alerts Panel */}
            <div className="col-lg-4">
              <div className="card glass-morphism border-0 p-4 h-100" style={{ background: 'rgba(30, 41, 59, 0.4)' }}>
                <h5 className="mb-4 text-danger d-flex align-items-center gap-2">
                  <AlertCircle size={20} /> Critical Alerts
                </h5>
                <div className="d-flex flex-column gap-3">
                  <div className="alert-item p-3 rounded-3 border border-danger border-opacity-25" style={{ background: 'rgba(239, 68, 68, 0.05)' }}>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="fw-bold">Sara Johnson</span>
                      <span className="badge bg-danger pulse-blink">CRITICAL</span>
                    </div>
                    <p className="small text-secondary mb-2">Tachycardia detected. Heart rate reached 124 bpm for  2 mins.</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="small text-secondary"><Clock size={12} /> 2 mins ago</span>
                      <button className="btn btn-sm btn-danger px-3">Review</button>
                    </div>
                  </div>

                  <div className="alert-item p-3 rounded-3 border border-warning border-opacity-25" style={{ background: 'rgba(245, 158, 11, 0.05)' }}>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="fw-bold">Amina Patel</span>
                      <span className="badge bg-warning text-dark">WARNING</span>
                    </div>
                    <p className="small text-secondary mb-2">SpO2 level drop detected (94%). Patient reported dizziness.</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="small text-secondary"><Clock size={12} /> 14 mins ago</span>
                      <button className="btn btn-sm btn-warning px-3">Acknowledge</button>
                    </div>
                  </div>
                </div>
                
                {/* 7. Recent Activities Section */}
                <div className="mt-5 pt-4 border-top border-opacity-10">
                  <h6 className="text-secondary small text-uppercase fw-bold mb-3">System Updates</h6>
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex gap-3 align-items-center">
                      <div className="p-2 rounded-circle bg-primary bg-opacity-10"><User size={14} className="text-primary" /></div>
                      <div className="small">Dr. Lee joined video call with Patient #821</div>
                    </div>
                    <div className="d-flex gap-3 align-items-center">
                      <div className="p-2 rounded-circle bg-success bg-opacity-10"><FileText size={14} className="text-success" /></div>
                      <div className="small">Prescription sent for Mark Rivera</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Live Patient Table */}
          <div className="card glass-morphism border-0 p-4 mt-4" style={{ background: 'rgba(30, 41, 59, 0.4)' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0">Patient Status Registry</h5>
              <button className="btn btn-sm btn-link text-primary text-decoration-none d-flex align-items-center gap-1">
                View All Registry <ChevronRight size={16} />
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-dark table-hover mb-0" style={{ '--bs-table-bg': 'transparent' }}>
                <thead>
                  <tr className="text-secondary border-bottom border-opacity-10">
                    <th className="fw-normal py-3 px-4">Patient Identity</th>
                    <th className="fw-normal py-3 text-center">HR (bpm)</th>
                    <th className="fw-normal py-3 text-center">Temp (°C)</th>
                    <th className="fw-normal py-3 text-center">SpO2 (%)</th>
                    <th className="fw-normal py-3 text-center">BP (mmHg)</th>
                    <th className="fw-normal py-3 text-center">Weight (kg)</th>
                    <th className="fw-normal py-3">Medical Status</th>
                    <th className="fw-normal py-3 text-end px-4">Intervention</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id} className="border-bottom border-opacity-5 align-middle">
                      <td className="py-3 px-4">
                        <div className="d-flex align-items-center gap-3">
                          <div className="rounded-circle bg-secondary bg-opacity-20 d-flex align-items-center justify-content-center" style={{ width: 32, height: 32 }}>
                            <User size={16} className="text-secondary" />
                          </div>
                          <span className="fw-medium">{patient.name}</span>
                        </div>
                      </td>
                      <td className="text-center font-monospace" style={{ color: patient.status === 'Critical' ? '#EF4444' : 'inherit' }}>
                        {patient.hr} {patient.status === 'Critical' && <Activity size={12} className="ms-1 pulse-blink" />}
                      </td>
                      <td className="text-center font-monospace">{patient.temp}</td>
                      <td className="text-center font-monospace">{patient.spo2}</td>
                      <td className="text-center font-monospace">{patient.bp}</td>
                      <td className="text-center font-monospace">{patient.weight}</td>
                      <td>
                        <span className={`badge rounded-pill px-3 ${
                          patient.status === 'Critical' ? 'bg-danger' : 
                          patient.status === 'Warning' ? 'bg-warning text-dark' : 'bg-success'
                        } bg-opacity-10 ${
                          patient.status === 'Critical' ? 'text-danger' : 
                          patient.status === 'Warning' ? 'text-warning' : 'text-success'
                        }`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="text-end px-4">
                        <button className="btn btn-sm btn-outline-primary rounded-pill px-3">
                          Monitor Dashboard
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="p-5 text-center glass-morphism rounded-4 mt-5"
            >
              <div className="mb-4 d-inline-block p-3 rounded-circle bg-primary bg-opacity-10">
                <Activity size={40} className="text-primary" />
              </div>
              <h2 className="fw-bold">{activeTab}</h2>
              <p className="text-secondary fs-5">Detailed clinical analytics and data for {activeTab} are loading...</p>
            </motion.div>
          )}
        </main>
      </div>

      {/* Global CSS for ICU Monitoring Aesthetics */}
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-morphism {
          background: rgba(30, 41, 59, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .shadow-glow {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }
        .shadow-glow-sm {
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.2);
        }
        .shadow-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          transition: all 0.3s ease;
        }
        .pointer { cursor: pointer; }
        .pulse-blink {
          animation: blink 1.5s infinite;
        }
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }
        .fw-mono { font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; }
        .pulse {
          animation: shadow-pulse 2s infinite;
        }
        @keyframes shadow-pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
      `}} />
    </div>
  );
}
