const mongoose = require('mongoose');

const MAudioBookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  mAudio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'meditation_audio'
  },
  rank: {
    type: Number
  },
}, { timestamps: true });

module.exports = mongoose.model('m_audio_bookmarks', MAudioBookmarkSchema);