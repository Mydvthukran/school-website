require('dotenv').config();
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const path = require('path');

const Gallery = require('./models/Gallery');
const Message = require('./models/Message');

const MONGO_URI = process.env.MONGO_URI;

// Configure Cloudinary using individual variables from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (filePath) => {
  try {
    const fullPath = path.resolve(__dirname, '..', 'src', 'assets', filePath);
    console.log(`Uploading ${fullPath}...`);
    const result = await cloudinary.uploader.upload(fullPath, { folder: 'school_website_seed' });
    return result.secure_url;
  } catch (err) {
    console.error(`Failed to upload ${filePath}:`, err.message);
    return null;
  }
};

async function seedOriginals() {
  console.log('🌱 Connecting to MongoDB...');
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected.');

  console.log('🧹 Clearing dummy Gallery and Message documents...');
  await Gallery.deleteMany({});
  await Message.deleteMany({});

  // ── Upload and Insert Original Gallery Photos ──────────────────────
  console.log('🖼️  Uploading original gallery photos...');
  const galleryItems = [
    { title: 'Annual Sports Day', file: 'gallary/Screenshot 2026-07-03 215527.png' },
    { title: 'Science Laboratory', file: 'science lab photo.png' },
    { title: 'Cultural Festival', file: 'gallery3.jpeg' },
    { title: 'Digital Library', file: 'library photo.png' },
    { title: 'Computer Center', file: 'computer lab photo.png' },
    { title: 'Art Class', file: 'gallery2.jpeg' },
    { title: 'Campus View', file: 'gallery 4.jpeg' },
    { title: 'Extracurriculars', file: 'gallary/Screenshot 2026-07-03 215630.png' }
  ];

  for (const item of galleryItems) {
    const url = await uploadImage(item.file);
    if (url) {
      await Gallery.create({ title: item.title, imageUrl: url });
      console.log(`✅ Gallery item saved: ${item.title}`);
    }
  }

  // ── Upload and Insert Original Messages (Director/Principal) ───────
  console.log('💬 Uploading original director/principal photos...');
  const directorUrl = await uploadImage('director pic/director.png');
  const principalUrl = await uploadImage('principle pic/principle.png');

  await Message.insertMany([
    {
      role: 'director',
      name: 'Mr. Pradeep Rao',
      title: 'Director, Saraswati Vidya Sr Sec School',
      message: 'Education is not merely the filling of a pail, but the lighting of a fire. At Saraswati Vidya Sr Sec School, our goal is to ignite that spark of curiosity in every child. We are committed to providing a holistic education that empowers our students to be compassionate, innovative, and resilient leaders of tomorrow. Our dedicated faculty works tirelessly to create an environment where every student is encouraged to reach their full potential, both academically and personally.',
      imageUrl: directorUrl || '',
    },
    {
      role: 'principal',
      name: 'Dr. Anupma Yadav',
      title: 'Principal, Saraswati Vidya Sr Sec School',
      message: 'Welcome to our vibrant learning community. Our focus is on nurturing not just academic excellence, but also the character and values that will guide our students through life. We believe in creating a safe, inclusive, and challenging environment where every student feels valued and inspired to explore their passions.',
      imageUrl: principalUrl || '',
    },
  ]);
  console.log('✅ Messages seeded with original photos.');

  console.log('\n✅ Database seeded successfully with ORIGINAL photos!');
  await mongoose.disconnect();
  process.exit(0);
}

seedOriginals().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
