const mongoose = require('mongoose');

const LogoSchema = new mongoose.Schema({
  type: {
    type: String,
    default: ""
  },
  content: {
    type: String,
    default: ""
  },
  isEnabled: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('logos', LogoSchema);