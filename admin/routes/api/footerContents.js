const express = require('express');
const router = express.Router();
const FooterContent = require('../../models/FooterContent');

router.post('/create', (req, res) => {
  new FooterContent(req.body)
    .save()
    .then((result) => {
      res.json(result);
    });
});

router.get('/getAll', (req, res) => {
  FooterContent.find()
    .sort({ createdAt: -1 })
    .then((results) => {
      res.json(results);
    });
});

router.put('/updateById/:_id', (req, res) => {
  FooterContent.findByIdAndUpdate(req.params._id, req.body)
    .then((result) => {
      FooterContent.findById(req.params._id).then((result2) => res.json(result2));
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put('/updateStatusById/:_id', (req, res) => {
  if (req.body.isEnabled == true) {
    FooterContent.findOneAndUpdate({ isEnabled: true }, { isEnabled: false }).then(
      (result) => {
        FooterContent.findByIdAndUpdate(req.params._id, req.body)
          .then((result) => {
            FooterContent.findById(req.params._id).then((result2) => {
              FooterContent.find()
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
    FooterContent.findByIdAndUpdate(req.params._id, req.body)
      .then((result) => {
        FooterContent.findById(req.params._id).then((result2) => {
          FooterContent.find()
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
  FooterContent.findByIdAndDelete(req.params._id)
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

router.get('/getEnabledFooterContent', (req, res) => {
  FooterContent.findOne({ isEnabled: true })
    .then(result => {
      res.json(result);
    })
})

module.exports = router;
