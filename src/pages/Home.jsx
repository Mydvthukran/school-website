import Hero from '../components/Hero';
import { dummyStats, dummyGallery, directorMessage } from '../data/dummy';
import { GraduationCap, Users, Trophy, Quote } from 'lucide-react';
import './Home.css';
import { Link } from 'react-router-dom';
import heroHomeImage from '../assets/hero-home.png';

const Home = () => {
  return (
    <div className="home">
      <Hero 
        title="Welcome to Saraswati Vidya Sr Sec School"
        subtitle="Empowering the next generation of leaders through excellence in education, character development, and global perspective."
        imageUrl={heroHomeImage}
        primaryBtnText="Discover More"
        primaryBtnLink="/about"
        secondaryBtnText="Apply Now"
        secondaryBtnLink="/admissions"
      />

      {/* Stats Section */}
      <section className="section stats-section">
        <div className="container">
          <div className="grid-4">
            {dummyStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Director Message Section */}
      <section className="section director-section">
        <div className="container">
          <div className="director-container">
            <div className="director-image-wrapper">
              <img src={directorMessage.imageUrl} alt={directorMessage.name} className="director-image" />
              <div className="director-image-decoration"></div>
            </div>
            <div className="director-content">
              <Quote className="quote-icon" size={48} />
              <h2 className="director-title">Message from the Director</h2>
              <p className="director-text">{directorMessage.message}</p>
              <div className="director-author">
                <h4>{directorMessage.name}</h4>
                <p>{directorMessage.title}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links / Features */}
      <section className="section features-section bg-light">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose Us?</h2>
            <p>We provide a nurturing environment where students thrive academically, socially, and emotionally.</p>
          </div>
          <div className="grid-3">
            <div className="feature-card">
              <div className="feature-icon"><GraduationCap size={40} /></div>
              <h3>Academic Excellence</h3>
              <p>Rigorous curriculum designed to challenge and inspire students to reach their highest potential.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Users size={40} /></div>
              <h3>Expert Faculty</h3>
              <p>Our teachers are industry professionals and passionate educators dedicated to student success.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Trophy size={40} /></div>
              <h3>Holistic Development</h3>
              <p>Extensive extracurricular programs in sports, arts, and technology to build well-rounded individuals.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Gallery Section */}
      <section className="section bg-light gallery-section">
        <div className="container">
          <div className="section-title">
            <h2>Our Photo Gallery</h2>
            <p>A glimpse into the vibrant life at Saraswati Vidya Sr Sec School.</p>
          </div>
          <div className="gallery-grid">
            {dummyGallery.map((item) => (
              <div key={item.id} className="gallery-item">
                <img src={item.imageUrl} alt={item.title} className="gallery-image" />
                <div className="gallery-overlay">
                  <h4>{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
