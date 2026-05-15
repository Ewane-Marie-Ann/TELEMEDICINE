import { useState, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  UserSquare2,
  Stethoscope,
  Building2,
  CalendarCheck,
  FileBarChart,
  Cpu,
  History,
  Settings,
  Search,
  Bell,
  LogOut,
  Menu,
  MoreVertical,
  TrendingUp,
  AlertTriangle,
  Activity,
  Edit3,
  Trash2,
  Plus
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

// Mock Data for Analytics
const growthData = [
  { name: 'Jan', patients: 4000, devices: 2400 },
  { name: 'Feb', patients: 3000, devices: 1398 },
  { name: 'Mar', patients: 2000, devices: 9800 },
  { name: 'Apr', patients: 2780, devices: 3908 },
  { name: 'May', patients: 1890, devices: 4800 },
  { name: 'Jun', patients: 2390, devices: 3800 },
];

function AdminDashboard() {
  const { currentUser, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: Stethoscope, label: 'Doctors' },
    { icon: UserSquare2, label: 'Patients' },
    { icon: Building2, label: 'Departments' },
    { icon: CalendarCheck, label: 'Appointments' },
    { icon: FileBarChart, label: 'Reports' },
    { icon: Cpu, label: 'Devices' },
    { icon: History, label: 'System Logs' },
    { icon: Settings, label: 'Settings' },
  ];

  const stats = [
    { label: 'Total Patients', value: '12,840', trend: '+12.5%', icon: Users, color: '#3B82F6' },
    { label: 'Active Doctors', value: '452', trend: '+4.2%', icon: Stethoscope, color: '#10B981' },
    { label: 'Emergency Cases', value: '18', trend: '-2.4%', icon: AlertTriangle, color: '#EF4444' },
    { label: 'Connected Devices', value: '3,120', trend: '+8.1%', icon: Cpu, color: '#F59E0B' },
  ];

  const recentAlerts = [
    { type: 'emergency', msg: 'Critical: Device #402 offline in ICU Room 4', time: '2 mins ago' },
    { type: 'warning', msg: 'System: Database backup delayed by 1 hour', time: '15 mins ago' },
    { type: 'info', msg: 'Admin: New doctor credentials verified', time: '1 hour ago' },
  ];

  return (
    <div className="d-flex" style={{ background: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      {/* 1. Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="sidebar glass-morphism border-end border-opacity-10 position-sticky top-0 vh-100"
        style={{ 
          background: 'rgba(15, 23, 42, 0.8)', 
          backdropFilter: 'blur(20px)',
          borderColor: 'rgba(59, 130, 246, 0.1)' 
        }}
      >
        <div className="p-4 d-flex align-items-center gap-3">
          <div className="rounded-3 p-2 bg-primary bg-opacity-25 shadow-glow">
            <Activity size={24} className="text-primary" />
          </div>
          {sidebarOpen && <h5 className="mb-0 fw-bold">MediCare Admin</h5>}
        </div>

        <nav className="mt-4 px-3">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`btn w-100 d-flex align-items-center gap-3 mb-2 p-3 rounded-3 transition-all ${
                activeTab === item.label ? 'bg-primary bg-opacity-10 text-primary shadow-glow-sm' : 'text-secondary border-0'
              }`}
              style={{ textAlign: 'left' }}
            >
              <item.icon size={20} className={activeTab === item.label ? 'text-primary' : 'text-secondary'} />
              {sidebarOpen && <span className="fw-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="position-absolute bottom-0 w-100 p-3">
          <button onClick={logout} className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2">
            <LogOut size={18} />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-grow-1 overflow-auto">
        {/* 2. Top Navbar */}
        <header className="px-4 py-3 glass-morphism border-bottom border-opacity-10 sticky-top" style={{ background: 'rgba(15, 23, 42, 0.6)' }}>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="btn btn-link text-primary p-0">
                <Menu size={24} />
              </button>
              <div className="position-relative d-none d-md-block">
                <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" size={18} />
                <input
                  type="text"
                  className="form-control bg-dark border-secondary bg-opacity-50 ps-5 rounded-pill"
                  placeholder="Search systems..."
                  style={{ width: '300px', color: '#fff' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="d-flex align-items-center gap-4">
              <div className="position-relative">
                <Bell size={22} className="text-secondary pointer" />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                  3
                </span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div className="text-end d-none d-sm-block">
                  <div className="fw-bold small">{currentUser?.name}</div>
                  <div className="text-secondary" style={{ fontSize: '0.75rem' }}>System Administrator</div>
                </div>
                <div className="rounded-circle bg-primary bg-opacity-25 p-1 border border-primary border-opacity-50 shadow-glow-sm">
                  <img src={`https://ui-avatars.com/api/?name=${currentUser?.name}&background=random`} alt="Admin" className="rounded-circle" width="32" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4">
          {activeTab === 'Dashboard' ? (
            <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <p className="text-secondary small">Real-time infrastructure and medical node health</p>
            </motion.div>
            <button className="btn btn-primary d-flex align-items-center gap-2 shadow-glow">
              <Plus size={18} /> Generate Report
            </button>
          </div>

          {/* 3. Statistics Cards */}
          <div className="row g-4 mb-5">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="col-xl-3 col-md-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="card glass-morphism border-0 h-100 p-4 shadow-hover" style={{ background: 'rgba(30, 41, 59, 0.4)' }}>
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="p-3 rounded-4 bg-opacity-10" style={{ backgroundColor: stat.color }}>
                      <stat.icon size={24} style={{ color: stat.color }} />
                    </div>
                    <span className={`small fw-bold ${stat.trend.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                      {stat.trend} <TrendingUp size={14} className="ms-1" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="fw-bold mb-1">{stat.value}</h3>
                    <span className="text-secondary small">{stat.label}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="row g-4 mb-5">
            {/* 4. System Analytics Charts */}
            <div className="col-lg-8">
              <div className="card glass-morphism border-0 p-4 h-100" style={{ background: 'rgba(30, 41, 59, 0.4)' }}>
                <h5 className="mb-4">Patient & Device Growth</h5>
                <div style={{ width: '100%', height: 350 }}>
                  <ResponsiveContainer>
                    <AreaChart data={growthData}>
                      <defs>
                        <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ background: '#0F172A', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '12px' }} />
                      <Area type="monotone" dataKey="patients" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorPatients)" />
                      <Area type="monotone" dataKey="devices" stroke="#10B981" strokeWidth={3} fill="transparent" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* 6. Alerts Section */}
            <div className="col-lg-4">
              <div className="card glass-morphism border-0 p-4 h-100" style={{ background: 'rgba(30, 41, 59, 0.4)' }}>
                <h5 className="mb-4">Live System Alerts</h5>
                <div className="d-flex flex-column gap-3">
                  {recentAlerts.map((alert, i) => (
                    <div key={i} className="p-3 rounded-3 d-flex gap-3 align-items-start border border-opacity-10" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.1)' }}>
                      <div className={`p-2 rounded-circle ${alert.type === 'emergency' ? 'bg-danger' : 'bg-warning'} bg-opacity-20`}>
                        <AlertTriangle size={16} className={alert.type === 'emergency' ? 'text-danger' : 'text-warning'} />
                      </div>
                      <div>
                        <div className="small fw-medium">{alert.msg}</div>
                        <div className="text-secondary mt-1" style={{ fontSize: '0.7rem' }}>{alert.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn btn-sm btn-link text-primary mt-auto text-decoration-none">View All Notifications</button>
              </div>
            </div>
          </div>

          {/* 5. Management Table */}
          <div className="card glass-morphism border-0 p-4" style={{ background: 'rgba(30, 41, 59, 0.4)' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0">Medical Staff Management</h5>
              <div className="d-flex gap-2">
                <select className="form-select form-select-sm bg-dark border-secondary text-white border-opacity-25" style={{ width: '150px' }}>
                  <option>All Departments</option>
                  <option>Cardiology</option>
                  <option>Neurology</option>
                </select>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-dark table-hover mb-0" style={{ '--bs-table-bg': 'transparent' }}>
                <thead>
                  <tr className="text-secondary border-bottom border-opacity-10">
                    <th className="fw-normal py-3 px-4">Doctor</th>
                    <th className="fw-normal py-3">Specialty</th>
                    <th className="fw-normal py-3">Patients</th>
                    <th className="fw-normal py-3">Status</th>
                    <th className="fw-normal py-3 text-end px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Dr. Sarah Wilson', dept: 'Cardiology', patients: 12, status: 'Active' },
                    { name: 'Dr. James Miller', dept: 'Pediatrics', patients: 8, status: 'On Leave' },
                    { name: 'Dr. Elena Rossi', dept: 'Neurology', patients: 15, status: 'Active' },
                  ].map((doc, i) => (
                    <tr key={i} className="border-bottom border-opacity-5 align-middle">
                      <td className="py-3 px-4">
                        <div className="d-flex align-items-center gap-3">
                          <div className="rounded-circle bg-secondary bg-opacity-25" style={{ width: 32, height: 32 }}></div>
                          <span className="fw-medium">{doc.name}</span>
                        </div>
                      </td>
                      <td className="text-secondary">{doc.dept}</td>
                      <td>{doc.patients}</td>
                      <td>
                        <span className={`badge rounded-pill ${doc.status === 'Active' ? 'bg-success' : 'bg-warning'} bg-opacity-10 ${doc.status === 'Active' ? 'text-success' : 'text-warning'} px-3`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="text-end px-4">
                        <div className="d-flex justify-content-end gap-2">
                          <button className="btn btn-sm btn-link text-secondary p-0"><Edit3 size={16} /></button>
                          <button className="btn btn-sm btn-link text-danger p-0"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 7. Activity Logs */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="card glass-morphism border-0 p-4" style={{ background: 'rgba(30, 41, 59, 0.4)' }}>
                <div className="d-flex align-items-center gap-2 mb-4">
                  <History size={20} className="text-primary" />
                  <h5 className="mb-0">Recent Activity Logs</h5>
                </div>
                <div className="timeline">
                  {[
                    { user: 'Admin', action: 'Authorized new device deployment', time: '10:45 AM' },
                    { user: 'System', action: 'Security patch v2.4.1 applied', time: '09:20 AM' },
                    { user: 'Admin', action: 'Reset password for Dr. Miller', time: 'Yesterday' }
                  ].map((log, i) => (
                    <div key={i} className="d-flex gap-4 mb-3 position-relative">
                      <div className="text-secondary small" style={{ width: '80px' }}>{log.time}</div>
                      <div className="flex-grow-1 border-start border-primary border-opacity-25 ps-4 pb-3">
                        <div className="fw-medium">{log.action}</div>
                        <div className="text-secondary small">Performed by: {log.user}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="p-5 text-center glass-morphism rounded-4 mt-5"
            >
              <Activity size={48} className="text-primary mb-3 mx-auto" />
              <h3 className="fw-bold">{activeTab}</h3>
              <p className="text-secondary">This management module for {activeTab.toLowerCase()} is currently being initialized.</p>
            </motion.div>
          )}
        </main>
      </div>

      {/* Global CSS for Glow Effects */}
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
        .timeline .border-start::before {
          content: '';
          position: absolute;
          left: -4px;
          top: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--bs-primary);
          box-shadow: 0 0 8px var(--bs-primary);
        }
      `}} />
    </div>
  );
}
export default AdminDashboard;
