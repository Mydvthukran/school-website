import Hero from '../components/Hero';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="contact-page">
      <Hero 
        title="Contact Us"
        subtitle="We're here to answer your questions and help you navigate your journey with Saraswati Vidya Sr Sec School."
        imageUrl="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: '2rem' }}>
            
            {/* Contact Information */}
            <div>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Get In Touch</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
                Whether you're a prospective parent, a current student, or a proud alumni, we'd love to hear from you.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: 'rgba(30, 58, 138, 0.1)', color: 'var(--color-primary)', padding: '1rem', borderRadius: '50%' }}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '0.5rem' }}>Our Campus</h3>
                    <p style={{ color: 'var(--color-text-muted)' }}>123 Education Lane<br/>Learning City, ED 45678</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: 'rgba(30, 58, 138, 0.1)', color: 'var(--color-primary)', padding: '1rem', borderRadius: '50%' }}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '0.5rem' }}>Phone</h3>
                    <p style={{ color: 'var(--color-text-muted)' }}>(555) 123-4567<br/>(555) 987-6543 (Admissions)</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: 'rgba(30, 58, 138, 0.1)', color: 'var(--color-primary)', padding: '1rem', borderRadius: '50%' }}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '0.5rem' }}>Email</h3>
                    <p style={{ color: 'var(--color-text-muted)' }}>info@saraswatividya.edu<br/>admissions@saraswatividya.edu</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: 'rgba(30, 58, 138, 0.1)', color: 'var(--color-primary)', padding: '1rem', borderRadius: '50%' }}>
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '0.5rem' }}>Office Hours</h3>
                    <p style={{ color: 'var(--color-text-muted)' }}>Monday - Friday: 8:00 AM - 4:00 PM<br/>Saturday & Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{ backgroundColor: 'var(--color-bg-light)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Send a Message</h3>
              <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="name" style={{ fontWeight: '500' }}>Full Name</label>
                  <input type="text" id="name" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: 'var(--color-surface-light)', color: 'var(--color-text-main)' }} placeholder="John Doe" />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="email" style={{ fontWeight: '500' }}>Email Address</label>
                  <input type="email" id="email" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: 'var(--color-surface-light)', color: 'var(--color-text-main)' }} placeholder="john@example.com" />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="subject" style={{ fontWeight: '500' }}>Subject</label>
                  <select id="subject" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: 'var(--color-surface-light)', color: 'var(--color-text-main)' }}>
                    <option value="">Select a subject...</option>
                    <option value="admissions">Admissions Inquiry</option>
                    <option value="general">General Question</option>
                    <option value="support">Technical Support</option>
                  </select>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="message" style={{ fontWeight: '500' }}>Message</label>
                  <textarea id="message" rows="5" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', resize: 'vertical', backgroundColor: 'var(--color-surface-light)', color: 'var(--color-text-main)' }} placeholder="How can we help you?"></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section style={{ width: '100%', height: '300px', backgroundColor: 'var(--color-surface-light)' }}>
        <iframe 
          title="School Location Map"
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          loading="lazy" 
          allowFullScreen 
          referrerPolicy="no-referrer-when-downgrade" 
          src="https://maps.google.com/maps?q=Saraswati+Vidya+School,+Tankri&t=&z=15&ie=UTF8&iwloc=&output=embed">
        </iframe>
      </section>
    </div>
  );
};

export default Contact;
