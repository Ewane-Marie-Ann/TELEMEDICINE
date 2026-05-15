import { Link } from 'react-router-dom';
import { Heart, Menu } from 'lucide-react';
import { useState } from 'react';

export default function TopNavbar() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <Heart size={28} />
          <span>MediCare Plus</span>
        </Link>
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          onClick={() => setNavOpen(!navOpen)}
          style={{ color: 'var(--primary-accent)' }}
        >
          <Menu size={24} />
        </button>
        <div className={`collapse navbar-collapse ${navOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto gap-3">
            <li className="nav-item">
              <a className="nav-link active" href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#services">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#doctors">Doctors</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
            </li>
            <li className="nav-item">
              <Link className="btn btn-primary btn-sm px-3" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
