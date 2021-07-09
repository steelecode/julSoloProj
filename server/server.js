const express = require('express');
const app = express();

// server configuration first
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));




// run the Mongoose connect file
require('./config/mongoose.config');



// Routes next

// require pulls in the function we created in routes
// then it invokes the function with the app express server as an arguement
require('./routes/basket.routes')(app);


// start server listening for requests
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})

