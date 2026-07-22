import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { removeToken } from '../../services/api';
import {
  LayoutDashboard, Newspaper, Calendar, Users, Image,
  BarChart2, MessageSquare, LogOut, Mail, GraduationCap, Menu, X
} from 'lucide-react';
import './admin.css';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { label: 'Submissions', icon: Mail, path: '/admin/submissions', badge: null, section: 'Forms & Inquiries' },
  { label: 'Events', icon: Calendar, path: '/admin/events', section: 'Content Management' },
  { label: 'Staff', icon: Users, path: '/admin/staff' },
  { label: 'Gallery', icon: Image, path: '/admin/gallery' },
  { label: 'Statistics', icon: BarChart2, path: '/admin/stats', section: 'Settings' },
  { label: 'Messages', icon: MessageSquare, path: '/admin/messages' },
];

const AdminLayout = ({ children, pageTitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const adminUser = localStorage.getItem('adminUser') || 'admin';

  const handleLogout = () => {
    removeToken();
    navigate('/admin/login');
  };

  let lastSection = null;

  return (
    <div className="admin-root">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99 }}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-logo">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={20} color="#fff" />
            </div>
            <div>
              <h2>Admin Panel</h2>
              <span>Saraswati Vidya School</span>
            </div>
          </div>
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => {
            const showSection = item.section && item.section !== lastSection;
            if (item.section) lastSection = item.section;
            const isActive = location.pathname === item.path ||
              (item.path !== '/admin' && location.pathname.startsWith(item.path));

            return (
              <div key={item.path}>
                {showSection && (
                  <div className="admin-nav-section">{item.section}</div>
                )}
                <button
                  className={`admin-nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                >
                  <item.icon size={16} />
                  {item.label}
                  {item.badge != null && (
                    <span className="admin-nav-badge">{item.badge}</span>
                  )}
                </button>
              </div>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <button className="admin-logout-btn" onClick={handleLogout}>
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="admin-main">
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'none' }}
              className="admin-menu-toggle"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <span className="admin-topbar-title">{pageTitle}</span>
          </div>

          <div className="admin-topbar-user">
            <div className="admin-topbar-avatar">
              {adminUser.charAt(0).toUpperCase()}
            </div>
            <span>{adminUser}</span>
          </div>
        </header>

        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
