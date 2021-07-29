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

// // @route    POST api/posts
// // @desc     Create a post
// // @access   Private
// router.post(
//   '/',
//   auth,
//   check('text', 'Text is required').notEmpty(),
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const user = await User.findById(req.user.id).select('-password');

//       const newPost = new Post({
//         text: req.body.text,
//         name: user.name,
//         avatar: user.avatar,
//         user: req.user.id
//       });

//       const post = await newPost.save();

//       res.json(post);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

// // @route    GET api/posts
// // @desc     Get all posts
// // @access   Private
// // router.get('/', auth, async (req, res) => {
// //   try {
// //     const posts = await Post.find().sort({ date: -1 });
// //     res.json(posts);
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).send('Server Error');
// //   }
// // });

// // @route    GET api/posts/:id
// // @desc     Get post by ID
// // @access   Private
// router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (!post) {
//       return res.status(404).json({ msg: 'Post not found' });
//     }

//     res.json(post);
//   } catch (err) {
//     console.error(err.message);

//     res.status(500).send('Server Error');
//   }
// });

// // @route    DELETE api/posts/:id
// // @desc     Delete a post
// // @access   Private
// router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (!post) {
//       return res.status(404).json({ msg: 'Post not found' });
//     }

//     // Check user
//     if (post.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: 'User not authorized' });
//     }

//     await post.remove();

//     res.json({ msg: 'Post removed' });
//   } catch (err) {
//     console.error(err.message);

//     res.status(500).send('Server Error');
//   }
// });

// // @route    PUT api/posts/like/:id
// // @desc     Like a post
// // @access   Private
// router.put('/like/:id', auth, checkObjectId('id'), async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     // Check if the post has already been liked
//     if (post.likes.some((like) => like.user.toString() === req.user.id)) {
//       return res.status(400).json({ msg: 'Post already liked' });
//     }

//     post.likes.unshift({ user: req.user.id });

//     await post.save();

//     return res.json(post.likes);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // @route    PUT api/posts/unlike/:id
// // @desc     Unlike a post
// // @access   Private
// router.put('/unlike/:id', auth, checkObjectId('id'), async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     // Check if the post has not yet been liked
//     if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
//       return res.status(400).json({ msg: 'Post has not yet been liked' });
//     }

//     // remove the like
//     post.likes = post.likes.filter(
//       ({ user }) => user.toString() !== req.user.id
//     );

//     await post.save();

//     return res.json(post.likes);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // @route    POST api/posts/comment/:id
// // @desc     Comment on a post
// // @access   Private
// router.post(
//   '/comment/:id',
//   auth,
//   checkObjectId('id'),
//   check('text', 'Text is required').notEmpty(),
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const user = await User.findById(req.user.id).select('-password');
//       const post = await Post.findById(req.params.id);

//       const newComment = {
//         text: req.body.text,
//         name: user.name,
//         avatar: user.avatar,
//         user: req.user.id
//       };

//       post.comments.unshift(newComment);

//       await post.save();

//       res.json(post.comments);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

// // @route    DELETE api/posts/comment/:id/:comment_id
// // @desc     Delete comment
// // @access   Private
// router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     // Pull out comment
//     const comment = post.comments.find(
//       (comment) => comment.id === req.params.comment_id
//     );
//     // Make sure comment exists
//     if (!comment) {
//       return res.status(404).json({ msg: 'Comment does not exist' });
//     }
//     // Check user
//     if (comment.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: 'User not authorized' });
//     }

//     post.comments = post.comments.filter(
//       ({ id }) => id !== req.params.comment_id
//     );

//     await post.save();

//     return res.json(post.comments);
//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).send('Server Error');
//   }
// });

//  Create a new post
router.post('/create', upload.single('image'), (req, res) => {
  let image = req.file ? req.file.filename : '';
  new Post({
    title: req.body.title,
    image: image,
    categories: req.body.categories.split(','),
    summary: req.body.summary,
    content: req.body.content,
    author: req.body.author
  })
    .save()
    .then((result) => {
      console.log(result);
      res.json(result);
    });
});

//  Get all posts
router.get('/getAll', (req, res) => {
  console.log('getAll');
  Post.find()
    .sort({ createdAt: -1 })
    .populate('author')
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log(err);
    });
});

//  Update a post by _id
router.put('/updateById/:_id', upload.single('image'), (req, res) => {
  let image = req.file ? req.file.filename : !!req.body.image ? req.body.image : '';
  Post.findByIdAndUpdate(req.params._id, {
    title: req.body.title,
    image: image,
    categories: req.body.categories.split(','),
    summary: req.body.summary,
    content: req.body.content,
    author: req.body.author
  })
  .then((result) => {
    Post.findById(req.params._id).populate("author").then(result2 => res.json(result2));
  })
  .catch((err) => {
    console.log(err);
  });
});

router.delete("/deleteOneById/:_id", (req, res) => {
  Post.findByIdAndDelete(req.params._id)
    .then(result => res.json(result))
    .catch(err => console.log(err));
})
//  Delete all posts
router.delete('/deleteAll', (req, res) => {
  Post.drop();
});

module.exports = router;
