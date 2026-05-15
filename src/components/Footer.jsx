import { Heart, Mail, Phone, Facebook, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'rgba(15, 23, 42, 0.9)', borderTop: '1px solid rgba(59, 130, 246, 0.1)' }} className="py-5">
      <div className="container-fluid">
        <div className="row gy-4 mb-4">
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <Heart size={24} style={{ color: 'var(--primary-accent)' }} />
              <h5 className="mb-0" style={{ color: 'var(--text-primary)' }}>MediCare Plus</h5>
            </div>
            <p style={{ color: 'var(--text-tertiary)' }}>Secure telemedicine solutions for modern healthcare teams and patients worldwide.</p>
          </div>
          <div className="col-lg-4">
            <h6 style={{ color: 'var(--text-primary)' }} className="mb-3">Quick Links</h6>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li className="mb-2"><a href="#" style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}>Home</a></li>
              <li className="mb-2"><a href="#" style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}>Services</a></li>
              <li className="mb-2"><a href="#" style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}>Doctors</a></li>
              <li><a href="#" style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}>Contact</a></li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h6 style={{ color: 'var(--text-primary)' }} className="mb-3">Contact Info</h6>
            <div className="d-flex align-items-center gap-2 mb-2">
              <Phone size={16} style={{ color: 'var(--primary-accent)' }} />
              <span style={{ color: 'var(--text-tertiary)' }}>+237 671 390 055</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Mail size={16} style={{ color: 'var(--primary-accent)' }} />
              <span style={{ color: 'var(--text-tertiary)' }}>support@medicareplus.com</span>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(59, 130, 246, 0.1)' }} className="pt-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0" style={{ color: 'var(--text-tertiary)' }}>© 2026 MediCare Plus. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-end">
              <div className="d-flex gap-3 justify-content-end">
                <a href="#" style={{ color: 'var(--primary-accent)' }}><Facebook size={20} /></a>
                <a href="#" style={{ color: 'var(--primary-accent)' }}><Linkedin size={20} /></a>
                <a href="#" style={{ color: 'var(--primary-accent)' }}><Twitter size={20} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
