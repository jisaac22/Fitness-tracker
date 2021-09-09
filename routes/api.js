const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout.js');
const path = require("path");

router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
})

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

router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
  .limit(7)
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


router.get("/api/workouts", (req, res) => {
  Workout.find({})
  .then(dbWorkout => {
    res.json(dbWorkout)
  })
  .catch(err => {
    res.status(400).json(err)
  });
});

module.exports = router;
