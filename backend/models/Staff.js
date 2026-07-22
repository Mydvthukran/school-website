const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  role:     { type: String, required: true },
  bio:      { type: String, required: true },
  imageUrl: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Staff', StaffSchema);
