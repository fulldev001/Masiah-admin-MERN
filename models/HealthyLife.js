const mongoose = require('mongoose');

const HealthyLifeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model('healthy_lifes', HealthyLifeSchema);