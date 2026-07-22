import { useEffect, useState, useRef } from 'react';
import AdminLayout from '../AdminLayout';
import { newsApi, uploadImage } from '../../../services/api';
import { Plus, Pencil, Trash2, X, Upload, Loader } from 'lucide-react';

const empty = { title: '', date: '', excerpt: '', imageUrl: '' };

const NewsManager = () => {
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

  const fetch = async () => {
    setLoading(true);
    try { setItems(await newsApi.getAll()); } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const openAdd = () => { setForm(empty); setEditId(null); setPreview(''); setModal('add'); };
  const openEdit = (item) => { setForm(item); setEditId(item.id); setPreview(item.imageUrl); setModal('edit'); };
  const closeModal = () => { setModal(null); setForm(empty); setEditId(null); setPreview(''); };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const { url } = await uploadImage(file, 'news');
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
        const created = await newsApi.create(form);
        setItems((p) => [...p, created]);
      } else {
        const updated = await newsApi.update(editId, form);
        setItems((p) => p.map((i) => (i.id === editId ? updated : i)));
      }
      closeModal();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this news article?')) return;
    try {
      await newsApi.delete(id);
      setItems((p) => p.filter((i) => i.id !== id));
    } catch (err) { alert('Failed: ' + err.message); }
  };

  return (
    <AdminLayout pageTitle="News Manager">
      <div className="admin-panel">
        <div className="admin-panel-header">
          <h2>News & Announcements ({items.length})</h2>
          <button className="admin-btn admin-btn-primary" onClick={openAdd}>
            <Plus size={14} /> Add News
          </button>
        </div>

        {error && <div className="admin-alert admin-alert-error" style={{ margin: '1rem 1.5rem' }}>{error}</div>}

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#475569' }}>Loading...</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Excerpt</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#475569' }}>No news yet. Add one!</td></tr>
                ) : items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.imageUrl
                        ? <img src={item.imageUrl} alt="" style={{ width: 48, height: 36, objectFit: 'cover', borderRadius: 4 }} />
                        : <div style={{ width: 48, height: 36, background: '#1e293b', borderRadius: 4 }} />}
                    </td>
                    <td style={{ fontWeight: '500' }}>{item.title}</td>
                    <td style={{ fontSize: '0.85rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>{item.date}</td>
                    <td style={{ fontSize: '0.85rem', color: '#64748b', maxWidth: 260 }}>{item.excerpt?.substring(0, 70)}...</td>
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
              <h3>{modal === 'add' ? 'Add News Article' : 'Edit News Article'}</h3>
              <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={closeModal}><X size={14} /></button>
            </div>
            <form onSubmit={handleSave} className="admin-form">
              <div className="admin-field">
                <label>Title *</label>
                <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="News headline" />
              </div>
              <div className="admin-field">
                <label>Date *</label>
                <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>

              {/* Image upload */}
              <div className="admin-field">
                <label>Cover Image</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  style={{
                    border: '2px dashed #334155', borderRadius: 10, padding: '1rem',
                    textAlign: 'center', cursor: 'pointer', background: '#0f172a',
                    transition: 'border-color 0.2s', minHeight: 90,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = '#334155'}
                >
                  {uploading ? (
                    <div style={{ color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                      <Loader size={16} className="spin" /> Uploading...
                    </div>
                  ) : preview ? (
                    <img src={preview} alt="Preview" style={{ maxHeight: 120, maxWidth: '100%', borderRadius: 8, objectFit: 'cover' }} />
                  ) : (
                    <div style={{ color: '#475569', fontSize: '0.85rem' }}>
                      <Upload size={22} style={{ margin: '0 auto 0.4rem', display: 'block' }} />
                      Click to upload image
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
              </div>

              <div className="admin-field">
                <label style={{ fontSize: '0.75rem', color: '#475569' }}>— or paste image URL —</label>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) => { setForm({ ...form, imageUrl: e.target.value }); setPreview(e.target.value); }}
                  placeholder="https://..."
                />
              </div>

              <div className="admin-field">
                <label>Excerpt *</label>
                <textarea required rows={3} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Short description..." />
              </div>

              {error && <div className="admin-alert admin-alert-error">{error}</div>}

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button type="button" className="admin-btn admin-btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving || uploading}>
                  {saving ? 'Saving...' : modal === 'add' ? 'Add Article' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default NewsManager;
