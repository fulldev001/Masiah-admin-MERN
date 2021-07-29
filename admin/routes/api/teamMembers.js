const express = require('express');
const router = express.Router();
const multer = require('multer');

const TeamMember = require("../../models/TeamMember");

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

router.post("/create", upload.single("avatar"), (req, res) => {
  let avatar = req.file ? req.file.filename : '';
  new TeamMember({
    name: req.body.name,
    position: req.body.position,
    avatar: avatar,
    description: req.body.description,
    linkedinUrl: req.body.linkedinUrl,
    twitterUrl: req.body.twitterUrl
  }).save().then(result => res.json(result));
});

router.get("/getAll", (req, res) => {
  TeamMember.find().then(results => res.json(results));
});

router.put("/updateOneById/:_id", upload.single("avatar"), (req, res) => {
  let avatar = req.file ? req.file.filename : !!req.body.avatar ? req.body.avatar : '';
  TeamMember.findByIdAndUpdate(req.params._id, {
    name: req.body.name,
    position: req.body.position,
    description: req.body.description,
    avatar: avatar,
    linkedinUrl: req.body.linkedinUrl,
    twitterUrl: req.body.twitterUrl
  }).then(result => res.json(result));
});

router.delete("/deleteOneById/:_id", (req, res) => {
  TeamMember.findByIdAndDelete(req.params._id).then(result => res.json(result));
})

module.exports = router;