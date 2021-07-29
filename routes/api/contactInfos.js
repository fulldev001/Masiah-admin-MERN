const express = require('express');
const router = express.Router();
const ContactInfo = require("../../models/ContactInfo");

router.post("/create", (req, res) => {
  console.log(req.body);
  new ContactInfo(req.body).save().then(result => res.json(result));
});

router.get("/getAll", (req, res) => {
  ContactInfo.find().sort({ title: 1 }).then(results => res.json(results));
});

router.put("/updateOneById/:_id", (req, res) => {
  ContactInfo.findByIdAndUpdate(req.params._id, req.body).then(result => res.json(result));
});

router.delete("/deleteOneById/:_id", (req, res) => {
  ContactInfo.findByIdAndDelete(req.params._id).then(result => res.json(result));
});

module.exports = router;