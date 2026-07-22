const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer to stream directly to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // Determine folder based on upload type (query param ?folder=gallery)
    const folder = `saraswati-vidya/${req.query.folder || 'uploads'}`;
    return {
      folder,
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      public_id: `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, '').replace(/\s+/g, '-')}`,
    };
  },
});

// Limit file size to 8MB
const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed.'), false);
    }
  },
});

const storageDoc = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'saraswati-vidya/resumes',
      resource_type: 'auto',
      allowed_formats: ['pdf', 'doc', 'docx'],
      public_id: `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, '').replace(/\s+/g, '-')}`,
    };
  },
});

const uploadDoc = multer({
  storage: storageDoc,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed.'), false);
    }
  },
});

const extractPublicId = (url) => {
  if (!url || typeof url !== 'string') return null;
  try {
    const uploadIndex = url.indexOf('/upload/');
    if (uploadIndex === -1) return null;
    const pathPart = url.substring(uploadIndex + 8);
    // Remove version if present (e.g., v172153242/)
    const versionCleaned = pathPart.replace(/^v\d+\//, '');
    // Remove extension
    return versionCleaned.substring(0, versionCleaned.lastIndexOf('.')) || versionCleaned;
  } catch (err) {
    return null;
  }
};

const deleteFromCloudinary = async (url) => {
  const publicId = extractPublicId(url);
  if (!publicId) return;
  try {
    // Determine if raw or image (resumes might be raw, but usually Cloudinary destroy handles both if resource_type isn't strictly required, 
    // or we might need resource_type: 'raw' for docs. Let's try default first, if fail, try raw)
    await cloudinary.uploader.destroy(publicId);
    await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
  } catch (err) {
    console.error('Cloudinary deletion error:', err.message);
  }
};

module.exports = { cloudinary, upload, uploadDoc, deleteFromCloudinary };
