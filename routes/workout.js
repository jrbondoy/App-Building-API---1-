const express = require("express");
const workoutController = require("../controllers/workout.js")
const auth = require("../auth.js");
const {verify} = auth;

const router = express.Router();

// Add workout
router.post("/addWorkout", verify, workoutController.addWorkout);

// Get wokrout
router.get("/getMyWorkouts", verify, workoutController.getMyWorkouts)

// Update workout
router.patch("/updateWorkout/:workoutId", verify, workoutController.updateWorkout)

// Delete workout
router.delete("/deleteWorkout/:workoutId", verify, workoutController.deleteWorkout)

// Complete Workout Status
router.patch("/CompleteWorkoutStatus/:workoutId", verify, workoutController.completeWorkoutStatus)


module.exports = router;