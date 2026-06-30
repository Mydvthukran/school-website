import Hero from '../components/Hero';
import { dummyPrograms } from '../data/dummy';
import { FlaskConical, Music, Trophy, Monitor } from 'lucide-react';

const iconMap = {
  FlaskConical: <FlaskConical size={48} />,
  Music: <Music size={48} />,
  Trophy: <Trophy size={48} />,
  Monitor: <Monitor size={48} />
};

const Academics = () => {
  return (
    <div className="academics-page">
      <Hero 
        title="Academic Excellence"
        subtitle="Challenging minds, fostering creativity, and preparing for the future."
        imageUrl="https://images.unsplash.com/photo-1427504494785-319ce5156695?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Our Core Programs</h2>
            <p>We offer a diverse range of programs tailored to unlock every student's potential.</p>
          </div>
          
          <div className="grid-2">
            {dummyPrograms.map((program) => (
              <div key={program.id} style={{ 
                backgroundColor: 'white', 
                padding: '1.5rem', 
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'flex-start',
                transition: 'var(--transition)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              >
                <div style={{ color: 'var(--color-primary)', flexShrink: 0 }}>
                  {iconMap[program.icon]}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>{program.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>{program.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <div className="section-title">
            <h2>Our Learning Approach</h2>
            <p>We believe in a dynamic, student-centered approach to education that goes beyond traditional textbooks.</p>
          </div>
          <div className="grid-3">
            {[
              { 
                title: "Project-Based Learning", 
                desc: "Students tackle real-world problems, fostering critical thinking, collaboration, and practical application of knowledge." 
              },
              { 
                title: "Personalized Support", 
                desc: "Small class sizes allow our educators to tailor instruction to meet the unique needs and learning styles of every student." 
              },
              { 
                title: "Technology Integration", 
                desc: "Seamlessly incorporating the latest digital tools to enhance learning experiences and prepare students for a tech-driven future." 
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                style={{ 
                  backgroundColor: 'white', 
                  padding: '2.5rem 2rem', 
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'var(--transition)',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <div style={{ width: '50px', height: '4px', backgroundColor: 'var(--color-primary)', marginBottom: '1.5rem', borderRadius: '2px' }}></div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-text-main)' }}>{item.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', fontSize: '0.95rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academics;
