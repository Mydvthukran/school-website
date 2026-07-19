import Hero from '../components/Hero';
import { Target, Eye, Shield, Heart, Lightbulb, Globe } from 'lucide-react';
import { siteFacilities } from '../data/siteData';
import './Home.css'; // Importing for feature-card styles

const About = () => {
  return (
    <div className="about-page">
      <Hero 
        title="About Saraswati Vidya Sr Sec School"
        subtitle="A legacy of excellence, character, and innovation."
        imageUrl="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />

      {/* Vision & Mission Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="grid-2" style={{ gap: '2rem' }}>
            <div style={{ background: 'var(--color-surface-light)', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', textAlign: 'center', transition: 'var(--transition)' }} className="hover-lift">
              <div style={{ width: '80px', height: '80px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Target size={40} />
              </div>
              <h2 style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '2rem' }}>Our Mission</h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                To ignite a passion for lifelong learning and empower students with the knowledge, skills, and character necessary to thrive in a dynamic, global society. We are committed to nurturing intellectual curiosity, moral integrity, and social responsibility in every student who walks through our doors.
              </p>
            </div>
            
            <div style={{ background: 'var(--color-primary)', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', textAlign: 'center', color: 'white', transition: 'var(--transition)' }} className="hover-lift">
              <div style={{ width: '80px', height: '80px', background: 'rgba(255, 255, 255, 0.1)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Eye size={40} />
              </div>
              <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: '2rem' }}>Our Vision</h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                To be a premier institution recognized globally for excellence in education, pioneering innovative learning methodologies, and producing compassionate leaders who will make a meaningful impact on the world. We envision a community where every individual is inspired to achieve their highest potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Our Core Values</h2>
            <p>The fundamental beliefs that guide our actions and shape our school's culture every day.</p>
          </div>
          <div className="grid-4">
            {[
              { icon: <Shield size={24} />, title: "Integrity", desc: "Upholding the highest ethical standards, honesty, and transparency in all we do." },
              { icon: <Heart size={24} />, title: "Compassion", desc: "Fostering deep empathy and unwavering kindness towards all community members." },
              { icon: <Lightbulb size={24} />, title: "Innovation", desc: "Encouraging creative thinking and bravely embracing new ideas and methodologies." },
              { icon: <Globe size={24} />, title: "Diversity", desc: "Celebrating our unique differences and proactively promoting an inclusive environment." }
            ].map((val, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon">
                  {val.icon}
                </div>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-title">
            <h2>Our Facilities</h2>
            <p>State-of-the-art infrastructure designed to foster a conducive learning environment.</p>
          </div>
          <div className="grid-3">
            {siteFacilities.map((facility) => (
              <div key={facility.id} className="gallery-item" style={{ borderRadius: '1rem', overflow: 'hidden', position: 'relative' }}>
                <img src={facility.imageUrl} alt={facility.title} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', color: 'white' }}>
                  <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{facility.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
