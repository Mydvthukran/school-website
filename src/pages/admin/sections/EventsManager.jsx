import { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { eventsApi } from '../../../services/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const empty = { title: '', date: '', time: '', location: '' };

const EventsManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetch = async () => {
    setLoading(true);
    try { setItems(await eventsApi.getAll()); } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const openAdd = () => { setForm(empty); setEditId(null); setModal('add'); };
  const openEdit = (item) => { setForm(item); setEditId(item.id); setModal('edit'); };
  const closeModal = () => { setModal(null); setForm(empty); setEditId(null); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (modal === 'add') {
        const created = await eventsApi.create(form);
        setItems((p) => [...p, created]);
      } else {
        const updated = await eventsApi.update(editId, form);
        setItems((p) => p.map((i) => (i.id === editId ? updated : i)));
      }
      closeModal();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this event?')) return;
    try {
      await eventsApi.delete(id);
      setItems((p) => p.filter((i) => i.id !== id));
    } catch (err) { alert('Failed: ' + err.message); }
  };

  return (
    <AdminLayout pageTitle="Events Manager">
      <div className="admin-panel">
        <div className="admin-panel-header">
          <h2>Upcoming Events ({items.length})</h2>
          <button className="admin-btn admin-btn-primary" onClick={openAdd}>
            <Plus size={14} /> Add Event
          </button>
        </div>

        {error && <div className="admin-alert admin-alert-error" style={{ margin: '1rem 1.5rem' }}>{error}</div>}

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#475569' }}>Loading...</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>Title</th><th>Date</th><th>Time</th><th>Location</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#475569' }}>No events yet.</td></tr>
                ) : items.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: '500' }}>{item.title}</td>
                    <td style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{item.date}</td>
                    <td style={{ fontSize: '0.85rem' }}>{item.time}</td>
                    <td style={{ fontSize: '0.85rem', color: '#64748b' }}>{item.location}</td>
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
              <h3>{modal === 'add' ? 'Add Event' : 'Edit Event'}</h3>
              <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={closeModal}><X size={14} /></button>
            </div>
            <form onSubmit={handleSave} className="admin-form">
              <div className="admin-field">
                <label>Event Title *</label>
                <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Event name" />
              </div>
              <div className="admin-form-row">
                <div className="admin-field">
                  <label>Date *</label>
                  <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                </div>
                <div className="admin-field">
                  <label>Time *</label>
                  <input type="text" required value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} placeholder="4:00 PM - 7:00 PM" />
                </div>
              </div>
              <div className="admin-field">
                <label>Location *</label>
                <input type="text" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Main Hall" />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button type="button" className="admin-btn admin-btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : modal === 'add' ? 'Add Event' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default EventsManager;
