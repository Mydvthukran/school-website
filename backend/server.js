require('dotenv').config();

const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const jwt        = require('jsonwebtoken');
const bcrypt     = require('bcryptjs');
const mongoose   = require('mongoose');

// ── Models ───────────────────────────────────────────────────
const Event   = require('./models/Event');
const Staff   = require('./models/Staff');
const Gallery = require('./models/Gallery');
const Stat    = require('./models/Stat');
const Message = require('./models/Message');
const { ContactSubmission, AdmissionApplication, CareerApplication } = require('./models/Submission');
const { cloudinary, upload } = require('./cloudinary');

const app        = express();
const PORT       = process.env.PORT       || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'saraswati-vidya-admin-secret-2026';
const MONGO_URI  = process.env.MONGO_URI;

// ── MongoDB Connection ────────────────────────────────────────
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

// ── Middleware ────────────────────────────────────────────────
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ── Admin Credentials (loaded from .env — never hardcoded) ────
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
  console.error('❌ ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env');
  process.exit(1);
}

const ADMIN_USER = {
  username:     ADMIN_USERNAME,
  passwordHash: bcrypt.hashSync(ADMIN_PASSWORD, 10),
};


// ── Auth Middleware ───────────────────────────────────────────
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
}

// ── Health Check ──────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Saraswati Vidya API is running.',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    cloudinary: process.env.CLOUDINARY_CLOUD_NAME ? 'configured' : 'not configured',
  });
});

// ── IMAGE UPLOAD (Cloudinary) ─────────────────────────────────
// POST /api/upload?folder=gallery|staff|messages
// Protected — admin only
// Accepts: multipart/form-data with field name "image"
app.post('/api/upload', authenticateToken, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image file provided.' });
  res.json({
    url:       req.file.path,          // Cloudinary secure URL
    public_id: req.file.filename,      // Cloudinary public_id (for deletion)
  });
});

// DELETE image from Cloudinary (admin only)
app.delete('/api/upload', authenticateToken, async (req, res) => {
  const { public_id } = req.body;
  if (!public_id) return res.status(400).json({ error: 'public_id is required.' });
  try {
    await cloudinary.uploader.destroy(public_id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── AUTH ──────────────────────────────────────────────────────
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username !== ADMIN_USER.username || !bcrypt.compareSync(password, ADMIN_USER.passwordHash)) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, username });
});

app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// ── GENERIC CRUD FACTORY (for Mongoose models) ────────────────
function makeCrudRouter(Model) {
  const router = express.Router();

  // GET all
  router.get('/', async (req, res) => {
    try {
      const docs = await Model.find().sort({ createdAt: -1 }).lean();
      // Map _id → id for frontend compatibility
      res.json(docs.map(({ _id, __v, ...rest }) => ({ id: _id.toString(), ...rest })));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST create (protected)
  router.post('/', authenticateToken, async (req, res) => {
    try {
      const doc = await Model.create(req.body);
      const { _id, __v, ...rest } = doc.toObject();
      res.status(201).json({ id: _id.toString(), ...rest });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // PUT update (protected)
  router.put('/:id', authenticateToken, async (req, res) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
      if (!doc) return res.status(404).json({ error: 'Not found.' });
      const { _id, __v, ...rest } = doc;
      res.json({ id: _id.toString(), ...rest });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // DELETE (protected)
  router.delete('/:id', authenticateToken, async (req, res) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ error: 'Not found.' });
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}

// ── CRUD ROUTES ───────────────────────────────────────────────
app.use('/api/events',  makeCrudRouter(Event));
app.use('/api/staff',   makeCrudRouter(Staff));
app.use('/api/gallery', makeCrudRouter(Gallery));
app.use('/api/stats',   makeCrudRouter(Stat));

// ── MESSAGES (object, not array) ──────────────────────────────
app.get('/api/messages', async (req, res) => {
  try {
    const docs = await Message.find().lean();
    // Return as { director: {...}, principal: {...} }
    const result = {};
    docs.forEach(({ _id, __v, ...rest }) => {
      result[rest.role] = { id: _id.toString(), ...rest };
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/messages/:role', authenticateToken, async (req, res) => {
  const { role } = req.params;
  if (!['director', 'principal'].includes(role)) {
    return res.status(400).json({ error: 'Role must be director or principal.' });
  }
  try {
    const doc = await Message.findOneAndUpdate(
      { role },
      { ...req.body, role },
      { new: true, upsert: true, runValidators: true }
    ).lean();
    const { _id, __v, ...rest } = doc;
    res.json({ id: _id.toString(), ...rest });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── FORM SUBMISSIONS ──────────────────────────────────────────

// Contact (public)
app.post('/api/contact', async (req, res) => {
  try {
    await ContactSubmission.create({ ...req.body, submittedAt: new Date(), status: 'unread' });
    res.status(201).json({ success: true, message: 'Message received. We will get back to you soon!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admissions (public)
app.post('/api/admissions', async (req, res) => {
  try {
    await AdmissionApplication.create({ ...req.body, submittedAt: new Date(), status: 'pending' });
    res.status(201).json({ success: true, message: 'Application submitted successfully!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Careers (public)
app.post('/api/careers', async (req, res) => {
  try {
    await CareerApplication.create({ ...req.body, submittedAt: new Date(), status: 'new' });
    res.status(201).json({ success: true, message: 'Application submitted! Our HR team will contact you.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all submissions (admin only)
app.get('/api/submissions', authenticateToken, async (req, res) => {
  try {
    const [contacts, admissions, careers] = await Promise.all([
      ContactSubmission.find().sort({ submittedAt: -1 }).lean(),
      AdmissionApplication.find().sort({ submittedAt: -1 }).lean(),
      CareerApplication.find().sort({ submittedAt: -1 }).lean(),
    ]);

    const toFrontend = (arr) =>
      arr.map(({ _id, __v, ...rest }) => ({
        id: _id.toString(),
        submittedAt: rest.submittedAt?.toISOString?.() || rest.submittedAt,
        ...rest,
      }));

    res.json({
      contact_submissions:    toFrontend(contacts),
      admission_applications: toFrontend(admissions),
      career_applications:    toFrontend(careers),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE submission status (admin only)
const submissionModelMap = {
  contact_submissions:    ContactSubmission,
  admission_applications: AdmissionApplication,
  career_applications:    CareerApplication,
};

app.put('/api/submissions/:type/:id', authenticateToken, async (req, res) => {
  const { type, id } = req.params;
  const Model = submissionModelMap[type];
  if (!Model) return res.status(400).json({ error: 'Invalid submission type.' });
  try {
    const doc = await Model.findByIdAndUpdate(id, req.body, { new: true }).lean();
    if (!doc) return res.status(404).json({ error: 'Submission not found.' });
    const { _id, __v, ...rest } = doc;
    res.json({ id: _id.toString(), ...rest });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a submission (admin only)
app.delete('/api/submissions/:type/:id', authenticateToken, async (req, res) => {
  const { type, id } = req.params;
  const Model = submissionModelMap[type];
  if (!Model) return res.status(400).json({ error: 'Invalid submission type.' });
  try {
    const doc = await Model.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ error: 'Submission not found.' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Saraswati Vidya API running at http://localhost:${PORT}`);
  console.log(`   Admin login: admin / school@admin123`);
  console.log(`   Health check: http://localhost:${PORT}/api/health\n`);
});
