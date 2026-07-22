const mongoose = require('mongoose');

// ── Contact Message ──────────────────────────────────────────
const ContactSubmissionSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
  status:  { type: String, enum: ['unread', 'read', 'replied'], default: 'unread' },
  submittedAt: { type: Date, default: Date.now },
});

// ── Admission Application ─────────────────────────────────────
const AdmissionApplicationSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  parentName:  { type: String, required: true },
  email:       { type: String, required: true },
  phone:       { type: String, required: true },
  grade:       { type: String, required: true },
  status: { type: String, enum: ['pending', 'reviewed', 'shortlisted', 'rejected'], default: 'pending' },
  submittedAt: { type: Date, default: Date.now },
});

// ── Career Application ────────────────────────────────────────
const CareerApplicationSchema = new mongoose.Schema({
  firstName:   { type: String, required: true },
  lastName:    { type: String, required: true },
  email:       { type: String, required: true },
  phone:       { type: String, required: true },
  category:    { type: String, required: true },
  subCategory: { type: String, required: true },
  profile:     { type: String, required: true },
  resumeUrl:   { type: String, required: true },
  status: { type: String, enum: ['new', 'reviewed', 'shortlisted', 'rejected'], default: 'new' },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = {
  ContactSubmission:    mongoose.model('ContactSubmission',    ContactSubmissionSchema),
  AdmissionApplication: mongoose.model('AdmissionApplication', AdmissionApplicationSchema),
  CareerApplication:    mongoose.model('CareerApplication',    CareerApplicationSchema),
};
