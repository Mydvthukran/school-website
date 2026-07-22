import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, setToken } from '../../services/api';
import { Loader, AlertCircle, GraduationCap } from 'lucide-react';
import './admin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await authApi.login(credentials.username, credentials.password);
      setToken(data.token);
      localStorage.setItem('adminUser', data.username);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <div className="logo-icon">
            <GraduationCap size={28} color="#fff" />
          </div>
          <h1>Admin Panel</h1>
          <p>Saraswati Vidya Sr Sec School</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-field">
            <label>Username</label>
            <input
              type="text"
              id="admin-username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              placeholder="Username"
              required
              autoFocus
            />
          </div>

          <div className="admin-field">
            <label>Password</label>
            <input
              type="password"
              id="admin-password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="••••••••••••"
              required
            />
          </div>

          {error && (
            <div className="admin-alert admin-alert-error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', fontSize: '0.9rem', marginTop: '0.5rem' }}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader size={16} className="spin" /> Signing in...
              </>
            ) : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#475569', marginTop: '1.5rem' }}>
          Contact your administrator for login credentials.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
