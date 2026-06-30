import { useState } from 'react';
import Hero from '../components/Hero';
import { CheckCircle2, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admissions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
    }, 3000);
  };

  const steps = [
    "Complete the online application form",
    "Submit past academic transcripts",
    "Schedule and attend an interview",
    "Receive admission decision"
  ];

  return (
    <div className="admissions-page">
      <Hero 
        title="Join Our Community"
        subtitle="Take the first step towards a brilliant future. We're excited to welcome you to Saraswati Vidya Sr Sec School, Tankri."
        imageUrl="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: '4rem' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Application Process</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                We seek students who are curious, motivated, and eager to contribute to our vibrant school community. Our admissions process is designed to help us get to know you better.
              </p>
              
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {steps.map((step, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'var(--color-bg-light)', padding: '1.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-text-main)', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                      {index + 1}
                    </div>
                    <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-secondary)' }}>Apply Now</h3>
              <p style={{ marginBottom: '2rem', opacity: '0.9' }}>Applications for the Fall 2026 academic year are now open. Secure your spot today.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={20} color="var(--color-secondary)" />
                  <span>Merit-based scholarships available</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={20} color="var(--color-secondary)" />
                  <span>Financial aid programs</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={20} color="var(--color-secondary)" />
                  <span>Dedicated admissions counselor</span>
                </div>
              </div>

              <button onClick={() => setIsModalOpen(true)} className="btn btn-secondary" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}>
                Start Online Application
              </button>
              
              <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', opacity: '0.8' }}>
                Have questions? <Link to="/contact" style={{ textDecoration: 'underline', color: 'var(--color-secondary)' }}>Contact our admissions team</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, padding: '1rem'
        }}>
          <div style={{
            backgroundColor: 'white', padding: '2.5rem', borderRadius: 'var(--radius-lg)',
            width: '100%', maxWidth: '600px', position: 'relative', boxShadow: 'var(--shadow-lg)',
            color: 'var(--color-text-main)'
          }}>
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
            >
              <X size={24} />
            </button>
            
            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <CheckCircle2 size={64} color="var(--color-secondary)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}>Application Received!</h3>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '1rem' }}>Thank you for your interest. Our admissions team will contact you shortly with the next steps.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '0.5rem', marginTop: 0 }}>Online Application Form</h3>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Please fill out the details below to start your application process.</p>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--color-text-main)' }}>Student's Name *</label>
                      <input type="text" required style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }} placeholder="Student Name" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--color-text-main)' }}>Parent/Guardian Name *</label>
                      <input type="text" required style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }} placeholder="Parent Name" />
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--color-text-main)' }}>Email Address *</label>
                    <input type="email" required style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }} placeholder="example@email.com" />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--color-text-main)' }}>Phone Number *</label>
                      <input type="tel" required style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }} placeholder="+91 98765 43210" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--color-text-main)' }}>Applying for Grade *</label>
                      <select required style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: 'white' }}>
                        <option value="">Select Grade</option>
                        <option value="6">Grade 6</option>
                        <option value="7">Grade 7</option>
                        <option value="8">Grade 8</option>
                        <option value="9">Grade 9</option>
                        <option value="10">Grade 10</option>
                        <option value="11">Grade 11</option>
                        <option value="12">Grade 12</option>
                      </select>
                    </div>
                  </div>
                  
                  <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%', padding: '1rem', fontSize: '1rem' }}>
                    Submit Application
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admissions;
