const mongoose = require('mongoose');

const NewsletterSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    default: ""
  },
  content: {
    type: String,
    default: ""
  }
}, {timestamps: true});

module.exports = mongoose.model('newsletters', NewsletterSchema);