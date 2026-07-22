import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { staffApi } from '../services/api';
import { Users, Mail, Phone, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await staffApi.getAll();
        setStaff(data);
      } catch (err) {
        console.error('Failed to fetch staff:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

  return (
    <div className="staff-page">
      <Hero 
        title="Our Faculty & Staff"
        subtitle="Meet the dedicated professionals who inspire, challenge, and guide our students every day."
        imageUrl="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />

      <section className="section bg-light" style={{ minHeight: '60vh' }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
              <p>Loading faculty profiles...</p>
            </div>
          ) : staff.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
              <Users size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <p>No staff profiles have been added yet.</p>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '2.5rem' 
            }}>
              {staff.map((member, index) => (
                <motion.div 
                  key={member.id || index}
                  className="glass hover-lift"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    background: 'var(--card-bg)',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ height: '280px', width: '100%', overflow: 'hidden', backgroundColor: 'var(--bg-alt)', position: 'relative' }}>
                    {member.imageUrl ? (
                      <img 
                        src={member.imageUrl} 
                        alt={member.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        loading="lazy"
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                        <UserIcon size={64} />
                      </div>
                    )}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                      padding: '1.5rem 1rem 0.5rem',
                    }}>
                      <h3 style={{ margin: 0, color: 'white', fontSize: '1.4rem' }}>{member.name}</h3>
                      <p style={{ margin: 0, color: 'var(--primary-light)', fontWeight: 500 }}>{member.role}</p>
                    </div>
                  </div>
                  
                  <div style={{ padding: '1.5rem', flex: 1 }}>
                    <p style={{ color: 'var(--text-main)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Staff;
