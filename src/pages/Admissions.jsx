import Hero from '../components/Hero';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admissions = () => {
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

              <button className="btn btn-secondary" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}>
                Start Online Application
              </button>
              
              <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', opacity: '0.8' }}>
                Have questions? <Link to="/contact" style={{ textDecoration: 'underline', color: 'var(--color-secondary)' }}>Contact our admissions team</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
