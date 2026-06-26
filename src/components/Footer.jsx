import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, MessageCircle, Share2 } from 'lucide-react';
import './Footer.css';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <Link to="/" className="footer-logo">
            <img src={logo} alt="School Logo" style={{ height: '40px', width: 'auto' }} />
            <span className="logo-text">Saraswati Vidya Sr Sec School</span>
          </Link>
          <p className="footer-desc">
            Empowering students to reach their highest potential through excellence in education, character development, and community engagement.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Website"><Globe size={20} /></a>
            <a href="#" aria-label="Contact"><MessageCircle size={20} /></a>
            <a href="#" aria-label="Share"><Share2 size={20} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/academics">Academics</Link></li>
            <li><Link to="/admissions">Admissions</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Programs</h3>
          <ul className="footer-links">
            <li><Link to="/academics">Advanced Sciences</Link></li>
            <li><Link to="/academics">Performing Arts</Link></li>
            <li><Link to="/academics">Global Athletics</Link></li>
            <li><Link to="/academics">Digital Innovation</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contact Us</h3>
          <ul className="contact-info">
            <li>
              <MapPin size={18} />
              <span>123 Education Lane, Learning City, ED 45678</span>
            </li>
            <li>
              <Phone size={18} />
              <span>(555) 123-4567</span>
            </li>
            <li>
              <Mail size={18} />
              <span>info@saraswatividya.edu</span>
            </li>
          </ul>
          <div style={{ marginTop: '1.5rem', borderRadius: '8px', overflow: 'hidden', height: '150px' }}>
            <iframe 
              title="Saraswati Vidya School Location"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              loading="lazy" 
              allowFullScreen 
              referrerPolicy="no-referrer-when-downgrade" 
              src="https://maps.google.com/maps?q=Saraswati+Vidya+School,+Tankri&t=&z=14&ie=UTF8&iwloc=&output=embed">
            </iframe>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Saraswati Vidya Sr Sec School, Tankri. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
