import { useEffect, useState, useRef } from 'react';
import AdminLayout from '../AdminLayout';
import { staffApi, uploadImage } from '../../../services/api';
import { Plus, Pencil, Trash2, X, Upload, Loader } from 'lucide-react';

const empty = { name: '', role: '', bio: '', imageUrl: '' };

const StaffManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState('');
  const fileRef = useRef();

  const fetchData = async () => {
    setLoading(true);
    try { setItems(await staffApi.getAll()); } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setForm(empty); setEditId(null); setPreview(''); setModal('add'); };
  const openEdit = (item) => { setForm(item); setEditId(item.id); setPreview(item.imageUrl); setModal('edit'); };
  const closeModal = () => { setModal(null); setForm(empty); setEditId(null); setPreview(''); };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const { url } = await uploadImage(file, 'staff');
      setForm((f) => ({ ...f, imageUrl: url }));
      setPreview(url);
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
      if (modal === 'add') {
        const created = await staffApi.create(form);
        setItems((p) => [...p, created]);
      } else {
        const updated = await staffApi.update(editId, form);
        setItems((p) => p.map((i) => (i.id === editId ? updated : i)));
      }
      closeModal();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Remove this staff member?')) return;
    try {
      await staffApi.delete(id);
      setItems((p) => p.filter((i) => i.id !== id));
    } catch (err) { alert('Failed: ' + err.message); }
  };

  return (
    <AdminLayout pageTitle="Staff Manager">
      <div className="admin-panel">
        <div className="admin-panel-header">
          <h2>Faculty & Staff ({items.length})</h2>
          <button className="admin-btn admin-btn-primary" onClick={openAdd}>
            <Plus size={14} /> Add Staff
          </button>
        </div>

        {error && <div className="admin-alert admin-alert-error" style={{ margin: '1rem 1.5rem' }}>{error}</div>}

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#475569' }}>Loading...</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>Photo</th><th>Name</th><th>Role</th><th>Bio</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#475569' }}>No staff yet.</td></tr>
                ) : items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#94a3b8' }}>
                          {item.name?.charAt(0)}
                        </div>
                      )}
                    </td>
                    <td style={{ fontWeight: '500' }}>{item.name}</td>
                    <td><span style={{ background: '#334155', padding: '0.15rem 0.6rem', borderRadius: 6, fontSize: '0.78rem', color: '#94a3b8' }}>{item.role}</span></td>
                    <td style={{ fontSize: '0.85rem', color: '#64748b', maxWidth: 280 }}>{item.bio?.substring(0, 70)}...</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => openEdit(item)}>
                          <Pencil size={12} /> Edit
                        </button>
                        <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(item.id)}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>{modal === 'add' ? 'Add Staff Member' : 'Edit Staff Member'}</h3>
              <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={closeModal}><X size={14} /></button>
            </div>
            <form onSubmit={handleSave} className="admin-form">
              <div className="admin-form-row">
                <div className="admin-field">
                  <label>Full Name *</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Dr. Jane Doe" />
                </div>
                <div className="admin-field">
                  <label>Role / Designation *</label>
                  <input type="text" required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Head of Science" />
                </div>
              </div>

              {/* Photo Upload */}
              <div className="admin-field">
                <label>Photo</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  {/* Avatar preview */}
                  {preview ? (
                    <img src={preview} alt="Preview" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid #334155', flexShrink: 0 }} />
                  ) : (
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#1e293b', border: '2px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Upload size={20} color="#475569" />
                    </div>
                  )}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary"
                      onClick={() => fileRef.current?.click()}
                      disabled={uploading}
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      {uploading ? <><Loader size={13} className="spin" /> Uploading...</> : <><Upload size={13} /> Upload Photo</>}
                    </button>
                    <input
                      type="url"
                      value={form.imageUrl}
                      onChange={(e) => { setForm({ ...form, imageUrl: e.target.value }); setPreview(e.target.value); }}
                      placeholder="or paste URL..."
                      style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '0.5rem 0.75rem', color: '#e2e8f0', fontSize: '0.8rem', outline: 'none' }}
                    />
                  </div>
                </div>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
              </div>

              <div className="admin-field">
                <label>Bio *</label>
                <textarea required rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Short biography..." />
              </div>

              {error && <div className="admin-alert admin-alert-error">{error}</div>}

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button type="button" className="admin-btn admin-btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving || uploading}>
                  {saving ? 'Saving...' : modal === 'add' ? 'Add Staff' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default StaffManager;
