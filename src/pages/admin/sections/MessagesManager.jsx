import { useEffect, useState, useRef } from 'react';
import AdminLayout from '../AdminLayout';
import { messagesApi, uploadImage } from '../../../services/api';
import { Save, User, Upload, Loader } from 'lucide-react';

const MessageForm = ({ role, label, data, onSave }) => {
  const [form, setForm] = useState(data);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef();

  useEffect(() => { setForm(data); }, [data]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const { url } = await uploadImage(file, 'messages');
      setForm((f) => ({ ...f, imageUrl: url }));
    } catch (err) {
      setError('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(role, { name: form.name, title: form.title, message: form.message, imageUrl: form.imageUrl || '' });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) { setError('Save failed: ' + err.message); }
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

          {/* Photo upload row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1rem', background: '#0f172a', borderRadius: 10, border: '1px solid #334155' }}>
            {form.imageUrl ? (
              <img src={form.imageUrl} alt="Profile" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '2px solid #3b82f6', flexShrink: 0 }} />
            ) : (
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#1e293b', border: '2px dashed #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <User size={28} color="#475569" />
              </div>
            )}
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', fontWeight: '600', color: '#e2e8f0' }}>Profile Photo</p>
              <button
                type="button"
                className="admin-btn admin-btn-secondary admin-btn-sm"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? <><Loader size={12} className="spin" /> Uploading...</> : <><Upload size={12} /> Upload Photo</>}
              </button>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
              <p style={{ margin: '0.4rem 0 0', fontSize: '0.72rem', color: '#475569' }}>JPG/PNG/WebP · Max 8MB · Uploaded to Cloudinary</p>
            </div>
          </div>

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

          {error && <div className="admin-alert admin-alert-error">{error}</div>}

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving || uploading}>
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
