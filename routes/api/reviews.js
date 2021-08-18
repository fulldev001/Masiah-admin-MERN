const express = require('express');
const router = express.Router();
const Review = require('../../models/Review');
const MeditationAudio = require('../../models/Meditationaudio');
const auth = require('../../middleware/auth');

router.get('/', async (req, res) => {
  const result = await Review.find()
    .populate('meditation_audio')
    .populate('user')
    .sort({ date: 1 });
  res.json(result);
});

router.post('/add', auth, (req, res) => {
  Review.findOne({
    user: req.body.user,
    meditation_audio: req.body.meditation_audio
  }).then((result) => {
    if (result) {
      res.json({
        message: 'You had already give a review to the meditation audio.'
      });
    } else {
      new Review({
        review: req.body.review,
        status: req.body.status,
        meditation_audio: req.body.meditation_audio,
        rating: req.body.rating,
        user: req.body.user
      })
        .save()
        .then((result2) => {
          Review.find({
            meditation_audio: req.body.meditation_audio,
            status: true
          }).then((results) => {
            let averageRate = 0;
            if (results.length > 0) {
              let totalRate = 0;
              for (let i = 0; i < results.length; i++) {
                totalRate = totalRate + results[i].rating;
              }
              averageRate = totalRate / results.length;
            } else {
              
            }
            MeditationAudio.findByIdAndUpdate(req.body.meditation_audio, {
              averageRate: averageRate
            }).then(result3 => {
              res.json("ok");
            });
          });
        });
    }
  });
});

router.post('/update', async (req, res) => {
  let filter = { _id: req.body._id };
  let update = {
    review: req.body.review,
    status: req.body.status,
    rating: req.body.rating
  };
  await Review.findOneAndUpdate(filter, update);
  res.json('ok');
});

router.delete('/:id', async (req, res) => {
  await Review.remove({ _id: req.params.id });
  res.json('ok');
});

module.exports = router;
