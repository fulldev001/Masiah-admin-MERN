const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ""
  },
  icon: {
    type: String,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model('services', ServiceSchema);