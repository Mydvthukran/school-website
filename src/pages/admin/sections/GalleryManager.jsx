import { useEffect, useState, useRef } from 'react';
import AdminLayout from '../AdminLayout';
import { galleryApi, uploadImage } from '../../../services/api';
import { Plus, Pencil, Trash2, X, Image, Upload, Loader } from 'lucide-react';

const empty = { title: '', imageUrl: '' };

const GalleryManager = () => {
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
    try { setItems(await galleryApi.getAll()); } catch (e) { setError(e.message); }
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
      const { url } = await uploadImage(file, 'gallery');
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
    if (!form.imageUrl) { setError('Please upload or enter an image.'); return; }
    setSaving(true);
    try {
      if (modal === 'add') {
        const created = await galleryApi.create(form);
        setItems((p) => [...p, created]);
      } else {
        const updated = await galleryApi.update(editId, form);
        setItems((p) => p.map((i) => (i.id === editId ? updated : i)));
      }
      closeModal();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Remove this gallery image?')) return;
    try {
      await galleryApi.delete(id);
      setItems((p) => p.filter((i) => i.id !== id));
    } catch (err) { alert('Failed: ' + err.message); }
  };

  return (
    <AdminLayout pageTitle="Gallery Manager">
      <div className="admin-panel">
        <div className="admin-panel-header">
          <h2>Photo Gallery ({items.length})</h2>
          <button className="admin-btn admin-btn-primary" onClick={openAdd}>
            <Plus size={14} /> Add Photo
          </button>
        </div>

        {error && <div className="admin-alert admin-alert-error" style={{ margin: '1rem 1.5rem' }}>{error}</div>}

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#475569' }}>Loading...</div>
        ) : (
          <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {items.length === 0 ? (
              <div className="admin-empty" style={{ gridColumn: '1/-1' }}>
                <Image size={40} />
                <p>No gallery images yet. Add your first photo!</p>
              </div>
            ) : items.map((item) => (
              <div key={item.id} style={{ background: '#0f172a', borderRadius: 10, overflow: 'hidden', border: '1px solid #334155' }}>
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: 140, background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image size={32} color="#334155" />
                  </div>
                )}
                <div style={{ padding: '0.75rem' }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: '500', color: '#e2e8f0', margin: '0 0 0.5rem' }}>{item.title}</p>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => openEdit(item)} style={{ flex: 1, justifyContent: 'center' }}>
                      <Pencil size={11} /> Edit
                    </button>
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(item.id)}>
                      <Trash2 size={11} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>{modal === 'add' ? 'Add Gallery Photo' : 'Edit Gallery Photo'}</h3>
              <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={closeModal}><X size={14} /></button>
            </div>
            <form onSubmit={handleSave} className="admin-form">
              <div className="admin-field">
                <label>Caption / Title *</label>
                <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Annual Sports Day" />
              </div>

              {/* Upload section */}
              <div className="admin-field">
                <label>Photo</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  style={{
                    border: '2px dashed #334155', borderRadius: 10, padding: '1.5rem',
                    textAlign: 'center', cursor: 'pointer', background: '#0f172a',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = '#334155'}
                >
                  {uploading ? (
                    <div style={{ color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      <Loader size={18} className="spin" /> Uploading to Cloudinary...
                    </div>
                  ) : preview ? (
                    <img src={preview} alt="Preview" style={{ maxHeight: 160, maxWidth: '100%', borderRadius: 8, objectFit: 'cover' }} />
                  ) : (
                    <div style={{ color: '#475569' }}>
                      <Upload size={28} style={{ margin: '0 auto 0.5rem' }} />
                      <p style={{ margin: 0, fontSize: '0.85rem' }}>Click to upload image</p>
                      <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: '#334155' }}>JPG, PNG, WebP · Max 8MB</p>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
              </div>

              {/* OR enter URL manually */}
              <div className="admin-field">
                <label style={{ fontSize: '0.75rem', color: '#475569' }}>— or paste an image URL —</label>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) => { setForm({ ...form, imageUrl: e.target.value }); setPreview(e.target.value); }}
                  placeholder="https://..."
                />
              </div>

              {error && <div className="admin-alert admin-alert-error">{error}</div>}

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button type="button" className="admin-btn admin-btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving || uploading}>
                  {saving ? 'Saving...' : modal === 'add' ? 'Add Photo' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default GalleryManager;
