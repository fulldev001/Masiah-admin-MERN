const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  content: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('comments', CommentSchema);
