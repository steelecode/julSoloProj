const mongoose = require('mongoose');
// const dbName = "baskets-db";
const dbName = process.env.DB_Name;

mongoose.connect("mongodb://localhost/" + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log(`Established a connection to the "${dbName}" database`))
    .catch(err => console.log(`Something went wrong when connecting to the "${dbName}" database`, err));

