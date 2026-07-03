import React, { useState } from 'react';
import Hero from '../components/Hero';
import { CheckCircle, Upload } from 'lucide-react';
import heroHomeImage from '../assets/hero-home.png';
import './Careers.css';

const Careers = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    subCategory: '',
    profile: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!formData.category || !formData.subCategory || !formData.profile) {
      alert("Please select all options before proceeding.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <div className="careers-page">
      <Hero 
        title="Careers & Recruitment"
        subtitle="Join our team of dedicated educators and professionals."
        imageUrl={heroHomeImage}
      />
      
      <section className="section bg-light">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="recruitment-card">
            <div className="recruitment-header">
              <h2>{step === 3 ? 'Application Received' : 'Recruitment Application'}</h2>
            </div>
            
            <div className="recruitment-body">
              {step === 1 && (
                <div className="form-step animate-fade-in">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Category *</label>
                      <select name="category" value={formData.category} onChange={handleChange} className="form-select">
                        <option value="">Select Category</option>
                        <option value="teaching">Teaching Staff</option>
                        <option value="non-teaching">Non-Teaching Staff</option>
                        <option value="admin">Administration</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Sub Category *</label>
                      <select name="subCategory" value={formData.subCategory} onChange={handleChange} className="form-select">
                        <option value="">Select Sub Category</option>
                        <option value="primary">Primary Section</option>
                        <option value="secondary">Secondary Section</option>
                        <option value="senior-secondary">Senior Secondary</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Profile *</label>
                      <select name="profile" value={formData.profile} onChange={handleChange} className="form-select">
                        <option value="">Select Profile</option>
                        <option value="prt">PRT (Primary Teacher)</option>
                        <option value="tgt">TGT (Trained Graduate Teacher)</option>
                        <option value="pgt">PGT (Post Graduate Teacher)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-actions">
                    <button type="button" className="btn btn-primary" onClick={handleNext}>Next Step &raquo;</button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <form onSubmit={handleSubmit} className="form-step animate-fade-in">
                  <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input type="text" className="form-input" required placeholder="John Doe" />
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input type="email" className="form-input" required placeholder="john@example.com" />
                    </div>
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input type="tel" className="form-input" required placeholder="+1 234 567 8900" />
                    </div>
                    <div className="form-group">
                      <label>Upload Resume *</label>
                      <div className="file-upload">
                        <Upload size={20} />
                        <span>Choose file</span>
                        <input type="file" required accept=".pdf,.doc,.docx" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-actions" style={{ justifyContent: 'space-between' }}>
                    <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>&laquo; Back</button>
                    <button type="submit" className="btn btn-primary">Submit Application</button>
                  </div>
                </form>
              )}

              {step === 3 && (
                <div className="success-step animate-fade-in text-center py-5">
                  <CheckCircle size={64} color="var(--color-primary)" style={{ margin: '0 auto 1.5rem', display: 'block' }} />
                  <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '2rem' }}>Application Submitted!</h3>
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                    Thank you for applying to Saraswati Vidya Sr Sec School. Our recruitment team will review your application for the <strong>{formData.profile.toUpperCase()}</strong> position and get back to you shortly.
                  </p>
                  <button type="button" className="btn btn-primary" onClick={() => { setStep(1); setFormData({ category: '', subCategory: '', profile: '' }); }}>Apply for another role</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
