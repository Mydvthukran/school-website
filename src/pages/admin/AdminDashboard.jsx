import { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { eventsApi, staffApi, submissionsApi } from '../../services/api';
import { Newspaper, Calendar, Users, Mail, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ icon: Icon, label, value, color, path, navigate }) => (
  <div
    className="admin-stat-card"
    style={{ cursor: 'pointer' }}
    onClick={() => navigate(path)}
  >
    <div className="admin-stat-card-icon" style={{ background: color + '22' }}>
      <Icon size={20} color={color} />
    </div>
    <div className="admin-stat-card-value">{value ?? '—'}</div>
    <div className="admin-stat-card-label">{label}</div>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    news: null, events: null, staff: null,
    contacts: null, admissions: null, careers: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [events, staff, subs] = await Promise.all([
          eventsApi.getAll(),
          staffApi.getAll(),
          submissionsApi.getAll(),
        ]);
        setCounts({
          news: news.length,
          events: events.length,
          staff: staff.length,
          contacts: subs.contact_submissions?.length ?? 0,
          admissions: subs.admission_applications?.length ?? 0,
          careers: subs.career_applications?.length ?? 0,
        });
      } catch (err) {
        console.error('Dashboard load error:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totalSubmissions = (counts.contacts ?? 0) + (counts.admissions ?? 0) + (counts.careers ?? 0);

  return (
    <AdminLayout pageTitle="Dashboard">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#f1f5f9', margin: '0 0 0.25rem' }}>
          Welcome back 👋
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>
          Here's an overview of your school website content.
        </p>
      </div>

      <div className="admin-stats-grid">
        <StatCard icon={Newspaper} label="News Articles" value={counts.news} color="#3b82f6" path="/admin/news" navigate={navigate} />
        <StatCard icon={Calendar} label="Events" value={counts.events} color="#8b5cf6" path="/admin/events" navigate={navigate} />
        <StatCard icon={Users} label="Staff Members" value={counts.staff} color="#10b981" path="/admin/staff" navigate={navigate} />
        <StatCard icon={Mail} label="Contact Messages" value={counts.contacts} color="#f59e0b" path="/admin/submissions" navigate={navigate} />
        <StatCard icon={GraduationCap} label="Admissions" value={counts.admissions} color="#ec4899" path="/admin/submissions" navigate={navigate} />
        <StatCard icon={Briefcase} label="Job Applications" value={counts.careers} color="#14b8a6" path="/admin/submissions" navigate={navigate} />
      </div>

      {/* Quick actions */}
      <div className="admin-panel">
        <div className="admin-panel-header">
          <h2>Quick Actions</h2>
        </div>
        <div className="admin-panel-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {[
              { label: 'View All Submissions', path: '/admin/submissions', icon: Mail, count: totalSubmissions },
              { label: 'Manage Events', path: '/admin/events', icon: Calendar },
              { label: 'Manage Staff', path: '/admin/staff', icon: Users },
            ].map(({ label, path, icon: Icon, count }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="admin-btn admin-btn-secondary"
                style={{ justifyContent: 'space-between', padding: '0.85rem 1rem', borderRadius: 10 }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Icon size={16} />
                  {label}
                  {count != null && count > 0 && (
                    <span className="admin-nav-badge">{count}</span>
                  )}
                </span>
                <ArrowRight size={14} style={{ opacity: 0.5 }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
