import React from 'react';
import Hero from '../components/Hero';
import { siteGallery } from '../data/siteData';

const Gallery = () => {
  return (
    <div className="gallery-page">
      <Hero 
        title="Our Complete Gallery"
        subtitle="Explore all the moments and memories at Saraswati Vidya Sr Sec School."
        imageUrl="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />
      
      <section className="section bg-light">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
            {siteGallery.map((item) => (
              <div key={item.id} className="glass" style={{ borderRadius: '1rem', overflow: 'hidden', padding: '1rem' }}>
                <div style={{ width: '100%', height: '250px', backgroundColor: '#000', borderRadius: '0.5rem', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                  />
                </div>
                <h3 style={{ marginTop: '1rem', textAlign: 'center', fontSize: '1.2rem' }}>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
