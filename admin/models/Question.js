const mongoose = require('mongoose');
const { FALSE } = require('node-sass');

const QuestionSchema = new mongoose.Schema({
  serial_number: {
    type: Number
  },
  question: {
    type: String
  },
  type: {
    type: String
  },
  emotionpack: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'emotion_pack'
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'question'
  },
  parent_answer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'answer'
  },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'answer'
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  isInitial: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('question', QuestionSchema);
