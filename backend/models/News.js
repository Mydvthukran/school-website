const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  date:     { type: String, required: true },
  excerpt:  { type: String, required: true },
  imageUrl: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('News', NewsSchema);
