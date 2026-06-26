import Hero from '../components/Hero';
import Card from '../components/Card';
import { dummyStaff } from '../data/dummy';

const About = () => {
  return (
    <div className="about-page">
      <Hero 
        title="About Saraswati Vidya Sr Sec School"
        subtitle="A legacy of excellence, character, and innovation."
        imageUrl="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />

      <section className="section bg-light">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Our History</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                Founded in 1985, Saraswati Vidya Sr Sec School has grown from a small community school into one of the region's premier educational institutions. Our journey has always been guided by a commitment to academic rigor and the holistic development of our students.
              </p>
              <p style={{ color: 'var(--color-text-muted)' }}>
                Today, we serve over 1,200 students across our expansive campus, providing state-of-the-art facilities, innovative teaching methodologies, and a diverse community that prepares students for the global stage.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="School Campus" 
                className="img-responsive"
                style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Our Leadership Team</h2>
            <p>Meet the dedicated professionals guiding our vision and empowering our students every day.</p>
          </div>
          <div className="grid-3">
            {dummyStaff.map((staff) => (
              <Card 
                key={staff.id}
                title={staff.name}
                role={staff.role}
                bio={staff.bio}
                imageUrl={staff.imageUrl}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
