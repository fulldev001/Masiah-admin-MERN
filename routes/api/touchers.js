const express = require('express');
const router = express.Router();
const Toucher = require("../../models/Toucher");

router.post("/create", (req, res) => {
  new Toucher(req.body).save().then(result => res.json(result));
});

router.get("/getAll", (req, res) => {
  Toucher.find().sort({ createdAt: -1 }).then(results => res.json(results));
});

router.put("/updateOneById/:_id", (req, res) => {
  Toucher.findByIdAndUpdate(req.params._id, req.body).then(result => res.json(result));
});

router.delete("/deleteOneById/:_id", (req, res) => {
  Toucher.findByIdAndDelete(req.params._id).then(result => res.json(result));
});

module.exports = router;