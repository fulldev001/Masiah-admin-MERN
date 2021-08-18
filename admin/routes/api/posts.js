const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');
const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files');
    },
    filename(req, file, cb) {
      // cb(null, `${new Date().getTime()}_${file.originalname}`)
      cb(null, file.originalname);
    }
  }),
  limits: {
    fileSize: 100000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (
      !file.originalname.match(
        /\.(jpeg|jpg|JPG|PNG|png|mp3|MP3|AAC|aac|wav|WAV)$/
      )
    ) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

//  Create a new post
router.post('/create', upload.single('image'), (req, res) => {
  let image = req.file ? req.file.filename : '';
  let newPost = {
    title: req.body.title,
    image: image,
    ancestors: req.body.ancestors.split(","),
    summary: req.body.summary,
    content: req.body.content,
    author: req.body.author,
    parent: req.body.parent
  }
  if(req.body.parent) {
    newPost.parent = req.body.parent;
  }
  console.log(newPost);
  new Post(newPost)
    .save()
    .then((result) => {
      Post.findById(result._id)
        .populate('author')
        .populate('parent')
        .populate('ancestors')
        .then(result2 => {
          res.json(result2);
        })
    });
});

//  Get all posts
router.get('/getAll', (req, res) => {
  console.log('getAll');
  Post.find()
    .sort({ createdAt: -1 })
    .populate('author')
    .populate('parent')
    .populate('ancestors')
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log(err);
    });
});

//  Update a post by _id
router.put('/updateById/:_id', upload.single('image'), (req, res) => {
  let image = req.file
    ? req.file.filename
    : !!req.body.image
    ? req.body.image
    : '';
  Post.findByIdAndUpdate(req.params._id, {
    title: req.body.title,
    image: image,
    ancestors: req.body.ancestors.split(','),
    summary: req.body.summary,
    content: req.body.content,
    author: req.body.author,
    parent: req.body.parent
  })
    .then((result) => {
      Post.findById(req.params._id)
        .populate('author')
        .populate('parent')
        .populate('ancestors')
        .then((result2) => res.json(result2));
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete('/deleteOneById/:_id', (req, res) => {
  Post.findByIdAndDelete(req.params._id)
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});
//  Delete all posts
router.delete('/deleteAll', (req, res) => {
  Post.drop();
});

module.exports = router;
