const express = require('express');
const router = express.Router();
const multer = require('multer');
const SiteTitle = require('../../models/SiteTitle');

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

router.post('/create', upload.single('favicon'), (req, res) => {
  let favicon = req.file
    ? req.file.filename
    : !!req.body.favicon
    ? req.body.favicon
    : '';
  new SiteTitle({
    title: req.body.title,
    favicon: favicon
  })
    .save()
    .then((result) => {
      res.json(result);
    });
});

router.get('/getAll', (req, res) => {
  SiteTitle.find()
    .sort({ createdAt: -1 })
    .then((results) => {
      res.json(results);
    });
});

router.put('/updateById/:_id', upload.single('favicon'), (req, res) => {
  let favicon = req.file
    ? req.file.filename
    : !!req.body.favicon
    ? req.body.favicon
    : '';
  SiteTitle.findByIdAndUpdate(req.params._id, {
    title: req.body.title,
    favicon: favicon
  })
    .then((result) => {
      SiteTitle.findById(req.params._id).then((result2) => res.json(result2));
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put('/updateStatusById/:_id', (req, res) => {
  if (req.body.isEnabled == true) {
    SiteTitle.findOneAndUpdate({ isEnabled: true }, { isEnabled: false }).then(
      (result) => {
        SiteTitle.findByIdAndUpdate(req.params._id, req.body)
          .then((result) => {
            SiteTitle.findById(req.params._id).then((result2) => {
              SiteTitle.find()
                .sort({ createdAt: -1 })
                .then((results) => {
                  res.json(results);
                });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
  } else {
    SiteTitle.findByIdAndUpdate(req.params._id, req.body)
      .then((result) => {
        SiteTitle.findById(req.params._id).then((result2) => {
          SiteTitle.find()
            .sort({ createdAt: -1 })
            .then((results) => {
              res.json(results);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.delete('/deleteById/:_id', (req, res) => {
  SiteTitle.findByIdAndDelete(req.params._id)
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

module.exports = router;
