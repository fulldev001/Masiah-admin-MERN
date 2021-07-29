const express = require('express');
const router = express.Router();
const Service = require("../../models/Service");

router.post("/create", (req, res) => {
  new Service(req.body).save().then(result => res.json(result));
});

router.get("/getAll", (req, res) => {
  Service.find().sort({ title: 1 }).then(results => res.json(results));
});

router.put("/updateOneById/:_id", (req, res) => {
  Service.findByIdAndUpdate(req.params._id, req.body).then(result => res.json(result));
});

router.delete("/deleteOneById/:_id", (req, res) => {
  Service.findByIdAndDelete(req.params._id).then(result => res.json(result));
});

module.exports = router;