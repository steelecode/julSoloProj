require("dotenv").config();
// load up all of our keys and values from the .env file into memory
// we can access this through an object called "process.env"
const express = require('express');
const app = express();
const cors = require('cors');
// to be able to read cookies we need our cookie parser library loaded
const cookieParser = require('cookie-parser');

// server configuration first
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
// allows our browser to request things from the api
// add the cors functionality to our express server
// when using credentials and cookies we need to add optiosn to our cors configuration
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
}));
app.use(cookieParser());

// run the Mongoose connect file
require('./config/mongoose.config');


// Routes next

// require pulls in the function we created in routes
// then it invokes the function with the app express server as an arguement
require('./routes/basket.routes')(app);
require('./routes/user.routes')(app);


// start server listening for requests
app.listen(process.env.MY_PORT, () => {
    console.log("Listening at Port " + process.env.MY_PORT)
})

