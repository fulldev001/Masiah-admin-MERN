const mongoose = require('mongoose');

const EmotionPackPurchaseLogSchema = new mongoose.Schema({
  emotionpack: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'emotion_pack'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
}, { timestamps: true });

module.exports = mongoose.model('emotion_pack_purchase_log', EmotionPackPurchaseLogSchema);