import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { eventsApi } from '../services/api';
import { Calendar, MapPin, Clock, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventsApi.getAll();
        setEvents(data);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="events-page">
      <Hero 
        title="Upcoming Events"
        subtitle="Stay engaged with our community and mark your calendars for these exciting events."
        imageUrl="https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />

      <section className="section bg-light" style={{ minHeight: '60vh' }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
              <p>Loading upcoming events...</p>
            </div>
          ) : events.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
              <CalendarDays size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <p>No upcoming events are scheduled at the moment.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
              {events.map((event, index) => (
                <motion.div 
                  key={event.id || index}
                  className="glass hover-lift"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    background: 'var(--card-bg)',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                  }}
                >
                  <div style={{ 
                    background: 'var(--primary)', 
                    color: 'white', 
                    padding: '2rem 1.5rem', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    minWidth: '120px'
                  }}>
                    <Calendar size={32} style={{ marginBottom: '0.5rem' }} />
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center' }}>
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                      {new Date(event.date).getFullYear()}
                    </span>
                  </div>
                  
                  <div style={{ padding: '1.5rem 2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-dark)', fontSize: '1.4rem' }}>{event.title}</h3>
                    <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-main)', fontSize: '0.95rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={16} color="var(--primary)" />
                        {event.time}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MapPin size={16} color="var(--primary)" />
                        {event.location}
                      </div>
                    </div>
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

export default Events;
