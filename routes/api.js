const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout.js');

router.get("/api/all", (req, res) => {
  Workout.find({})
  .then(dbWorkout => {
    res.json(dbWorkout)
  })
  .catch(err => {
    res.status(400).json(err)
  });
});

module.exports = router;