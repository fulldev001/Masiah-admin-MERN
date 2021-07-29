const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  type: {
    type: String
  },
  content: {
    type: String
  },
}, { timestamps: true });

module.exports = mongoose.model('journals', JournalSchema);