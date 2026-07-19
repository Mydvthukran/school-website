import React, { useState } from 'react';
import Hero from '../components/Hero';
import { Briefcase, Heart, BookOpen, CheckCircle, Upload } from 'lucide-react';
import heroHomeImage from '../assets/hero-home.jpeg';
import './Careers.css';

const categoryData = {
  teaching: {
    name: 'Teaching',
    sections: {
      pre_primary: { name: 'Pre-Primary', roles: ['Mother Teacher', 'Co-Teacher'] },
      primary: { name: 'Primary Section', roles: ['PRT - English', 'PRT - Math', 'PRT - Science', 'PRT - Hindi'] },
      secondary: { name: 'Secondary Section', roles: ['TGT - English', 'TGT - Math', 'TGT - Science', 'TGT - Social Studies'] },
      senior: { name: 'Senior Secondary', roles: ['PGT - Physics', 'PGT - Chemistry', 'PGT - Math', 'PGT - Biology'] },
    }
  },
  non_teaching: {
    name: 'Non-Teaching',
    sections: {
      transport: { name: 'Transport', roles: ['Driver', 'Conductor', 'Transport Incharge'] },
      maintenance: { name: 'Maintenance', roles: ['Electrician', 'Plumber', 'Janitor'] },
      it: { name: 'IT & Lab', roles: ['IT Assistant', 'Lab Attendant', 'System Admin'] },
      security: { name: 'Security', roles: ['Security Guard', 'Security Supervisor'] }
    }
  },
  admin: {
    name: 'Administration',
    sections: {
      office: { name: 'Front Office', roles: ['Receptionist', 'PRO', 'Admission Counselor'] },
      accounts: { name: 'Accounts', roles: ['Accountant', 'Fee Clerk'] },
      management: { name: 'Management', roles: ['HR Executive', 'Office Superintendent'] }
    }
  }
};

const Careers = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    category: '',
    subCategory: '',
    profile: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      setFormData({ ...formData, category: value, subCategory: '', profile: '' });
    } else if (name === 'subCategory') {
      setFormData({ ...formData, subCategory: value, profile: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="careers-page">
      <Hero 
        title="Build Your Career With Us"
        subtitle="We are always looking for passionate individuals who want to make a difference in education."
        imageUrl={heroHomeImage}
      />
      
      <section className="section bg-light">
        <div className="container">
          <div className="careers-layout">
            
            {/* Left Sidebar - Information */}
            <div className="careers-sidebar">
              <div className="sidebar-card">
                <h3>Why Join Saraswati Vidya?</h3>
                <p>We offer a dynamic, supportive, and highly collaborative environment where educators can thrive and innovate.</p>
                
                <div className="benefit-item">
                  <div className="benefit-icon"><Briefcase size={20} /></div>
                  <div>
                    <h4>Professional Growth</h4>
                    <p>Continuous training and development opportunities.</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <div className="benefit-icon"><Heart size={20} /></div>
                  <div>
                    <h4>Health & Wellness</h4>
                    <p>Comprehensive health benefits for you and your family.</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <div className="benefit-icon"><BookOpen size={20} /></div>
                  <div>
                    <h4>Modern Facilities</h4>
                    <p>Work in smart classrooms with cutting-edge technology.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Application Form */}
            <div className="careers-main">
              {submitted ? (
                <div className="success-message glass">
                  <CheckCircle size={64} className="success-icon" />
                  <h2>Application Submitted!</h2>
                  <p>Thank you, {formData.firstName}! Your application for the <strong>{formData.profile.toUpperCase()}</strong> position has been received. Our HR team will be in touch with you shortly.</p>
                  <button type="button" className="btn btn-outline mt-4" onClick={() => setSubmitted(false)}>Submit Another Application</button>
                </div>
              ) : (
                <form className="application-form glass" onSubmit={handleSubmit}>
                  <div className="form-header">
                    <h2>Submit Your Application</h2>
                    <p>Fill out the form below to apply for open positions.</p>
                  </div>

                  <div className="form-section">
                    <h3 className="section-title">Personal Details</h3>
                    <div className="grid-2">
                      <div className="input-group">
                        <label>First Name</label>
                        <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} placeholder="First Name" />
                      </div>
                      <div className="input-group">
                        <label>Last Name</label>
                        <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
                      </div>
                      <div className="input-group">
                        <label>Email Address</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="Email" />
                      </div>
                      <div className="input-group">
                        <label>Phone Number</label>
                        <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="Phone" />
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3 className="section-title">Position Details</h3>
                    <div className="grid-3-custom">
                      <div className="input-group">
                        <label>Department</label>
                        <select name="category" required value={formData.category} onChange={handleChange}>
                          <option value="">Choose...</option>
                          {Object.entries(categoryData).map(([key, data]) => (
                            <option key={key} value={key}>{data.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="input-group">
                        <label>Section</label>
                        <select name="subCategory" required value={formData.subCategory} onChange={handleChange} disabled={!formData.category}>
                          <option value="">Choose...</option>
                          {formData.category && Object.entries(categoryData[formData.category].sections).map(([key, data]) => (
                            <option key={key} value={key}>{data.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="input-group">
                        <label>Role</label>
                        <select name="profile" required value={formData.profile} onChange={handleChange} disabled={!formData.subCategory}>
                          <option value="">Choose...</option>
                          {formData.subCategory && categoryData[formData.category].sections[formData.subCategory].roles.map((role) => (
                            <option key={role} value={role}>{role}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3 className="section-title">Resume & Cover Letter</h3>
                    <div className="resume-upload">
                      <Upload size={24} color="var(--color-primary)" />
                      <div>
                        <h4>Upload your Resume</h4>
                        <p>PDF, DOC, or DOCX (Max 5MB)</p>
                      </div>
                      <input type="file" required accept=".pdf,.doc,.docx" />
                    </div>
                  </div>

                  <div className="form-footer">
                    <button type="submit" className="btn btn-primary submit-btn">Submit Application</button>
                  </div>
                </form>
              )}
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
