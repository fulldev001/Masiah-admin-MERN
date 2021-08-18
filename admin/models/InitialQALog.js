const mongoose = require('mongoose');

const InitialQALogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'question'
  },
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'answer'
  }]
}, { timestamps: true });

module.exports = mongoose.model('initial_qalogs', InitialQALogSchema);