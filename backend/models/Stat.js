const mongoose = require('mongoose');

const StatSchema = new mongoose.Schema({
  label:  { type: String, required: true },
  value:  { type: Number, required: true },
  suffix: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Stat', StatSchema);
