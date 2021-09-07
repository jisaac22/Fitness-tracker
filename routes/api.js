const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout.js');


router.get("/api/workouts", (req, res) => {
  Workout.find({})
  .then(dbWorkout => {
    res.json(dbWorkout)
  })
  .catch(err => {
    res.status(400).json(err)
  });
});

router.get("/api/workouts/:id", (req, res) => {
  Workout.findOne(
    {
      _id: req.params.id
    },
    ).then(dbWorkout => {
      res.json(dbWorkout)
    })
    .catch(err => {
      res.json(err)
    });
});


router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
  .then(dbWorkout => {
    res.json(dbWorkout)
  })
  .catch(err => {
    res.status(400).json(err)
  });
});

router.put("/api/workouts/:id", (req, res) => {
  Workout.findOneAndUpdate({
    _id: req.params.id
  },
  {
    $push: { exercises: req.body }
  }, 
  { new: true 
  }
  ).then(dbWorkout =>{
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err)
  });
});

module.exports = router;
