const mongoose = require('mongoose');

const ContactInfoSchema = new mongoose.Schema({
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
}, {timestamps: true});

module.exports = mongoose.model('contact_infos', ContactInfoSchema);