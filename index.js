const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const userRoutes = require("./routes/user.js");
const workoutRoutes = require("./routes/workout.js");

// Server setup
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


const corsOptions = {
	origin: ['http://localhost:4000', 'http://localhost:3000'],
	credentials: true,
	optionsSuccessStatus: 200 
}


app.use(cors(corsOptions));
require('dotenv').config();


// Connect to our MongoDB database
mongoose.connect(process.env.MONGODB_STRING, {
	// useNewURLParser: true,
	// useUnifiedTopology: true
});



mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas'))

app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);

// [SECTION] Server Gateway Response
if(require.main === module){
	app.listen(process.env.PORT || 4001, () => {
		console.log(`API is now online at ${process.env.PORT || 4001}`)
	})
}

module.exports = {app, mongoose};
