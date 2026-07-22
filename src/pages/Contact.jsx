import { useState } from 'react';
import Hero from '../components/Hero';
import { MapPin, Phone, Mail, Clock, CheckCircle2, AlertCircle, Loader } from 'lucide-react';
import { submitContact } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id || e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      await submitContact(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

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
                    <p style={{ color: 'var(--color-text-muted)' }}>Village Tankari, District Rewari<br/>Haryana, 123412</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: 'rgba(30, 58, 138, 0.1)', color: 'var(--color-primary)', padding: '1rem', borderRadius: '50%' }}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '0.5rem' }}>Phone</h3>
                    <p style={{ color: 'var(--color-text-muted)' }}>9992855644<br/>9468458204</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: 'rgba(30, 58, 138, 0.1)', color: 'var(--color-primary)', padding: '1rem', borderRadius: '50%' }}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '0.5rem' }}>Email</h3>
                    <p style={{ color: 'var(--color-text-muted)' }}>svhstankri@gmail.com</p>
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

              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <CheckCircle2 size={56} color="var(--color-secondary)" style={{ margin: '0 auto 1rem' }} />
                  <h4 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Message Sent!</h4>
                  <p style={{ color: 'var(--color-text-muted)' }}>Thank you for reaching out. We'll get back to you within 1-2 business days.</p>
                  <button className="btn btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => setStatus('idle')}>Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="name" style={{ fontWeight: '500' }}>Full Name</label>
                    <input type="text" id="name" required value={formData.name} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: 'var(--color-surface-light)', color: 'var(--color-text-main)' }} placeholder="John Doe" />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="email" style={{ fontWeight: '500' }}>Email Address</label>
                    <input type="email" id="email" required value={formData.email} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: 'var(--color-surface-light)', color: 'var(--color-text-main)' }} placeholder="john@example.com" />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="subject" style={{ fontWeight: '500' }}>Subject</label>
                    <select id="subject" name="subject" required value={formData.subject} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: 'var(--color-surface-light)', color: 'var(--color-text-main)' }}>
                      <option value="">Select a subject...</option>
                      <option value="admissions">Admissions Inquiry</option>
                      <option value="general">General Question</option>
                      <option value="support">Technical Support</option>
                    </select>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="message" style={{ fontWeight: '500' }}>Message</label>
                    <textarea id="message" rows="5" required value={formData.message} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', resize: 'vertical', backgroundColor: 'var(--color-surface-light)', color: 'var(--color-text-main)' }} placeholder="How can we help you?" />
                  </div>

                  {status === 'error' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dc2626', fontSize: '0.9rem' }}>
                      <AlertCircle size={16} />
                      <span>{errorMsg}</span>
                    </div>
                  )}
                  
                  <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }} disabled={status === 'loading'}>
                    {status === 'loading' ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                        <Loader size={16} className="spin" /> Sending...
                      </span>
                    ) : 'Send Message'}
                  </button>
                </form>
              )}
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
