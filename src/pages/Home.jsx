import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { statsApi, messagesApi, galleryApi } from '../services/api';
import { GraduationCap, Users, Trophy, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUpModule from 'react-countup';
const CountUp = CountUpModule.default ? CountUpModule.default : CountUpModule;
import './Home.css';
import heroHomeImage from '../assets/hero-home.jpeg';

const Home = () => {
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  const [stats, setStats] = useState([]);
  const [messages, setMessages] = useState({ director: {}, principal: {} });
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, messagesData, galleryData] = await Promise.all([
          statsApi.getAll(),
          messagesApi.getAll(),
          galleryApi.getAll()
        ]);
        setStats(statsData);
        setMessages(messagesData);
        setGallery(galleryData);
      } catch (err) {
        console.error('Failed to fetch home data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (gallery.length === 0) return;
    const timer = setInterval(() => {
      setCurrentGalleryIndex((prev) => (prev + 1) % gallery.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [gallery.length]);

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

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
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.id || index} 
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h3 className="stat-value">
                  <CountUp 
                    end={stat.value} 
                    suffix={stat.suffix || ''} 
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
      {messages.director && (
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
                {messages.director.imageUrl && (
                  <img src={messages.director.imageUrl} alt={messages.director.name} className="director-image" />
                )}
                <div className="director-image-decoration"></div>
              </div>
              <div className="director-content">
                <Quote className="quote-icon" size={32} />
                <h2 className="director-title">Message from the Director</h2>
                <p className="director-text">{messages.director.message}</p>
                <div className="director-author">
                  <h4>{messages.director.name}</h4>
                  <p>{messages.director.title}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Principal Message Section */}
      {messages.principal && (
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
                {messages.principal.imageUrl && (
                  <img src={messages.principal.imageUrl} alt={messages.principal.name} className="director-image" />
                )}
                <div className="director-image-decoration"></div>
              </div>
              <div className="director-content" style={{ direction: 'ltr' }}>
                <Quote className="quote-icon" size={32} />
                <h2 className="director-title">Message from the Principal</h2>
                <p className="director-text">{messages.principal.message}</p>
                <div className="director-author">
                  <h4>{messages.principal.name}</h4>
                  <p>{messages.principal.title}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

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
          {gallery.length > 0 ? (
            <div className="gallery-slider-modern">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentGalleryIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="slider-item"
                >
                  <div 
                    className="slider-bg-blur"
                    style={{ backgroundImage: `url(${gallery[currentGalleryIndex]?.imageUrl})` }}
                  ></div>
                  <img 
                    src={gallery[currentGalleryIndex]?.imageUrl} 
                    alt={gallery[currentGalleryIndex]?.title} 
                    className="slider-image-contain"
                  />
                  <div className="slider-overlay">
                    <h3>{gallery[currentGalleryIndex]?.title}</h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#64748b' }}>No photos in gallery.</div>
          )}
          
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="/gallery" className="btn btn-primary btn-lg">View Full Photo Gallery</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
