const { errorHandler } = require('../auth.js');
const Workout = require("../models/Workout");


// Add Workout
module.exports.addWorkout = (req, res) => {
    
    let newWorkout = new Workout({
        name : req.body.name,
        duration : req.body.duration
    });

    Workout.findOne({name: req.body.name})
    .then(existingWorkout => {
       
        if (existingWorkout) {
          
            return res.status(409).send({message: 'Workout already exists'});
        
        }else{
   
            return newWorkout.save()
        
            
            .then(result => res.status(201).send({
                success: true,
                message: 'Workout Added Successfully',
                result: result
            }))
    
            .catch(err => errorHandler(err, res, req))
        }
    })
};


// Get Workout
module.exports.getMyWorkouts = (req, res) => {
    return Workout.find({})
    .then(result => {
       
        if(result.length > 0){
            return res.status(200).send({workouts: result});
        }
        else{
          
            return res.status(404).send({message: 'No Workout Found'});
        }
    })
    .catch(error => errorHandler(err, req, res));
};

// Update Workout 
module.exports.updateWorkout = (req, res)=>{

    let updatedWorkout = {
        name: req.body.name,
        duration: req.body.duration,
        status: req.body.status
    }

    return Workout.findByIdAndUpdate(req.params.workoutId, updatedWorkout)
    .then(workout => {
        if (workout) {
           
            res.status(200).send({ 
                message: 'Workout updated successfully',
                success: true,
                workout: workout
                });
        } else {
           
            res.status(404).send({ message: 'Workout not found' });
        }
    })
    .catch(err => errorHandler(err, req, res));
};

// Delete workout
module.exports.deleteWorkout = (req, res) => {
    Workout.findByIdAndDelete(req.params.workoutId)
    .then(workout => {
        if(!workout){
            return res.status(404).send({message: 'Workout not found'});
        }
        else{
            return res.status(200).send({message: 'Workout removed successfully'})
        }
    })
    .catch(err => errorHandler(err, req, res))
}

// Complete Workout status
module.exports.completeWorkoutStatus = (req, res)=>{

    let updatedWorkoutStatus = {
        status: req.body.status
    }

    return Workout.findByIdAndUpdate(req.params.workoutId, updatedWorkoutStatus)
    .then(workout => {
        if (workout) {
           
            res.status(200).send({ 
                message: 'Workout status updated successfully',
                success: true,
                updatedWorkout: workout
                });
        } else {
           
            res.status(404).send({ message: 'Workout not found' });
        }
    })
    .catch(err => errorHandler(err, req, res));
};