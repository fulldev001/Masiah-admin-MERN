const express = require('express');
const router = express.Router();
const multer = require('multer');
const Logo = require('../../models/Logo');

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

router.post('/create', upload.single('content'), (req, res) => {
  let content = req.file
    ? req.file.filename
    : !!req.body.content
    ? req.body.content
    : '';
  new Logo({
    type: req.body.type,
    content: content
  })
    .save()
    .then((result) => {
      res.json(result);
    });
});

router.get('/getAll', (req, res) => {
  Logo.find()
    .sort({ createdAt: -1 })
    .then((results) => {
      res.json(results);
    });
});

router.put('/updateById/:_id', upload.single('content'), (req, res) => {
  let content = req.file
    ? req.file.filename
    : !!req.body.content
    ? req.body.content
    : '';
  Logo.findByIdAndUpdate(req.params._id, {
    type: req.body.type,
    content: content
  })
    .then((result) => {
      Logo.findById(req.params._id).then((result2) => res.json(result2));
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put('/updateStatusById/:_id', (req, res) => {
  if (req.body.isEnabled == true) {
    Logo.findOneAndUpdate({ isEnabled: true }, { isEnabled: false }).then(
      (result) => {
        Logo.findByIdAndUpdate(req.params._id, req.body)
          .then((result) => {
            Logo.findById(req.params._id).then((result2) => {
              Logo.find()
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
    Logo.findByIdAndUpdate(req.params._id, req.body)
      .then((result) => {
        Logo.findById(req.params._id).then((result2) => {
          Logo.find()
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
  Logo.findByIdAndDelete(req.params._id)
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

router.get('/getEnabledLogo', (req, res) => {
  Logo.findOne({ isEnabled: true })
    .then(result => res.json(result));
})

module.exports = router;
