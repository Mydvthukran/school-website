const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'saraswati-vidya-admin-secret-2026';

// ─── Middleware ──────────────────────────────────────────────
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ─── Data Helpers ────────────────────────────────────────────
const DATA_DIR = path.join(__dirname, 'data');

function readData(filename) {
  const filePath = path.join(DATA_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

function writeData(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// ─── Admin Credentials (hashed password) ────────────────────
// Default: admin / school@admin123
// To change: update ADMIN_PASSWORD_HASH below using bcryptjs.hashSync('newpassword', 10)
const ADMIN_USER = {
  username: 'admin',
  // Hash of: school@admin123
  passwordHash: bcrypt.hashSync('school@admin123', 10),
};

// ─── Auth Middleware ─────────────────────────────────────────
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
}

// ─── Health Check ────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Saraswati Vidya API is running.' });
});

// ─── AUTH ROUTES ─────────────────────────────────────────────
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username !== ADMIN_USER.username) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }
  const valid = bcrypt.compareSync(password, ADMIN_USER.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, username });
});

app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// ─── GENERIC CRUD FACTORY ────────────────────────────────────
function makeCrudRouter(filename, listKey) {
  const router = express.Router();

  // GET all
  router.get('/', (req, res) => {
    try {
      const data = readData(filename);
      res.json(data[listKey] || data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST create (protected)
  router.post('/', authenticateToken, (req, res) => {
    try {
      const data = readData(filename);
      const newItem = { id: uuidv4(), ...req.body };
      data[listKey].push(newItem);
      writeData(filename, data);
      res.status(201).json(newItem);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // PUT update (protected)
  router.put('/:id', authenticateToken, (req, res) => {
    try {
      const data = readData(filename);
      const idx = data[listKey].findIndex((item) => item.id === req.params.id);
      if (idx === -1) return res.status(404).json({ error: 'Not found.' });
      data[listKey][idx] = { ...data[listKey][idx], ...req.body, id: req.params.id };
      writeData(filename, data);
      res.json(data[listKey][idx]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE (protected)
  router.delete('/:id', authenticateToken, (req, res) => {
    try {
      const data = readData(filename);
      const filtered = data[listKey].filter((item) => item.id !== req.params.id);
      if (filtered.length === data[listKey].length) {
        return res.status(404).json({ error: 'Not found.' });
      }
      data[listKey] = filtered;
      writeData(filename, data);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}

// ─── CRUD ROUTES ─────────────────────────────────────────────
app.use('/api/news', makeCrudRouter('news.json', 'news'));
app.use('/api/events', makeCrudRouter('events.json', 'events'));
app.use('/api/staff', makeCrudRouter('staff.json', 'staff'));
app.use('/api/gallery', makeCrudRouter('gallery.json', 'gallery'));

// Stats (array with IDs)
app.use('/api/stats', makeCrudRouter('stats.json', 'stats'));

// ─── MESSAGES ROUTES (special: object, not array) ────────────
app.get('/api/messages', (req, res) => {
  try {
    res.json(readData('messages.json'));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/messages/:role', authenticateToken, (req, res) => {
  try {
    const { role } = req.params; // 'director' or 'principal'
    if (!['director', 'principal'].includes(role)) {
      return res.status(400).json({ error: 'Role must be director or principal.' });
    }
    const data = readData('messages.json');
    data[role] = { ...data[role], ...req.body };
    writeData('messages.json', data);
    res.json(data[role]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── FORM SUBMISSIONS ─────────────────────────────────────────

// Contact form (public POST, protected GET)
app.post('/api/contact', (req, res) => {
  try {
    const data = readData('submissions.json');
    const entry = {
      id: uuidv4(),
      submittedAt: new Date().toISOString(),
      status: 'unread',
      ...req.body,
    };
    data.contact_submissions.push(entry);
    writeData('submissions.json', data);
    res.status(201).json({ success: true, message: 'Message received. We will get back to you soon!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admissions form (public POST, protected GET)
app.post('/api/admissions', (req, res) => {
  try {
    const data = readData('submissions.json');
    const entry = {
      id: uuidv4(),
      submittedAt: new Date().toISOString(),
      status: 'pending',
      ...req.body,
    };
    data.admission_applications.push(entry);
    writeData('submissions.json', data);
    res.status(201).json({ success: true, message: 'Application submitted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Careers form (public POST, protected GET)
app.post('/api/careers', (req, res) => {
  try {
    const data = readData('submissions.json');
    const entry = {
      id: uuidv4(),
      submittedAt: new Date().toISOString(),
      status: 'new',
      ...req.body,
    };
    data.career_applications.push(entry);
    writeData('submissions.json', data);
    res.status(201).json({ success: true, message: 'Application submitted! Our HR team will contact you.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all submissions (admin only)
app.get('/api/submissions', authenticateToken, (req, res) => {
  try {
    res.json(readData('submissions.json'));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE submission status (admin only)
app.put('/api/submissions/:type/:id', authenticateToken, (req, res) => {
  try {
    const { type, id } = req.params;
    const validTypes = ['contact_submissions', 'admission_applications', 'career_applications'];
    if (!validTypes.includes(type)) return res.status(400).json({ error: 'Invalid submission type.' });
    const data = readData('submissions.json');
    const idx = data[type].findIndex((s) => s.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Submission not found.' });
    data[type][idx] = { ...data[type][idx], ...req.body };
    writeData('submissions.json', data);
    res.json(data[type][idx]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a submission (admin only)
app.delete('/api/submissions/:type/:id', authenticateToken, (req, res) => {
  try {
    const { type, id } = req.params;
    const validTypes = ['contact_submissions', 'admission_applications', 'career_applications'];
    if (!validTypes.includes(type)) return res.status(400).json({ error: 'Invalid submission type.' });
    const data = readData('submissions.json');
    const filtered = data[type].filter((s) => s.id !== id);
    data[type] = filtered;
    writeData('submissions.json', data);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Start ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✅ Saraswati Vidya API running at http://localhost:${PORT}`);
  console.log(`   Admin login: admin / school@admin123`);
  console.log(`   Health check: http://localhost:${PORT}/api/health\n`);
});
