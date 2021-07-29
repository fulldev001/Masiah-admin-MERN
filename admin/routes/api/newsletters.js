const express = require('express');
const router = express.Router();
const Newsletter = require("../../models/Newsletter");

router.post("/create", (req, res) => {
  console.log(req.body);
  new Newsletter(req.body).save().then(result => res.json(result));
});

router.get("/getAll", (req, res) => {
  Newsletter.find().sort({ createdAt: -1 }).then(results => res.json(results));
});

router.put("/updateOneById/:_id", (req, res) => {
  Newsletter.findByIdAndUpdate(req.params._id, req.body).then(result => res.json(result));
});

router.delete("/deleteOneById/:_id", (req, res) => {
  Newsletter.findByIdAndDelete(req.params._id).then(result => res.json(result));
});

module.exports = router;