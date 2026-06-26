import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

const Hero = ({ title, subtitle, imageUrl, primaryBtnText, primaryBtnLink, secondaryBtnText, secondaryBtnLink }) => {
  return (
    <div className="hero" style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.8)), url(${imageUrl})` }}>
      <div className="container hero-content animate-fade-in">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        <div className="hero-actions">
          {primaryBtnText && (
            <Link to={primaryBtnLink || '/'} className="btn btn-primary btn-lg">
              {primaryBtnText}
            </Link>
          )}
          {secondaryBtnText && (
            <Link to={secondaryBtnLink || '/'} className="btn btn-outline btn-lg text-white">
              {secondaryBtnText} <ArrowRight size={20} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
