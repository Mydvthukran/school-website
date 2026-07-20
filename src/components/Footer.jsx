import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, MessageCircle, Share2 } from 'lucide-react';
import './Footer.css';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Top Row: Logo + Description + Social */}
        <div className="footer-top">
          <Link to="/" className="footer-logo">
            <img src={logo} alt="School Logo" className="footer-logo-img" />
            <span className="logo-text">Saraswati Vidya Sr Sec School</span>
          </Link>
          <p className="footer-desc">
            Empowering students through excellence in education and character development.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Website"><Globe size={18} /></a>
            <a href="#" aria-label="Contact"><MessageCircle size={18} /></a>
            <a href="#" aria-label="Share"><Share2 size={18} /></a>
          </div>
        </div>

        {/* Middle Row: Links side by side */}
        <div className="footer-links-row">
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
        </div>

        {/* Bottom Row: Contact + Map side by side */}
        <div className="footer-contact-row">
          <div className="footer-col">
            <h3>Contact Us</h3>
            <ul className="contact-info">
              <li>
                <MapPin size={16} />
                <span>Village Tankari, District Rewari, Haryana 123412</span>
              </li>
              <li>
                <Phone size={16} />
                <span>9992855644, 9468458204</span>
              </li>
              <li>
                <Mail size={16} />
                <span>svhstankri@gmail.com</span>
              </li>
            </ul>
          </div>
          <div className="footer-map">
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
