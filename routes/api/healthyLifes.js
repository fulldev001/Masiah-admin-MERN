const express = require('express');
const router = express.Router();
const multer = require('multer');
const HealthyLife = require("../../models/HealthyLife");

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

router.post("/create", upload.single("image"), (req, res) => {
  let image = req.file ? req.file.filename : '';
  new HealthyLife({
    title: req.body.title,
    content: req.body.content,
    image: image
  }).save().then(result => res.json(result));
});

router.get("/getAll", (req, res) => {
  HealthyLife.find().then(results => res.json(results));
});

router.put("/updateOneById/:_id", upload.single("image"), (req, res) => {
  let image = req.file ? req.file.filename : !!req.body.image ? req.body.image : '';
  HealthyLife.findByIdAndUpdate(req.params._id, {
    title: req.body.title,
    content: req.body.content,
    image: image
  }).then(result => res.json(result));
});

router.delete("/deleteOneById/:_id", (req, res) => {
  HealthyLife.findByIdAndDelete(req.params._id).then(result => res.json(result));
})

module.exports = router