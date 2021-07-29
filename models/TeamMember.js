const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  avatar: {
    type: String,
    default: ""
  },
  linkedinUrl: {
    type: String,
    default: ""
  },
  twitterUrl: {
    type: String,
    default: ""
  }
}, {timestamps: true});

module.exports = mongoose.model('team_mebers', TeamMemberSchema);