const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  review: {
    type: String
  },
  status: {
    type: Boolean,
    default: false
  },
  meditation_audio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'meditation_audio'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  rating: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('review', ReviewSchema);
