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
            <h2>Curriculum Overview</h2>
          </div>
          <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Middle School (Grades 6-8)</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
              Our middle school curriculum focuses on building strong foundational skills in mathematics, sciences, and humanities, while encouraging exploratory learning and critical thinking.
            </p>
            
            <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>High School (Grades 9-12)</h3>
            <p style={{ color: 'var(--color-text-muted)' }}>
              The high school program offers rigorous Advanced Placement (AP) courses, specialized electives, and a comprehensive higher education preparatory track to ensure students are ready for top universities worldwide.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academics;
