const express = require('express');
const router = express.Router();
const path = require('path');
const { dirname } = require('path')
const multer = require('multer');

const Journal = require('../../models/Journal');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files')
    },
    filename(req, file, cb) {
      // cb(null, `${new Date().getTime()}_${file.originalname}`)
      cb(null, file.originalname)
    }
  }),
  limits: {
    fileSize: 100000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|JPG|PNG|png|mp3|MP3|AAC|aac|wav|WAV)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      )
    }
    cb(undefined, true) // continue with upload
  }
});

//  Create the audio journal
router.post("/addAudio", upload.single('content'), (req, res) => {
  let content = req.file ? req.file.filename : undefined;
  new Journal({
    user: req.body.user,
    type: req.body.type,
    content: content
  }).save()
    .then(result => {
      res.json(result);
    });
});

//  Create the text journal
router.post("/addText", (req, res) => {
  new Journal(req.body)
    .save()
    .then(result => {
      res.json(result);
    });
});

//  Get all journals
router.get("/getAll", (req, res) => {
  Journal.find()
    .then(results => {
      res.json(results)
    });
});

//  Get a journal by its object id
router.get("/getOneById/:_id", (req, res) => {
  Journal.findById(req.params._id)
    .then(result => {
      res.json(result);
    });
});

//  Get the journals created by a user
router.get("/getByUserId/:user", (req, res) => {
  Journal.find({ user: req.params.user })
    .then(results => {
      res.json(results);
    });
});

//  Delete a journal by its object id
router.delete("/deleteOneById/:_id", (req, res) => {
  Journal.findByIdAndDelete(req.params._id)
    .then(result => {
      res.json(result);
    });
});

//  Update a journal by its object id
// router.put("/updateOneById/:_id", (req, res) => {
//   Journal.findByIdAndUpdate(req.params._id, {
    
//   })
// });

module.exports = router;