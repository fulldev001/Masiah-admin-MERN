const express = require('express');
const router = express.Router();
const PostCategory = require('../../models/PostCategory');
const Post = require('../../models/Post');

router.post('/create', (req, res) => {
  new PostCategory(req.body)
    .save()
    .then(result => {
      PostCategory.findById(result._id)
        .populate('parent')
        .populate('ancestors')
        .then(result2 => {
          res.json(result2)
        })
    })
});

router.get('/getAll', (req, res) => {
  PostCategory.find().populate('parent').populate('ancestors')
    .then(results => {
      console.log(results);
      res.json(results);
    })

});

router.put('/updateById/:_id', (req, res) => {
  PostCategory.findByIdAndUpdate(req.params._id, req.body)
    .then(result => {
      PostCategory.findById(req.params._id)
        .populate('parent')
        .populate('ancestors')
        .then(result2 => {
          res.json(result2);
        });
    });
});

router.delete('/deleteById/:_id', async (req, res) => {
  await Post.deleteMany({ ancestors: { $elemMatch: {$eq: req.params._id}  } });
  await PostCategory.deleteMany({ ancestors: { $elemMatch: {$eq: req.params._id}  } });
  await PostCategory.findByIdAndDelete(req.params._id)
  await PostCategory.find().populate('parent').populate('ancestors')
    .then(results => {
      console.log(results);
      res.json(results);
    })
})

module.exports = router;