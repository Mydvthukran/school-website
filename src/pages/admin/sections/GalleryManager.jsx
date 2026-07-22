import { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { galleryApi } from '../../../services/api';
import { Plus, Pencil, Trash2, X, Image } from 'lucide-react';

const empty = { title: '', imageUrl: '' };

const GalleryManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try { setItems(await galleryApi.getAll()); } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setForm(empty); setEditId(null); setModal('add'); };
  const openEdit = (item) => { setForm(item); setEditId(item.id); setModal('edit'); };
  const closeModal = () => { setModal(null); setForm(empty); setEditId(null); };

  const handleSave = async (e) => {
    e.preventDefault();
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
              <div className="admin-field">
                <label>Image URL *</label>
                <input type="url" required value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." />
              </div>
              {form.imageUrl && (
                <img src={form.imageUrl} alt="Preview" style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 8 }} onError={(e) => { e.target.style.display = 'none'; }} />
              )}
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button type="button" className="admin-btn admin-btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
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
