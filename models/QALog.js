const mongoose = require('mongoose');

const QALogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'question'
  },
  answer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'answer'
  },
  emotionpack: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'emotion_pack'
  }
}, { timestamps: true });

module.exports = mongoose.model('qaLogs', QALogSchema);