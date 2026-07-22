import { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { messagesApi } from '../../../services/api';
import { Save, User } from 'lucide-react';

const MessageForm = ({ role, label, data, onSave }) => {
  const [form, setForm] = useState(data);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setForm(data); }, [data]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(role, { name: form.name, title: form.title, message: form.message });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) { alert('Save failed: ' + err.message); }
    finally { setSaving(false); }
  };

  return (
    <div className="admin-panel" style={{ marginBottom: '1.5rem' }}>
      <div className="admin-panel-header">
        <h2>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={16} /> {label}
          </span>
        </h2>
      </div>
      <div className="admin-panel-body">
        <form onSubmit={handleSave} className="admin-form">
          <div className="admin-form-row">
            <div className="admin-field">
              <label>Full Name *</label>
              <input type="text" required value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Dr. Jane Doe" />
            </div>
            <div className="admin-field">
              <label>Designation / Title *</label>
              <input type="text" required value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Principal, XYZ School" />
            </div>
          </div>
          <div className="admin-field">
            <label>Message *</label>
            <textarea required rows={5} value={form.message || ''} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Their message shown on the home page..." />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
              <Save size={13} /> {saving ? 'Saving...' : 'Save Message'}
            </button>
            {saved && <span style={{ fontSize: '0.8rem', color: '#4ade80' }}>✓ Saved!</span>}
          </div>
        </form>
      </div>
    </div>
  );
};

const MessagesManager = () => {
  const [data, setData] = useState({ director: {}, principal: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try { setData(await messagesApi.getAll()); }
      catch (e) { setError(e.message); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  const handleSave = async (role, payload) => {
    const updated = await messagesApi.updateRole(role, payload);
    setData((prev) => ({ ...prev, [role]: { ...prev[role], ...updated } }));
  };

  return (
    <AdminLayout pageTitle="Messages">
      {error && <div className="admin-alert admin-alert-error" style={{ marginBottom: '1rem' }}>{error}</div>}

      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#475569' }}>Loading...</div>
      ) : (
        <>
          <MessageForm role="director" label="Director's Message" data={data.director} onSave={handleSave} />
          <MessageForm role="principal" label="Principal's Message" data={data.principal} onSave={handleSave} />
        </>
      )}
    </AdminLayout>
  );
};

export default MessagesManager;
