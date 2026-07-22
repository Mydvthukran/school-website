const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ─── Auth helpers ─────────────────────────────────────────────
export function getToken() {
  return localStorage.getItem('adminToken');
}

export function setToken(token) {
  localStorage.setItem('adminToken', token);
}

export function removeToken() {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
}

async function request(method, path, body) {
  const opts = {
    method,
    headers: method === 'GET' ? {} : { 'Content-Type': 'application/json' },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE_URL}${path}`, opts);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

async function authRequest(method, path, body) {
  const opts = {
    method,
    headers: authHeaders(),
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE_URL}${path}`, opts);
  if (res.status === 401 || res.status === 403) {
    removeToken();
    window.location.href = '/admin/login';
    return;
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

// ─── Auth ─────────────────────────────────────────────────────
export const authApi = {
  login: (username, password) =>
    request('POST', '/auth/login', { username, password }),
  verify: () => authRequest('GET', '/auth/verify'),
};

// ─── Public data ──────────────────────────────────────────────
export const eventsApi = {
  getAll: () => request('GET', '/events'),
  create: (data) => authRequest('POST', '/events', data),
  update: (id, data) => authRequest('PUT', `/events/${id}`, data),
  delete: (id) => authRequest('DELETE', `/events/${id}`),
};

export const staffApi = {
  getAll: () => request('GET', '/staff'),
  create: (data) => authRequest('POST', '/staff', data),
  update: (id, data) => authRequest('PUT', `/staff/${id}`, data),
  delete: (id) => authRequest('DELETE', `/staff/${id}`),
};

export const galleryApi = {
  getAll: () => request('GET', '/gallery'),
  create: (data) => authRequest('POST', '/gallery', data),
  update: (id, data) => authRequest('PUT', `/gallery/${id}`, data),
  delete: (id) => authRequest('DELETE', `/gallery/${id}`),
};

export const statsApi = {
  getAll: () => request('GET', '/stats'),
  update: (id, data) => authRequest('PUT', `/stats/${id}`, data),
};

export const messagesApi = {
  getAll: () => request('GET', '/messages'),
  updateRole: (role, data) => authRequest('PUT', `/messages/${role}`, data),
};

// ─── Form Submissions (public POST) ──────────────────────────
export const submitContact = (data) => request('POST', '/contact', data);
export const submitAdmission = (data) => request('POST', '/admissions', data);
export const submitCareer = (data) => request('POST', '/careers', data);

// ─── Submissions (admin only) ────────────────────────────────
export const submissionsApi = {
  getAll: () => authRequest('GET', '/submissions'),
  updateStatus: (type, id, data) => authRequest('PUT', `/submissions/${type}/${id}`, data),
  delete: (type, id) => authRequest('DELETE', `/submissions/${type}/${id}`),
};

// ─── Image Upload via Cloudinary ─────────────────────────────
// folder: 'gallery' | 'staff' | 'messages'
// Returns: { url: string, public_id: string }
export async function uploadImage(file, folder = 'uploads') {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`${BASE_URL}/upload?folder=${folder}`, {
    method: 'POST',
    // Do NOT set Content-Type manually — browser sets multipart boundary automatically
    headers: { Authorization: `Bearer ${getToken()}` },
    body: formData,
  });

  if (res.status === 401 || res.status === 403) {
    removeToken();
    window.location.href = '/admin/login';
    return;
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Image upload failed');
  }

  return res.json(); // { url, public_id }
}

// ─── Document Upload via Cloudinary ──────────────────────────
// Public upload for resumes
export async function uploadResume(file) {
  const formData = new FormData();
  formData.append('resume', file);

  const res = await fetch(`${BASE_URL}/upload/resume`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Resume upload failed');
  }

  return res.json(); // { url, public_id }
}
