const mongoose = require('mongoose');

const SiteTitleSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ""
  },
  favicon: {
    type: String,
    default: ""
  },
  isEnabled: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('site_titles', SiteTitleSchema);