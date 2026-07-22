import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { galleryApi } from '../services/api';
import { ZoomIn, X, Loader, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await galleryApi.getAll();
        setGallery(data);
      } catch (err) {
        console.error('Failed to fetch gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="gallery-page">
      <Hero 
        title="Our Complete Gallery"
        subtitle="Explore all the moments and memories at Saraswati Vidya Sr Sec School."
        imageUrl="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />
      
      <section className="section bg-light" style={{ minHeight: '60vh' }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
              <Loader size={32} className="spin" style={{ margin: '0 auto 1rem' }} />
              <p>Loading photo gallery...</p>
            </div>
          ) : gallery.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
              <ImageIcon size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <p>No photos have been uploaded to the gallery yet.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
              {gallery.map((item, index) => (
                <motion.div 
                  key={item.id || index}
                  className="glass hover-lift"
                  style={{ borderRadius: '1rem', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedImage(item)}
                >
                  <div style={{ width: '100%', height: '250px', backgroundColor: '#0f172a' }}>
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      loading="lazy"
                    />
                  </div>
                  <div style={{ padding: '1rem', textAlign: 'center', background: 'var(--card-bg)' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-dark)' }}>{item.title}</h3>
                  </div>
                  <div className="gallery-hover-overlay" style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '250px',
                    background: 'rgba(59, 130, 246, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: 0, transition: 'opacity 0.2s ease'
                  }}>
                    <ZoomIn size={48} color="white" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.95)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              zIndex: 9999, padding: '2rem'
            }}
            onClick={() => setSelectedImage(null)}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer', zIndex: 10000 }}
            >
              <X size={32} />
            </button>
            
            <motion.img 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage.imageUrl} 
              alt={selectedImage.title} 
              style={{ maxWidth: '90%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} 
              onClick={(e) => e.stopPropagation()}
            />
            <motion.h3 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              style={{ color: 'white', marginTop: '1.5rem', fontSize: '1.5rem', fontWeight: 500 }}
            >
              {selectedImage.title}
            </motion.h3>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
