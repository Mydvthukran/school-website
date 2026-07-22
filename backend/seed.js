/**
 * seed.js — populates MongoDB with initial school data
 * Run once: node seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');

const Event   = require('./models/Event');
const Staff   = require('./models/Staff');
const Gallery = require('./models/Gallery');
const Stat    = require('./models/Stat');
const Message = require('./models/Message');

const MONGO_URI = process.env.MONGO_URI;

async function seed() {
  console.log('🌱 Connecting to MongoDB...');
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected.');

  // ── Clear existing data ──────────────────────────────────────
  await Promise.all([
    Event.deleteMany({}),
    Staff.deleteMany({}),
    Gallery.deleteMany({}),
    Stat.deleteMany({}),
    Message.deleteMany({}),
  ]);
  console.log('🧹 Cleared existing documents.');

  // ── Events ───────────────────────────────────────────────────
  await Event.insertMany([
    { title: 'Parent-Teacher Conferences', date: '2026-07-10', time: '4:00 PM - 7:00 PM', location: 'Main Hall' },
    { title: 'Summer Music Concert',       date: '2026-07-15', time: '6:00 PM - 8:00 PM', location: 'School Auditorium' },
    { title: 'Alumni Meet & Greet',        date: '2026-07-22', time: '10:00 AM - 2:00 PM', location: 'School Cafeteria' },
  ]);
  console.log('📅 Events seeded.');

  // ── Staff ────────────────────────────────────────────────────
  await Staff.insertMany([
    {
      name: 'Dr. Eleanor Vance',
      role: 'Principal',
      bio: 'Dr. Vance has over 20 years of experience in education leadership, driving innovation and excellence.',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Mr. Arthur Pendelton',
      role: 'Head of Science',
      bio: 'Passionate about physics and chemistry, Mr. Pendelton ensures every student gets hands-on lab experience.',
      imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Ms. Sarah Jenkins',
      role: 'Head of Arts',
      bio: 'An accomplished artist herself, Ms. Jenkins fosters creativity and expression in all her students.',
      imageUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ]);
  console.log('👩‍🏫 Staff seeded.');

  // ── Gallery ──────────────────────────────────────────────────
  await Gallery.insertMany([
    { title: 'Annual Sports Day',  imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80' },
    { title: 'Cultural Festival',  imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80' },
    { title: 'Art Class',          imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80' },
    { title: 'Campus View',        imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80' },
    { title: 'Extracurriculars',   imageUrl: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80' },
  ]);
  console.log('🖼️  Gallery seeded.');

  // ── Stats ────────────────────────────────────────────────────
  await Stat.insertMany([
    { label: 'Students',           value: 1200, suffix: '+' },
    { label: 'Faculty Members',    value: 85,   suffix: ''  },
    { label: 'Clubs & Activities', value: 40,   suffix: '+' },
    { label: 'Board Exam Passing', value: 98,   suffix: '%' },
  ]);
  console.log('📊 Stats seeded.');

  // ── Messages ─────────────────────────────────────────────────
  await Message.insertMany([
    {
      role: 'director',
      name: 'Mr. Pradeep Rao',
      title: 'Director, Saraswati Vidya Sr Sec School',
      message: 'Education is not merely the filling of a pail, but the lighting of a fire. At Saraswati Vidya Sr Sec School, our goal is to ignite that spark of curiosity in every child. We are committed to providing a holistic education that empowers our students to be compassionate, innovative, and resilient leaders of tomorrow.',
      imageUrl: '',
    },
    {
      role: 'principal',
      name: 'Dr. Anupma Yadav',
      title: 'Principal, Saraswati Vidya Sr Sec School',
      message: 'Welcome to our vibrant learning community. Our focus is on nurturing not just academic excellence, but also the character and values that will guide our students through life. We believe in creating a safe, inclusive, and challenging environment where every student feels valued and inspired to explore their passions.',
      imageUrl: '',
    },
  ]);
  console.log('💬 Messages seeded.');

  console.log('\n✅ Database seeded successfully!');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
