import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  BarChart3,
  Lock,
  Users,
  Smartphone,
  ArrowRight,
  Heart,
  TrendingUp,
} from 'lucide-react';
import TopNavbar from '../components/TopNavbar.jsx';
import Footer from '../components/Footer.jsx';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  whileInView: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function LandingPage() {
  const features = [
    {
      icon: Activity,
      title: 'Real-Time Monitoring',
      description: 'Monitor patient vitals continuously with live updates every second.',
    },
    {
      icon: AlertCircle,
      title: 'Emergency Alerts',
      description: 'Instant critical alerts for abnormal vital signs with priority notifications.',
    },
    {
      icon: Users,
      title: 'Multi-Role Dashboard',
      description: 'Dedicated dashboards for doctors, patients, and administrators.',
    },
    {
      icon: Lock,
      title: 'Secure Records',
      description: 'HIPAA-compliant encryption for all patient data and communications.',
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Advanced health analytics with predictive insights and trends.',
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Fully responsive design for seamless mobile and tablet experience.',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Patients Monitored', icon: Users },
    { number: '500+', label: 'Doctors Available', icon: Heart },
    { number: '99.9%', label: 'System Uptime', icon: TrendingUp },
    { number: '24/7', label: 'Emergency Support', icon: AlertCircle },
  ];

  return (
    <div style={{ background: 'var(--bg-primary)' }}>
      <TopNavbar />

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container">
          <motion.div
            className="row align-items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div className="col-lg-6" {...fadeInUp}>
              <div className="mb-3">
                <span className="badge badge-info">Smart Telemedicine</span>
              </div>
              <h1 className="display-4 fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                Smart Telemedicine
                <span className="text-gradient"> Monitoring System</span>
              </h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }} className="mb-4">
                Monitor patient vitals in real-time, receive instant alerts for critical conditions, and manage your healthcare workflow all in one powerful platform.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/login" className="btn btn-primary btn-lg">
                  Get Started <ArrowRight size={20} className="ms-2" />
                </Link>
                <button className="btn btn-outline-primary btn-lg">
                  Learn More
                </button>
              </div>
            </motion.div>

            <motion.div
              className="col-lg-6 mt-5 mt-lg-0"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div
                className="glass-morphism p-4 rounded-4"
                style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '2px solid rgba(59, 130, 246, 0.3)',
                }}
              >
                <div className="text-center">
                  <Activity size={80} style={{ color: 'var(--primary-accent)' }} className="mb-3" />
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Real-time telemetry, secure patient records, emergency alerts, and streamlined clinical workflows in one unified platform.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-5" style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.5))' }}>
        <div className="container py-5">
          <motion.div className="text-center mb-5" {...fadeInUp}>
            <h2 className="display-5 fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              Powerful Features
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }} className="mx-auto" style={{ maxWidth: '500px' }}>
              Everything you need for modern healthcare management
            </p>
          </motion.div>

          <motion.div
            className="row g-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div key={idx} className="col-md-6 col-lg-4" variants={fadeInUp}>
                  <div className="feature-card">
                    <div className="feature-icon">
                      <Icon size={28} />
                    </div>
                    <h5 style={{ color: 'var(--text-primary)' }} className="mb-3">
                      {feature.title}
                    </h5>
                    <p style={{ color: 'var(--text-tertiary)' }}>{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-5" style={{ background: 'rgba(15, 23, 42, 1)' }}>
        <div className="container py-5">
          <motion.div className="row g-4" variants={staggerContainer} initial="initial" whileInView="whileInView">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div key={idx} className="col-md-6 col-lg-3" variants={fadeInUp}>
                  <div
                    className="text-center p-4 rounded-4"
                    style={{
                      background: 'rgba(30, 41, 59, 0.6)',
                      border: '2px solid rgba(59, 130, 246, 0.2)',
                    }}
                  >
                    <Icon size={40} style={{ color: 'var(--primary-accent)' }} className="mb-3 mx-auto" />
                    <h3 className="display-6 fw-bold mb-2" style={{ color: 'var(--primary-accent)' }}>
                      {stat.number}
                    </h3>
                    <p style={{ color: 'var(--text-tertiary)' }}>{stat.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5" style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 1), rgba(30, 41, 59, 0.5))' }}>
        <div className="container py-5">
          <motion.div className="row align-items-center g-5" {...fadeInUp}>
            <div className="col-lg-6">
              <h2 className="display-5 fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                How It Works
              </h2>
              <div className="space-y-4">
                {[
                  { title: 'Connect Devices', desc: 'Pair your medical devices securely' },
                  { title: 'Monitor Vitals', desc: 'Real-time tracking of patient health metrics' },
                  { title: 'Get Insights', desc: 'AI-powered analysis and recommendations' },
                  { title: 'Take Action', desc: 'Make informed decisions with actionable data' },
                ].map((item, idx) => (
                  <div key={idx} className="d-flex gap-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: '50px',
                        height: '50px',
                        background: 'rgba(59, 130, 246, 0.2)',
                        color: 'var(--primary-accent)',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                      }}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <h5 style={{ color: 'var(--text-primary)' }}>{item.title}</h5>
                      <p style={{ color: 'var(--text-tertiary)' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="p-5 rounded-4"
                style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '2px solid rgba(59, 130, 246, 0.3)',
                  minHeight: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div className="text-center">
                  <BarChart3 size={80} style={{ color: 'var(--primary-accent)' }} className="mb-3" />
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Advanced analytics dashboard showing all your patient data at a glance
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-5" style={{ background: 'rgba(30, 41, 59, 0.6)' }}>
        <div className="container py-5">
          <motion.div className="text-center" {...fadeInUp}>
            <h2 className="display-5 fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Ready to Transform Your Healthcare?
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }} className="mb-4">
              Join thousands of healthcare providers using MediCare Plus
            </p>
            <Link to="/login" className="btn btn-primary btn-lg">
              Start Your Free Trial <ArrowRight size={20} className="ms-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
