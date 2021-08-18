const mongoose = require('mongoose');

const FooterContentSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ""
  },
  content: {
    type: String,
    default: ""
  },
  copyright: {
    type: String,
    default: ""
  },
  isEnabled: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('footer_contents', FooterContentSchema);