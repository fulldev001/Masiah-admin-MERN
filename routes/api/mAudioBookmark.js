const express = require('express');
const router = express.Router();

const MAudioBookmark = require('../../models/MAudioBookmark');

//  Bookmark a meditaion audio
router.post("/add", (req, res) => {
  MAudioBookmark.find({ 
      user: req.body.user, 
      mAudio: req.body.mAudio 
    })
    .then(results => {
      //  If the same user bookmark the same meditation audio
      if(results.length != 0) {
        // res.status(409).send("You already bookmarked the audio.");
        res.json({ 
          status:   409,
          message:  "You already bookmarked this audio." 
        });

      //  Else
      } else {
        new MAudioBookmark(req.body).save()
          .then(result => {
            res.json(result);
          });
      }
    });
});

//  Get all bookmarked meditation audios
router.get("/getAll", (req, res) => {
  MAudioBookmark.find()
    .populate("mAudio")
    .sort({ rank: -1, updatedAt: -1, createdAt: -1 })
    .then(results => {
      res.json(results)
    });
});

//  Get the meditation audios that were bookmarked by the user.
router.get("/getByUserId/:user", (req, res) => {
  MAudioBookmark.find({ user: req.params.user })
    .populate("mAudio")
    .sort({ rank: -1, updatedAt: -1, createdAt: -1 })
    .then(results => {
      res.json(results);
    });
});

//  Give the rank to the bookmarked meditation audio.
router.put("/giveRank/:_id", (req, res) => {
  MAudioBookmark.findByIdAndUpdate(req.params._id, { rank: req.body.rank })
    .then(result => {
      res.json(result);
    });
});

//  Remove the bookmark from a meditation audio
router.delete("/deleteOneById/:_id", (req, res) => {
  MAudioBookmark.findByIdAndDelete(req.params._id)
    .then(result => {
      res.json(result);
    });
});

module.exports = router;