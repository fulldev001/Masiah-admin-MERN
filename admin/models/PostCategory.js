const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  ancestors: [{
    type: Schema.Types.ObjectId,
    ref: "post_categories"
  }],
  parent: {
    type: Schema.Types.ObjectId,
    ref: "post_categories"
  }
}, { timestamps: true });

module.exports = mongoose.model('post_categories', PostCategorySchema);
