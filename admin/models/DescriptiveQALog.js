const mongoose = require('mongoose');

const DescriptiveQALogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'question'
  },
  answer: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('descriptive_qalogs', DescriptiveQALogSchema);