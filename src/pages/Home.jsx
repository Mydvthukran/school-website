import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { siteStats, siteGallery, directorMessage, principalMessage } from '../data/siteData';
import { GraduationCap, Users, Trophy, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUpModule from 'react-countup';
const CountUp = CountUpModule.default ? CountUpModule.default : CountUpModule;
import './Home.css';
import heroHomeImage from '../assets/hero-home.jpeg';

const Home = () => {
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentGalleryIndex((prevIndex) => (prevIndex + 1) % siteGallery.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

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
            {siteStats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h3 className="stat-value">
                  <CountUp 
                    end={stat.value} 
                    suffix={stat.suffix} 
                    enableScrollSpy={true} 
                    scrollSpyOnce={true} 
                    duration={2.5} 
                  />
                </h3>
                <p className="stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Director Message Section */}
      <section className="section director-section">
        <div className="container">
          <motion.div 
            className="director-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="director-image-wrapper">
              <img src={directorMessage.imageUrl} alt={directorMessage.name} className="director-image" />
              <div className="director-image-decoration"></div>
            </div>
            <div className="director-content">
              <Quote className="quote-icon" size={32} />
              <h2 className="director-title">Message from the Director</h2>
              <p className="director-text">{directorMessage.message}</p>
              <div className="director-author">
                <h4>{directorMessage.name}</h4>
                <p>{directorMessage.title}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Principal Message Section */}
      <section className="section director-section bg-light">
        <div className="container">
          <motion.div 
            className="director-container" 
            style={{ direction: 'rtl' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="director-image-wrapper" style={{ direction: 'ltr' }}>
              <img src={principalMessage.imageUrl} alt={principalMessage.name} className="director-image" />
              <div className="director-image-decoration"></div>
            </div>
            <div className="director-content" style={{ direction: 'ltr' }}>
              <Quote className="quote-icon" size={32} />
              <h2 className="director-title">Message from the Principal</h2>
              <p className="director-text">{principalMessage.message}</p>
              <div className="director-author">
                <h4>{principalMessage.name}</h4>
                <p>{principalMessage.title}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links / Features */}
      <section className="section features-section">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose Us?</h2>
            <p>We provide a nurturing environment where students thrive academically, socially, and emotionally.</p>
          </div>
          <div className="grid-3">
            <div className="feature-card">
              <div className="feature-icon"><GraduationCap size={24} /></div>
              <h3>Academic Excellence</h3>
              <p>Rigorous curriculum designed to challenge and inspire students to reach their highest potential.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Users size={24} /></div>
              <h3>Expert Faculty</h3>
              <p>Our teachers are industry professionals and passionate educators dedicated to student success.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Trophy size={24} /></div>
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
          <div className="gallery-slider" style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', height: '500px', overflow: 'hidden', borderRadius: '1rem', boxShadow: 'var(--shadow-lg)' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentGalleryIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <img 
                  src={siteGallery[currentGalleryIndex].imageUrl} 
                  alt={siteGallery[currentGalleryIndex].title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
                  <h3 style={{ color: 'white', margin: 0, fontSize: '2rem' }}>{siteGallery[currentGalleryIndex].title}</h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
