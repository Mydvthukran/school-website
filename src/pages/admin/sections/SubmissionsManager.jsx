import { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { submissionsApi } from '../../../services/api';
import { Mail, GraduationCap, Briefcase, Trash2, RefreshCw, Eye, X } from 'lucide-react';

const formatDate = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
};

const statusOptions = {
  contact_submissions: ['unread', 'read', 'replied'],
  admission_applications: ['pending', 'reviewed', 'shortlisted', 'rejected'],
  career_applications: ['new', 'reviewed', 'shortlisted', 'rejected'],
};

const badgeClass = {
  unread: 'admin-badge-unread',
  read: 'admin-badge-read',
  replied: 'admin-badge-reviewed',
  pending: 'admin-badge-pending',
  reviewed: 'admin-badge-reviewed',
  shortlisted: 'admin-badge-new',
  rejected: 'admin-badge-rejected',
  new: 'admin-badge-new',
};

const tabs = [
  { key: 'contact_submissions', label: 'Contact Messages', icon: Mail },
  { key: 'admission_applications', label: 'Admissions', icon: GraduationCap },
  { key: 'career_applications', label: 'Job Applications', icon: Briefcase },
];

const DetailModal = ({ item, type, onClose, onStatusChange }) => {
  const [status, setStatus] = useState(item.status);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await submissionsApi.updateStatus(type, item.id, { status });
      onStatusChange(item.id, status);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal">
        <div className="admin-modal-header">
          <h3>Submission Details</h3>
          <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={onClose}>
            <X size={14} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {Object.entries(item)
            .filter(([k]) => !['id', 'status'].includes(k))
            .map(([key, val]) => (
              <div key={key} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '0.5rem', borderBottom: '1px solid #334155', paddingBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600', textTransform: 'capitalize' }}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ')}
                </span>
                <span style={{ fontSize: '0.875rem', color: '#e2e8f0', wordBreak: 'break-word' }}>{val || '—'}</span>
              </div>
            ))}

          <div className="admin-field">
            <label>Update Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              {statusOptions[type].map((s) => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button className="admin-btn admin-btn-secondary" onClick={onClose}>Cancel</button>
            <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Status'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SubmissionsManager = () => {
  const [activeTab, setActiveTab] = useState('contact_submissions');
  const [data, setData] = useState({ contact_submissions: [], admission_applications: [], career_applications: [] });
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await submissionsApi.getAll();
      setData(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this submission?')) return;
    try {
      await submissionsApi.delete(activeTab, id);
      setData((prev) => ({ ...prev, [activeTab]: prev[activeTab].filter((s) => s.id !== id) }));
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setData((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].map((s) => s.id === id ? { ...s, status: newStatus } : s)
    }));
  };

  const current = data[activeTab] || [];

  const renderContactTable = () => (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {current.length === 0 ? (
            <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#475569' }}>No messages yet.</td></tr>
          ) : current.slice().reverse().map((s) => (
            <tr key={s.id}>
              <td style={{ whiteSpace: 'nowrap', fontSize: '0.78rem' }}>{formatDate(s.submittedAt)}</td>
              <td>{s.name}</td>
              <td style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{s.email}</td>
              <td style={{ fontSize: '0.85rem' }}>{s.subject || '—'}</td>
              <td><span className={`admin-badge ${badgeClass[s.status] || 'admin-badge-read'}`}>{s.status}</span></td>
              <td>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => setSelected(s)}>
                    <Eye size={12} /> View
                  </button>
                  <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(s.id)}>
                    <Trash2 size={12} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderAdmissionsTable = () => (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Student</th>
            <th>Parent</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Grade</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {current.length === 0 ? (
            <tr><td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: '#475569' }}>No applications yet.</td></tr>
          ) : current.slice().reverse().map((s) => (
            <tr key={s.id}>
              <td style={{ whiteSpace: 'nowrap', fontSize: '0.78rem' }}>{formatDate(s.submittedAt)}</td>
              <td>{s.studentName}</td>
              <td style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{s.parentName}</td>
              <td style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{s.email}</td>
              <td style={{ fontSize: '0.85rem' }}>{s.phone}</td>
              <td><span style={{ background: '#334155', padding: '0.15rem 0.5rem', borderRadius: 6, fontSize: '0.78rem' }}>Grade {s.grade}</span></td>
              <td><span className={`admin-badge ${badgeClass[s.status] || 'admin-badge-pending'}`}>{s.status}</span></td>
              <td>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => setSelected(s)}>
                    <Eye size={12} /> View
                  </button>
                  <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(s.id)}>
                    <Trash2 size={12} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderCareersTable = () => (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {current.length === 0 ? (
            <tr><td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: '#475569' }}>No applications yet.</td></tr>
          ) : current.slice().reverse().map((s) => (
            <tr key={s.id}>
              <td style={{ whiteSpace: 'nowrap', fontSize: '0.78rem' }}>{formatDate(s.submittedAt)}</td>
              <td>{s.firstName} {s.lastName}</td>
              <td style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{s.email}</td>
              <td style={{ fontSize: '0.85rem' }}>{s.phone}</td>
              <td style={{ textTransform: 'capitalize', fontSize: '0.85rem' }}>{s.category}</td>
              <td style={{ fontSize: '0.85rem' }}>{s.profile}</td>
              <td><span className={`admin-badge ${badgeClass[s.status] || 'admin-badge-new'}`}>{s.status}</span></td>
              <td>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => setSelected(s)}>
                    <Eye size={12} /> View
                  </button>
                  <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(s.id)}>
                    <Trash2 size={12} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <AdminLayout pageTitle="Form Submissions">
      <div className="admin-panel">
        <div className="admin-panel-header">
          <h2>All Submissions</h2>
          <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={fetchData}>
            <RefreshCw size={13} /> Refresh
          </button>
        </div>

        <div style={{ padding: '0 1.5rem' }}>
          <div className="admin-tabs">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                className={`admin-tab ${activeTab === key ? 'active' : ''}`}
                onClick={() => setActiveTab(key)}
              >
                <Icon size={14} />
                {label}
                <span style={{ marginLeft: '0.25rem', fontSize: '0.7rem', color: activeTab === key ? '#3b82f6' : '#475569' }}>
                  ({(data[key] || []).length})
                </span>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="admin-alert admin-alert-error" style={{ margin: '0 1.5rem 1rem' }}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#475569' }}>Loading submissions...</div>
        ) : (
          <div>
            {activeTab === 'contact_submissions' && renderContactTable()}
            {activeTab === 'admission_applications' && renderAdmissionsTable()}
            {activeTab === 'career_applications' && renderCareersTable()}
          </div>
        )}
      </div>

      {selected && (
        <DetailModal
          item={selected}
          type={activeTab}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </AdminLayout>
  );
};

export default SubmissionsManager;
