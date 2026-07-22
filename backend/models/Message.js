const mongoose = require('mongoose');

// Stores director and principal messages as two documents keyed by 'role'
const MessageSchema = new mongoose.Schema({
  role:    { type: String, enum: ['director', 'principal'], required: true, unique: true },
  name:    { type: String, required: true },
  title:   { type: String, required: true },
  message: { type: String, required: true },
  imageUrl:{ type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);
