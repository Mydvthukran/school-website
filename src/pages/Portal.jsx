import { useState } from 'react';
import { studentData } from '../data/portalData';
import { LayoutDashboard, Calendar, GraduationCap } from 'lucide-react';
import './Portal.css';

const Portal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderDashboard = () => (
    <div className="animate-fade-in">
      <div className="dashboard-grid">
        <div className="portal-stat-card glass">
          <h4>Attendance</h4>
          <div className="portal-stat-value">{studentData.attendance}</div>
          <p className="text-sm text-muted">Current Semester</p>
        </div>
        <div className="portal-stat-card glass">
          <h4>Overall Grade</h4>
          <div className="portal-stat-value">{studentData.overallGrade}</div>
          <p className="text-sm text-muted">Latest Evaluation</p>
        </div>
        <div className="portal-stat-card glass">
          <h4>Upcoming Events</h4>
          <div className="portal-stat-value">{studentData.announcements.length}</div>
          <p className="text-sm text-muted">Check Announcements</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="portal-table-container">
          <h3 className="mb-4">Recent Grades</h3>
          <table className="portal-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Type</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {studentData.recentGrades.map((grade, index) => (
                <tr key={index}>
                  <td>{grade.subject}</td>
                  <td>{grade.type}</td>
                  <td style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{grade.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="portal-table-container">
          <h3 className="mb-4">Announcements</h3>
          <div className="announcement-list">
            {studentData.announcements.map(announcement => (
              <div key={announcement.id} className={`announcement-item ${announcement.urgent ? 'urgent' : ''}`}>
                <div>
                  <h4>{announcement.title}</h4>
                  <span className="date">{announcement.date}</span>
                </div>
                {announcement.urgent && <span style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 600 }}>Urgent</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTimetable = () => (
    <div className="portal-table-container animate-fade-in">
      <h3 className="mb-4">Weekly Timetable</h3>
      <table className="portal-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Period 1</th>
            <th>Period 2</th>
            <th>Period 3</th>
            <th>Break</th>
            <th>Period 4</th>
            <th>Period 5</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(studentData.timetable).map(([day, subjects]) => (
            <tr key={day}>
              <td style={{ fontWeight: 600 }}>{day}</td>
              {subjects.map((subject, idx) => (
                <td key={idx} style={{ backgroundColor: subject === 'Break' ? 'rgba(0,0,0,0.02)' : 'transparent' }}>
                  {subject}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'timetable':
        return renderTimetable();
      case 'grades':
        return (
          <div className="portal-table-container animate-fade-in">
            <h3 className="mb-4">All Grades</h3>
            <p className="text-muted mb-4">Detailed grade reports will be available at the end of the term.</p>
            {/* Reusing recent grades for demo */}
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {studentData.recentGrades.map((grade, index) => (
                  <tr key={index}>
                    <td>{grade.subject}</td>
                    <td>{grade.date}</td>
                    <td>{grade.type}</td>
                    <td style={{ fontWeight: 600 }}>{grade.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="portal-container">
      {/* Sidebar Navigation */}
      <aside className="portal-sidebar">
        <div className="student-info">
          <h3>{studentData.name}</h3>
          <p>{studentData.grade} | Sec {studentData.section}</p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>Roll No: {studentData.rollNo}</p>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`sidebar-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button 
            className={`sidebar-btn ${activeTab === 'timetable' ? 'active' : ''}`}
            onClick={() => setActiveTab('timetable')}
          >
            <Calendar size={20} /> Timetable
          </button>
          <button 
            className={`sidebar-btn ${activeTab === 'grades' ? 'active' : ''}`}
            onClick={() => setActiveTab('grades')}
          >
            <GraduationCap size={20} /> Grades
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="portal-content">
        <div className="portal-header">
          <h2>Student Portal</h2>
          <p className="text-muted">Welcome back, {studentData.name.split(' ')[0]}!</p>
        </div>
        
        {renderContent()}
      </main>
    </div>
  );
};

export default Portal;
