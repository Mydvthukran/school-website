import React from 'react';
import Hero from '../components/Hero';
import './Careers.css';

const Careers = () => {
  return (
    <div className="careers-page">
      <Hero 
        title="Careers & Recruitment"
        subtitle="Join our team of dedicated educators and professionals."
        imageUrl="https://images.unsplash.com/photo-1571260899304-4250701120a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />
      
      <section className="section bg-light">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="recruitment-card">
            <div className="recruitment-header">
              <h2>Recruitment Application</h2>
            </div>
            <div className="recruitment-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select className="form-select">
                    <option value="">Select Category</option>
                    <option value="teaching">Teaching Staff</option>
                    <option value="non-teaching">Non-Teaching Staff</option>
                    <option value="admin">Administration</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Sub Category *</label>
                  <select className="form-select">
                    <option value="">Select Sub Category</option>
                    <option value="primary">Primary Section</option>
                    <option value="secondary">Secondary Section</option>
                    <option value="senior-secondary">Senior Secondary</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Profile *</label>
                  <select className="form-select">
                    <option value="">Select Profile</option>
                    <option value="prt">PRT (Primary Teacher)</option>
                    <option value="tgt">TGT (Trained Graduate Teacher)</option>
                    <option value="pgt">PGT (Post Graduate Teacher)</option>
                  </select>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn-next">Next &raquo;</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
