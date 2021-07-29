const mongoose = require('mongoose');

const ToucherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: ""
  },
  phone: {
    type: String,
    default: ""
  },
  subject: {
    type: String,
    default: ""
  },
  content: {
    type: String,
    default: ""
  }
}, {timestamps: true});

module.exports = mongoose.model('touchers', ToucherSchema);