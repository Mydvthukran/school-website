import { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { statsApi } from '../../../services/api';
import { Pencil, X, Save } from 'lucide-react';

const StatsManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try { setItems(await statsApi.getAll()); } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const openEdit = (item) => { setEditItem(item); setForm({ ...item }); };
  const closeEdit = () => { setEditItem(null); setForm({}); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await statsApi.update(editItem.id, {
        label: form.label,
        value: Number(form.value),
        suffix: form.suffix,
      });
      setItems((p) => p.map((i) => (i.id === editItem.id ? updated : i)));
      closeEdit();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  return (
    <AdminLayout pageTitle="Statistics">
      <div className="admin-panel">
        <div className="admin-panel-header">
          <h2>School Statistics</h2>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Edit the numbers shown on the home page</span>
        </div>

        {error && <div className="admin-alert admin-alert-error" style={{ margin: '1rem 1.5rem' }}>{error}</div>}

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#475569' }}>Loading...</div>
        ) : (
          <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
            {items.map((item) => (
              <div key={item.id} style={{ background: '#0f172a', borderRadius: 12, border: '1px solid #334155', padding: '1.5rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#3b82f6', lineHeight: 1 }}>
                  {item.value}{item.suffix}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.5rem', marginBottom: '1rem' }}>{item.label}</div>
                <button className="admin-btn admin-btn-ghost admin-btn-sm" style={{ width: '100%', justifyContent: 'center' }} onClick={() => openEdit(item)}>
                  <Pencil size={12} /> Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {editItem && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>Edit Statistic</h3>
              <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={closeEdit}><X size={14} /></button>
            </div>
            <form onSubmit={handleSave} className="admin-form">
              <div className="admin-field">
                <label>Label *</label>
                <input type="text" required value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Students" />
              </div>
              <div className="admin-form-row">
                <div className="admin-field">
                  <label>Value *</label>
                  <input type="number" required value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
                </div>
                <div className="admin-field">
                  <label>Suffix</label>
                  <input type="text" value={form.suffix} onChange={(e) => setForm({ ...form, suffix: e.target.value })} placeholder="+ or %" />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button type="button" className="admin-btn admin-btn-secondary" onClick={closeEdit}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  <Save size={13} /> {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default StatsManager;
