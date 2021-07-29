const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ""
  },
  content: {
    type: String,
    default: ""
  },
  summary: {
    type: String,
    default: ""
  },
  // categories: [
  //   {
  //     category: {
  //       type: Schema.Types.ObjectId,
  //       ref: "post_categories"
  //     }
  //   }
  // ],
  categories: {
    type: Array
  },
  author: {
    type: Schema.Types.ObjectId,
    ref:  "user"
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      }
    }
  ],
  dislikes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      }
    }
  ],
  comments: [
    {
      comment: {
        type: Schema.Types.ObjectId,
        ref: "comments"
      }
    }
  ],
  status: {
    type: Number,
    default: 1
  }
}, { timestamps: true });

module.exports = mongoose.model('post', PostSchema);
